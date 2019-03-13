import axios from 'axios';
import resolveUrl from '.';

const baseUrl = resolveUrl();

class StatsAPI {
  static async getStats() {
    return axios.get(`${baseUrl}/automations/stats`);
  }
}

export default StatsAPI;
