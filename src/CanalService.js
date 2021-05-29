import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api/';

class CanalService {
  getCanaux(canaux) {
    return axios.get(API_URL + `public/canaux`);
  }

  createCanal(canal) {
    return axios.post(API_URL + 'public/canaux/create', 
                canal, { headers: authHeader() });
  }

  editCanal(canal) {
    return axios.put(API_URL + 'public/canaux/edit', 
                canal, { headers: authHeader() });
  }

  deleteCanal(canalId) {
    return axios.delete(API_URL + 'public/canaux/delete/' + canalId, 
    { headers: authHeader() });
}
}

export default new CanalService();
