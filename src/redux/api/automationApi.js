import axios from 'axios';
import baseUrl from '.';

class AutomationAPI {
  static getAutomation() {
    return axios.get(`${baseUrl}/automations/`);
  }
}

export default AutomationAPI;
