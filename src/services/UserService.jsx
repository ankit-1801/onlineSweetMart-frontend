import axios from 'axios';

const USERS_BASE_REST_API_URl = 'http://localhost:9191/user' ;

class UserService{
    getToken(data){
         return axios.post('http://localhost:9191/token',data);
     }
    loadUserByUsername(userName){
         return axios.get(USERS_BASE_REST_API_URl+"/loadUserByUsername/"+userName);
    }
    signUpUser(data){
        return axios.post(USERS_BASE_REST_API_URl+'/signUp' , data)
    }
    readUser(id){
        return axios.get(USERS_BASE_REST_API_URl+"/read/"+id);
    }

}

export default  new UserService();