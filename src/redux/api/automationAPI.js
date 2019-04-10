

import axios from 'axios';

import resolveUrl from '.';

const baseUrl = resolveUrl();

class AutomationAPI {
  static async getFellows() {
    return axios.get(`${baseUrl}/automations/`);
  }
}

export default AutomationAPI;
