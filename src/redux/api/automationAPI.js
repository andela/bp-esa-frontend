import axios from 'axios';

import resolveUrl from '.';

const baseUrl = resolveUrl();

class AutomationAPI {
  static async getFellows(page = 1, limit = 10) {
    return axios.get(`${baseUrl}/automations/?page=${page}&limit=${limit}`);
  }
}

export default AutomationAPI;
