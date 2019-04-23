import axios from 'axios';

import URL from 'url';
import resolveUrl from '.';

const baseUrl = resolveUrl();
const mockUrl = 'http://www.mocky.io/v2/5cabcd7a300000680010325b?mocky-delay=2000ms';
class AutomationAPI {
  static async getAutomations(pagination, filters) {
    const filterCopy = { ...filters };
    delete filterCopy.showFilterDropdown;
    delete filterCopy.date;
    filterCopy.searchBy = filterCopy['search-by'];
    filterCopy.type = filterCopy['automation-type'];
    delete filterCopy['search-by'];
    delete filterCopy['automation-type'];
    /* eslint-disable no-mixed-operators */
    const filterQuery = {
      ...filterCopy,
      'date[from]': filters.date.from && filters.date.from.toISOString() || undefined,
      'date[to]': filters.date.to && filters.date.to.toISOString() || undefined,
    };
    /* eslint-enable no-mixed-operators */

    const parsedAutomationsURL = URL.parse(`${baseUrl}/automations`);

    const filterURL = URL.format({
      ...parsedAutomationsURL,
      query: {
        page: pagination.currentPage,
        limit: pagination.limit,
        ...filterQuery,
      },
    });
    return axios.get(filterURL);
  }

  static async retryAutomation() {
    return axios.put(`${mockUrl}`);
  }
}

export default AutomationAPI;
