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
  const covers = document.querySelectorAll(`${select.containerOf.booksList} ${select.book.image}`);
  covers.forEach(cover => {
    cover.addEventListener('dblclick', event => {
      event.preventDefault();
      const coverId = cover.getAttribute('data-id');

      if (favoriteBooks.indexOf(coverId) === -1) {
        cover.classList.add('favorite');
        favoriteBooks.push(coverId);
      } else {
        favoriteBooks = favoriteBooks.filter(id => id !== coverId);
        cover.classList.remove('favorite');
      }
      console.log(favoriteBooks);
    });
  });
};


render();
initActions();

