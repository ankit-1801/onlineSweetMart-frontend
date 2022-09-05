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
    updateUser(id,user){
        return axios.patch(USERS_BASE_REST_API_URl+"/update/"+id ,user);
    }
    changePassword(resetPass){
        return axios.put(USERS_BASE_REST_API_URl+"/changePassword",resetPass);
    }
    generateOtp(email){
        return axios.post(USERS_BASE_REST_API_URl+"/generateOtp/"+email)
    }

}

export default  new UserService();