import createStore from '../../store';

it('should test that store has been created', () => {
  expect(createStore.getState().firstReducer).toEqual('my first root reducers');
});
