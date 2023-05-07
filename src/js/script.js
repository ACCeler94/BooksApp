const select = {
  templateOf: {
    book: '#template-book',
  },
  containerOf: {
    booksList: '.books-list',
    filters: '.filters',
  },
  book: {
    image: '.book__image'
  }
};

let favoriteBooks = [];
let filters = [];

const render = () => {
  for (const book of dataSource.books) {
    const ratingBgc = determineBg(book);
    const ratingWidth = book.rating * 10;

    book.ratingBgc = ratingBgc;
    book.ratingWidth = ratingWidth;

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

  const filtersForm = document.querySelector(select.containerOf.filters);
  filtersForm.addEventListener('click', event => {
    if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter') {
      if (event.target.checked) {
        filters.push(event.target.value);
      } else {
        filters = filters.filter(id => id !== event.target.value);
      }
      console.log('filters array:', filters);
      filterBooks();
    }
  });
};


const filterBooks = () => {
  for (const book of dataSource.books) {
    let shouldBeHidden = false;
    const bookToFilter = document.querySelector(`[data-id="${book.id}"]`);
    for (const filter in book.details) {
      if (filters.includes(filter) && book.details[filter]) {
        shouldBeHidden = true;
      }
    }

    if (shouldBeHidden) {
      bookToFilter.classList.add('hidden');
    } else {
      bookToFilter.classList.remove('hidden');
    }
  }
};


const determineBg = (book) => {
  if (book.rating < 6) {
    return 'linear - gradient(to bottom, #fefcea 0 %, #f1da36 100 %)';

  } else if (book.rating > 6 && book.rating <= 8) {
    return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';

  } else if (book.rating > 8 && book.rating <= 9) {
    return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';

  } else if (book.rating > 9) {
    return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
  }
};




render();
initActions();

