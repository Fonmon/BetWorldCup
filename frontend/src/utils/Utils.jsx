import axios from 'axios';

export const TOKEN_KEY = "TOKEN_WORLDCUP_KEY";

class Utils{
    static isAuthenticated(){
        let token = localStorage.getItem(TOKEN_KEY);
        return token ? true : false;
    }

    ///////////////////////////////////////////////////////////////////////
    // CALLS TO API
    ///////////////////////////////////////////////////////////////////////

    static authenticate(username, password){
        return axios.post('api-token-auth/',{
            username:username,
            password:password
        });
    }

    static getTeams(){
        return axios.get('/api/team');
    }
}

export default Utils;
