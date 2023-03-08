import http from "../common/services/http-service.js";
import {concatMap, map} from "rxjs/operators";
import {environment} from "../environment";


export const doLogin = (loginRequest) => {

    clearAuthToken();
    setEmailPasswordToken(loginRequest)

    return getToken(loginRequest);


}


export const getToken = (loginRequest) => {

    const url = environment.baseUrl + '/auth/login';

    return http.post(url, loginRequest)
        .pipe(
            map((response) => {
                setAuthToken(response.accessToken);

                return response;

            })
        );
}
export const doRegisterUser = (registerRequest) => {

    const url = environment.baseUrl + '/users/register';

    return http.post(url, registerRequest)
        .pipe(
            concatMap((response) => {

                const loginRequest = {};
                loginRequest.userName = registerRequest.emailId;
                loginRequest.password = registerRequest.password;
                return doLogin(loginRequest);
                // return "token";
            })
        );
}


export const getDoctorsApi = (speciality) => {

//doctors?speciality=CARDIOLOGIST
    const url = environment.baseUrl + '/doctors?speciality=' + speciality;
    // setAuthToken(token)

    return http.get(url).pipe(
        map((response) => {
            return response;

        })
    );


}

export const getSpecialityApi = () => {

    const url = environment.baseUrl + '/doctors/speciality';
    // setAuthToken(token)

    return http.get(url).pipe(
        map((response) => {
            return response;

        })
    );


}


export const setAuthToken = (token) => {
    http.setToken(token)
}

export const clearAuthToken = () => {
    http.setToken(null)
}

export const setEmailPasswordToken = (loginRequest) => {
    const token = window.btoa(`${loginRequest.userName}:${loginRequest.password}`);
    http.setTokenLogin(token)
}

export const doLogout = (dispatch, history) => {


    const url = environment.baseUrl + '/auth/logout';

    return http.post(url)
        .pipe(
            map((response) => {


                console.log("logout click response", "logout response")
                setAuthToken(null)
                localStorage.clear()

            })
        );


}
