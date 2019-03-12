import moxios from 'moxios';
import AutomationAPI from '../automationAPI';
import resolveUrl from '..';

const baseUrl = resolveUrl();
describe('Automation API', () => {
  beforeAll(() => {
    moxios.install();
  });

  afterAll(() => {
    moxios.uninstall();
  });

  it('should return data from API', async (done) => {
    moxios.stubRequest(`${baseUrl}/automations/`, {
      status: 200,
      statusText: 'OK',
      response: {
        hello: 'HI',
      },
    });
    await AutomationAPI.getFellows();
    done();
  });
});
