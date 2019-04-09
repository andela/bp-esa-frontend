import pageNumber from '../../utils';

describe('test utils', () => {
  it('should return pageNumber depending on action', () => {
    const actions = ['nextPage', 'previousPage', 'firstPage', 'lastPage', ''];
    let currentPage = 1;
    const numberOfPages = 10;

    const pages = actions.map((action) => {
      const page = pageNumber(action, currentPage, numberOfPages);
      currentPage = page;
      return page;
    });
    expect(pages).toEqual([2, 1, 1, 10, currentPage]);
  });
});
