import axios from "axios";
import {Observable} from "rxjs";
import {loadingIndicator} from "../loader/loading-indicator";

const token = null;

function setToken(token) {

    if (token) {
        console.log("setting token", token)
        axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    } else
        axios.defaults.headers.common['Authorization'] = null
}


function setTokenLogin(token) {

    if (token) {
        console.log("setting token Login", token)
        axios.defaults.headers.common['Authorization'] = `Basic ${token}`;
    }
    // else
    //axios.defaults.headers.common['Authorization'] = null
}


axios.interceptors.request.use(req => {
    console.log(`${req.method} ${req.url}`);

    return req;
});


function makeAsObservable(request) {

    return new Observable((observer) => {
        loadingIndicator.show();
        console.log("going  for", request.url)
        console.log("received for request", request.data)
        axios(request)
            .then((response) => {
                loadingIndicator.hide();
                console.log("received for", request.url)

                observer.next(response.data);
                observer.complete();
            })
            .catch((error) => {
                console.log("error for", request.url)
                loadingIndicator.hide();
                if (error && error.response && error.response.data && error.response.data.message)
                    observer.error(error.response.data.message);
                else
                    observer.error("Technical error , please try again");


            });
    });

}

function post(url, data) {

    return makeAsObservable({
        method: 'post',
        url,
        data
    });

}

function get(url) {

    return makeAsObservable({
        method: 'get',
        url
    });

}

function put(url, data) {

    return makeAsObservable({
        method: 'put',
        url,
        data
    });

}

function deleteRequest(url) {

    return makeAsObservable({
        method: 'delete',
        url
    });

}

export default {setTokenLogin, setToken, delete: deleteRequest, put, get, post};
// export default function cube() {
//     return {setToken, delete: deleteRequest, put, get, post};
// };
