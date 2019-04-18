import moxios from 'moxios';
import AutomationAPI from '../automationAPI';
import resolveUrl from '..';

const baseUrl = resolveUrl();
const mockUrl = 'http://www.mocky.io/v2/5cabcd7a300000680010325b?mocky-delay=2000ms';

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

  it('should return data from API for retrying automations', async (done) => {
    moxios.stubRequest(`${mockUrl}`, {
      status: 200,
      response: {
        message: 'Resource successfully retried',
      },
    });
    await AutomationAPI.retryAutomation();
    done();
  });
});
