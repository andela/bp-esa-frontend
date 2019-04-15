import capitalizeFirstLetter from '../capitalize';

describe('The capitalize', () => {
  it('should return a word starting with a capital letter', () => {
    expect(capitalizeFirstLetter('email')).toEqual('Email');
  });
});
