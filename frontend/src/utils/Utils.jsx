export const TOKEN_KEY = "TOKEN_WORLDCUP_KEY";

class Utils{
    static isAuthenticated(){
        let token = localStorage.getItem(TOKEN_KEY);
        return token ? true : false;
    }
}

export default Utils;
