const select = {
  templateOf: {
    book: '#template-book',
  },
  containerOf: {
    booksList: '.books-list'
  },
  book: {
    image: '.book__image'
  }
};

let favoriteBooks = [];

const render = () => {
  for (const book of dataSource.books) {
    const template = document.querySelector(select.templateOf.book).innerHTML;
    const templateFunc = Handlebars.compile(template);
    const generatedHTML = templateFunc(book);
    const bookDomElement = utils.createDOMFromHTML(generatedHTML);
    document.querySelector(select.containerOf.booksList).appendChild(bookDomElement);
  }
};



const initActions = () => {
  const booksList = document.querySelector(select.containerOf.booksList);
  booksList.addEventListener('dblclick', event => {
    if (event.target.offsetParent.classList.contains('book__image')) {
      event.preventDefault();
      const parent = event.target.offsetParent;
      const coverId = parent.getAttribute('data-id');

      if (favoriteBooks.indexOf(coverId) === -1) {
        parent.classList.add('favorite');
        favoriteBooks.push(coverId);
      } else {
        favoriteBooks = favoriteBooks.filter(id => id !== coverId);
        parent.classList.remove('favorite');
      }
      console.log(favoriteBooks);
    }
  });
};

render();
initActions();

