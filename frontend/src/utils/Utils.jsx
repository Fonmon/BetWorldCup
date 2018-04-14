import axios from 'axios';

export const TOKEN_KEY = "TOKEN_WORLDCUP_KEY";

class Utils{
    static isAuthenticated(){
        let token = localStorage.getItem(TOKEN_KEY);
        return token ? true : false;
    }

    static redirectTo(path){
        window.location = path;
    }

    static signOut(){
        localStorage.removeItem(TOKEN_KEY);
        Utils.redirectTo('/');
    }

    ///////////////////////////////////////////////////////////////////////
    // CALLS TO API
    ///////////////////////////////////////////////////////////////////////

    static authenticate(username, password){
        return axios.post('/api/auth/',{
            username:username,
            password:password
        });
    }

    static getTeams(){
        return axios.get('/api/team');
    }

    static validateSignup(personalInfo){
        return axios.post('/api/user/validate_signup',personalInfo);
    }

    static signUp(data){
        return axios.post('/api/user',data);
    }
}

export default Utils;
