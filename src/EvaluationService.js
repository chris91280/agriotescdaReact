import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api/';

class EvaluationService {
  getEvaluations(pageNumber, perPage, searchWord) {
    return axios.get(API_URL + `public/evaluations?pageNumber=${pageNumber}&perPage=${perPage}&searchWord=${searchWord}`);
  }

  createEvaluation(evaluation) {
    return axios.post(API_URL + 'formateur/evaluations/create', 
                evaluation, { headers: {...authHeader(), 'content-type': 'multipart/form-data'} });
  }

  editEvaluation(evaluation) {
    return axios.put(API_URL + 'formateur/evaluations/edit', 
                evaluation, { headers: authHeader() });
  }

  deleteEvaluation(evaluationId) {
    return axios.delete(API_URL + 'formateur/evaluations/delete/' + evaluationId, 
    { headers: authHeader() });
}
}

export default new EvaluationService();
