import { pageChange, pageNavigation } from '../../utils';

describe('test utils', () => {
  it('returns the right page based on action', () => {
    const actions = ['nextPage', 'previousPage', 'firstPage', 'lastPage'];
    let currentPage = 2;
    const numberOfPages = 20;

    const pages = actions.map((action) => {
      const page = pageNavigation(action, currentPage, numberOfPages);
      currentPage = page;
      return page;
    });
    expect(pages).toEqual([3, 2, 1, 20]);
  });

  it('returns the current page', () => {
    const value = 2;
    const numberOfPages = 10;
    const currentPage = pageChange(value, numberOfPages);
    expect(currentPage).toEqual(value);
  });

  it('returns an empty string is the page is not a number', () => {
    const value = [];
    const numberOfPages = 10;
    const currentPage = pageChange(value, numberOfPages);
    expect(currentPage).toEqual(1);
  });
});
