import React from 'react';
import axios from 'axios';
import {Message} from 'semantic-ui-react';

export const WarningSignUpMessage = () => (
    <Message warning>
        <Message.Header>¡ Advertencia !</Message.Header>
        <p>Después de continuar, no podrá modificar su elección.</p>
    </Message>
);

export const TOKEN_KEY = "TOKEN_WORLDCUP_KEY";
export const STAFF_KEY = "IS_STAFF_KEY";
export const USERNAME_KEY = "USERNAME_KEY";
export const ROUND = {
    'GA':'Grupo A',
    'GB':'Grupo B',
    'GC':'Grupo C',
    'GD':'Grupo D',
    'GE':'Grupo E',
    'GF':'Grupo F',
    'GG':'Grupo G',
    'GH':'Grupo H',
    'R16':'Octavos de Final',
    'R8':'Cuartos de Final',
    'R4':'Semifinales',
    'R3':'Partido por Tercer Lugar',
    'R2':'Final',
    'C3':'Tercer Lugar',
    'C2':'Subcampeón',
    'C1':'Campeón'
}

class Utils{
    static isAuthenticated(){
        let token = localStorage.getItem(TOKEN_KEY);
        return token ? true : false;
    }

    static isAuthorized(){
        return localStorage.getItem(STAFF_KEY) === 'true';
    }

    static redirectTo(path){
        window.location = path;
    }

    static signOut(){
        localStorage.clear();
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

    static getMatchResults(is_real){
        return axios.get(`/api/user/matches?is_real=${is_real}`,{
            headers: {
                'Authorization':`Token ${localStorage.getItem(TOKEN_KEY)}`
            }
        });
    }

    static saveMatchResults(data, is_real){
        return axios.patch(`/api/user/matches?is_real=${is_real}`, data,{
            headers: {
                'Authorization':`Token ${localStorage.getItem(TOKEN_KEY)}`
            }
        });
    }

    static getInfo(){
        return axios.get(`/api/user/info`,{
            headers: {
                'Authorization':`Token ${localStorage.getItem(TOKEN_KEY)}`
            }
        });
    }

    static getRanking(){
        return axios.get(`/api/ranking`,{
            headers: {
                'Authorization':`Token ${localStorage.getItem(TOKEN_KEY)}`
            }
        });
    }

    static saveRealTeams(step, teams){
        return axios.post(`/api/team/real?step=${step}`,teams,{
            headers: {
                'Authorization':`Token ${localStorage.getItem(TOKEN_KEY)}`
            }
        });
    }

    static getRealTeams(){
        return axios.get(`/api/team/real`,{
            headers: {
                'Authorization':`Token ${localStorage.getItem(TOKEN_KEY)}`
            }
        });
    }

    static getMyPoints(){
        return axios.get(`/api/user/points`,{
            headers: {
                'Authorization':`Token ${localStorage.getItem(TOKEN_KEY)}`
            }
        });
    }

    static getMyTeams(){
        return axios.get(`/api/user/teams`,{
            headers: {
                'Authorization':`Token ${localStorage.getItem(TOKEN_KEY)}`
            }
        });
    }
}

export default Utils;
