import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

class AuthService{

    login(username, password) {
        return axios
          .post(API_URL + "/login", {
            username: username,
            password: password
          })
          .then(response => {
            if (response.data.accessToken) {
              localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
          });
      }
    
      logout() {
        localStorage.removeItem("user");
      }
    
      register(username, email, password) {
        return axios.post(API_URL + "/register", {
          username,
          email,
          password
        });
      }
    
      updateClient(client) {
        return axios
          .post(API_URL + "/register", {
            nom:client.nom,
            prenom:client.prenom
          })
          .then(response => {
            if (response.data.accessToken) {
              localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
          });
      }
      createFormateur(formateur) {
        return axios
          .post(API_URL + "/register", {
            nom:formateur.nom,
            prenom:formateur.prenom
          })
          .then(response => {
            if (response.data.accessToken) {
              localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
          });
      }
    
      getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
      }
      isFormateur(user){
        return user && user.roles && user.roles.includes("ROLE_FORMATEUR");
      }

      isUser(user){
        return user && user.roles && user.roles.includes("ROLE_USER");

      }
    }
    
    export default new AuthService();



