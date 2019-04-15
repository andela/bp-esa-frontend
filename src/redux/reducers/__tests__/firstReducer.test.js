import createStore from '../../store';

it('should test that store has been created', () => {
  const expectedState = {
    isLoading: false,
    data: {},
    error: {},
  };
  expect(createStore.getState().stats).toEqual(expectedState);
});
