import {Button, Container, makeStyles, TextField} from "../../component/index"
import {useHistory} from "react-router-dom";
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {environment} from "../../environment";
import {doLogin} from "../../auth/authDispatcher";
import {LOGIN} from "../../auth/authStore";
import {appNotification} from "../../common/notification/app-notification";
import validator from 'validator';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Login(props) {

    const classes = useStyles();
    const history = useHistory();

    const dispatch = useDispatch()


    const [userName, set_userName] = useState("")
    const [password, set_password] = useState("")


    async function login(event) {
        event.preventDefault();
        console.log("userName", userName)

        if (userName === "" || password === "") {
            appNotification.showError("Please fill out this field")
            return;
        }

        if (!validator.isEmail(userName)) {
            appNotification.showError("Enter valid Email")
            return;
        }

        const payload = {
            userName,
            password
        }


        const loginUrl = environment.baseUrl + "/auth/login"


        doLogin(payload)
            .subscribe((response) => {

                //  const currentUser = response.user
                //const token = response.token

                console.log("Login result token", response.accessToken)
                console.log("Login result firstName", response.firstName)


                dispatch({type: LOGIN, "payload": response});


                //   history.push("/profile")

                appNotification.showSuccess("Sucessfully Login");


            }, (error => {
                appNotification.showError(error)


            }))
    }

    return (
        <Container component="main" maxWidth="xs">

            <div className={classes.paper}>

                <form className={classes.form} onSubmit={login} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="userName"
                        label="Email"
                        name="userName"
                        autoComplete="userName"
                        autoFocus
                        value={userName}
                        onInput={e => {
                            set_userName(e.target.value)
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onInput={e => set_password(e.target.value)}
                    />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            LOGIN
                        </Button>

                    </div>

                </form>
            </div>

        </Container>

    )
}


export default Login
