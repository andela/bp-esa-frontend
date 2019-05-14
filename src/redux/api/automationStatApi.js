import axios from 'axios';
import resolveUrl from '.';

const baseUrl = resolveUrl();

class StatsAPI {
  static async getStats(period) {
    return axios.get(`${baseUrl}/automations/stats/?duration=${period}`, );
  }
}

export default StatsAPI;
