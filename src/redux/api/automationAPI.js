import axios from 'axios';
import URL from 'url';
import resolveUrl from '.';

const baseUrl = resolveUrl();
const parsedAutomationsURL = URL.parse(`${baseUrl}/automations`);
const parsedDataURL = URL.parse(`${baseUrl}/automations/downloadReport`);

const filteredData = (filters) => {
  const filterCopy = { ...filters };
  delete filterCopy.showFilterDropdown;
  delete filterCopy.date;
  filterCopy.searchBy = filterCopy['search-by'];
  filterCopy.type = filterCopy['automation-type'];
  delete filterCopy['search-by'];
  delete filterCopy['automation-type'];
  /* eslint-disable no-mixed-operators */
  return {
    ...filterCopy,
    'date[from]': filters.date.from && filters.date.from.toISOString() || undefined,
    'date[to]': filters.date.to && filters.date.to.toISOString() || undefined,
  };
};
class AutomationAPI {
  static async getAutomations(pagination, filters) {
    const filterURL = URL.format({
      ...parsedAutomationsURL,
      query: {
        page: pagination.currentPage,
        limit: pagination.limit,
        ...filteredData(filters),
      },
    });
    return axios.get(filterURL);
  }

  static getReportURL(newPagination, filters) {
    return URL.format({
      ...parsedDataURL,
      query: {
        page: newPagination.currentPage,
        limit: newPagination.limit,
        ...filteredData(filters),
      },
    });
  }

  static async retryAutomation(automationId) {
    return axios.get(`${baseUrl}/automations/${automationId}`);
  }

  static fetchReport() {
    return axios.get(`${baseUrl}/automations/fetchReport`, { responseType: 'blob' });
  }
}

export default AutomationAPI;
