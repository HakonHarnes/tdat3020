// @flow
import axios from 'axios';

class Authenticator {
   
    // Sends data for either registering or login
    sendData(username: string, clientHash: string, path: string) {
        //$FlowFixMe
        return axios({
            method: 'POST',
            url: path,
            headers: {},
            data: {
                username: username,
                clientHash: clientHash,
            },
        });
    }

    // Sends token to check
    checkToken(username: string, token: string) {
        //$FlowFixMe
        return axios({
            method: 'POST',
            url: '/token',
            headers: {
                authorization: token,
            },
            data: {
                username: username,
            },
        });
    }
}

export let authenticator = new Authenticator();
