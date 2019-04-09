export default (action, currentPage, numberOfPages) => {
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
