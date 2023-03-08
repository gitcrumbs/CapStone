import {Button, Container, Grid, makeStyles, React, TextField, useHistory, useState} from "../../component/index"
import {appNotification} from "../../common/notification/app-notification";
import {doRegisterUser} from "../../auth/authDispatcher";
import {LOGIN} from "../../auth/authStore";
import {useDispatch} from "react-redux";
import validator from "validator";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function Register() {

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [error_message, set_error_message] = React.useState(false);


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [role, setRole] = useState("USER");
    const [mobile, setPhoneNumber] = useState("");

    function getRoles(input) {

        const isUser = (input === "USER")

        return {isUser}
    }

    function callObservable(subscriberMethod, callback) {

        subscriberMethod
            .subscribe((response) => {

                callback(response)

            }, (error => {

                appNotification.showError(error)
            }))

    }

    function registerUser(payload) {


        callObservable(doRegisterUser(payload), (response) => {

            //const currentUser = response.user
            //const token = response.token

            appNotification.showSuccess("Succesfully Registered")
            dispatch({type: LOGIN, "payload": response});
            // history.push("/profile")

        })

    }

    function handleSubmit(event) {
        event.preventDefault();


        if (firstName === "" || lastName === "" || emailId === "" || password === "" || mobile === "") {
            appNotification.showError("Please fill out this field")
            return;
        }

        if (!validator.isEmail(emailId)) {
            appNotification.showError("Enter valid Email")
            return;
        }

        console.log("Before register api", "register")


        const payload = {
            firstName,
            lastName,
            emailId,
            password,
            mobile
        }

        // let  {isUser} = getRoles(role)


        // if(isUser)
        registerUser(payload);

    }

    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs">

                <div className={classes.paper}>


                    <form className={classes.form} onSubmit={handleSubmit} noValidate>

                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    name="firstName"
                                    value={firstName}
                                    onInput={e => setFirstName(e.target.value)}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    value={lastName}
                                    onInput={e => setLastName(e.target.value)}
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    value={emailId}
                                    onInput={e => setEmail(e.target.value)}
                                    required
                                    fullWidth
                                    id="emailId"
                                    label="Email Id"
                                    name="emailId"
                                    autoComplete="email"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    value={password}
                                    onInput={e => setPassword(e.target.value)}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    value={mobile}
                                    onInput={e => setPhoneNumber(e.target.value)}
                                    required
                                    fullWidth
                                    name="mobile"
                                    label="Mobile No."
                                    type="number"
                                    id="mobile"
                                />
                            </Grid>

                        </Grid>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Register
                            </Button>
                        </div>
                    </form>
                </div>

            </Container>
        </React.Fragment>

    )
}

export default Register
