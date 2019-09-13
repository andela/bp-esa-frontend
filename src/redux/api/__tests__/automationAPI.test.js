import axios from 'axios';
import moxios from 'moxios';
import URL from 'url';
import AutomationAPI from '../automationAPI';
import { filterInitialState } from '../../../components/FilterComponent';
import {
  emailAutomations,
  nokoAutomations,
  slackAutomations,
} from '../../../components/FilterComponent/FilterDropdown';

jest.mock('axios');
const mockUrl = 'http://www.mocky.io/v2/5cabcd7a300000680010325b?mocky-delay=2000ms';

describe('Automation API', () => {
  beforeAll(() => {
    moxios.install();
  });

  afterAll(() => {
    moxios.uninstall();
  });

  it('should return data from API', async (done) => {
    axios.get = jest.fn();
    const pagination = { currentPage: 1, limit: 10 };

    await AutomationAPI.getAutomations(pagination, filterInitialState);
    expect(axios.get).toHaveBeenCalledTimes(1);
    const [[url]] = axios.get.mock.calls;
    const { query } = URL.parse(url, true);
    expect(query).toHaveProperty(emailAutomations);
    expect(query).toHaveProperty(nokoAutomations);
    expect(query).toHaveProperty(slackAutomations);
    expect(query).toHaveProperty('searchTerm');
    expect(query).toHaveProperty('searchBy');
    expect(query).toHaveProperty('type');
    expect(query).toHaveProperty('date[from]');
    expect(query).toHaveProperty('date[to]');
    expect(query).toHaveProperty('page', pagination.currentPage.toString());
    expect(query).toHaveProperty('limit', pagination.limit.toString());
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

  it('should return unpaginated data from the API', async (done) => {
    const newPagination = { currentPage: 1, limit: -1 };
    moxios.stubRequest(`${mockUrl}`, {
      status: 200,
      response: {
        message: 'Resource successfully retried',
      },
    });
    await AutomationAPI.getReportURL(newPagination, filterInitialState);
    done();
  });
  it('should return unpaginated data from the API', async (done) => {
    moxios.stubRequest(`${mockUrl}`, {
      status: 200,
      response: {
        message: 'Resource successfully retried',
      },
    });
    await AutomationAPI.fetchReport();
    done();
  });
});
