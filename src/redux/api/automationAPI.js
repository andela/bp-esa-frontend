

import axios from 'axios';

import resolveUrl from '.';

const baseUrl = resolveUrl();
const mockUrl = 'http://www.mocky.io/v2/5cabcd7a300000680010325b?mocky-delay=2000ms';
class AutomationAPI {
  static async getFellows() {
    return axios.get(`${baseUrl}/automations/`);
  }

  static async retryAutomation() {
    return axios.put(`${mockUrl}`);
  }
}

export default AutomationAPI;
