import moxios from 'moxios';
import StatsAPI from '../automationStatApi';

describe('StatsApi', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should return stats data', async () => {
    const expectedResponse = {
      data: [
        {
          id: 1,
          name: 'Automation',
          data: [],
        },
      ],
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      return request.resolve(expectedResponse);
    });
    const response = await StatsAPI.getStats();

    expect(response).toEqual(expectedResponse);
  });
});
