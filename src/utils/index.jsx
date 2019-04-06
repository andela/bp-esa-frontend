export const pageNavigation = (action, currentPage, numberOfPages) => {
  let page = 1;
  switch (action) {
    case 'next':
      page = currentPage + 1;
      break;
    case 'previous':
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

export const pageChange = (value, numberOfPages) => {
  const page = parseInt(value, 10);
  let currentPage = 1;
  if (page > 0 && page <= numberOfPages) {
    currentPage = page;
  } else if (isNaN(page)) {
    currentPage = '';
  } else {
    currentPage = numberOfPages;
  }
  return currentPage;
};
