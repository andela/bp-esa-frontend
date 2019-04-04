const pageNavigation = (action, currentPage, numberOfPages) => {
  let page = 1;
  switch (action) {
    case 'nextPage':
      page = currentPage + 1;
      break;
    case 'previousPage':
      page = currentPage - 1;
      break;
    case 'firstPage':
      page = 1;
      break;
    case 'lastPage':
      page = numberOfPages;
      break;
    default:
      page = currentPage;
      break;
  }
  return page;
};

const pageChange = (value, numberOfPages) => {
  const page = parseInt(value, 10);
  let currentPage = 1;
  if (page > 0 && page <= numberOfPages) {
    currentPage = page;
  }

  if (typeof page !== 'number') {
    currentPage = 1;
  }

  return currentPage;
};

export { pageNavigation, pageChange };
