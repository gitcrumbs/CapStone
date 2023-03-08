import {Button, Container, Grid, makeStyles, React, Typography, useEffect, useState} from "../../component";
import {appNotification} from "../../common/notification/app-notification";
import {getDoctorsApi, getSpecialityApi} from "../../auth/authDispatcher";
import Paper from '@material-ui/core/Paper';
import {Rating} from 'react-simple-star-rating';
import Select from 'react-select';


const useStyles = makeStyles((theme) => ({


    list_parent: {
        marginTop: theme.spacing(1),
    },
    list_theme: {
        display: "flex",
        width: '40%',
        marginTop: theme.spacing(1),

    },
    paper_theme: {
        width: 450,
        marginTop: theme.spacing(2),
        padding: theme.spacing(3),
        height: 180,
        alignItems: 'center',
    },

    button_theme: {
        height: 50
    }

}));


function DoctorList(props) {

    const classes = useStyles();

    let isFirstTime = false;

    const [data, setData] = useState({doctors: [], isFetching: false});

    async function getDoctors(speciality) {
        //event.preventDefault();
        console.log("getDoctors", "getDoctors call")

        setData({doctors: data.doctors, isFetching: true});

        getDoctorsApi(speciality)
            .subscribe((response) => {

                console.log("getDoctors result ", response)
                try {
                    setData({doctors: response, isFetching: false});
                } catch (e) {
                    console.log(e);
                    setData({doctors: data.doctors, isFetching: false});
                }

            }, (error => {
                appNotification.showError(error)


            }))


    }

    const [selectOptions, setselectOptions] = useState(null);

    async function getSpeciality() {
        //event.preventDefault();
        console.log("getSpeciality", "getSpeciality call")
        getSpecialityApi()
            .subscribe((response) => {
                console.log("getSpeciality result ", response)
                try {
                    let tmpArray = []
                    for (var i = 0; i < response.length; i++) {
                        const optionInfo = {}
                        optionInfo.value = response[i];
                        optionInfo.label = response[i];
                        tmpArray.push(optionInfo)
                    }

                    setselectOptions(tmpArray);

                } catch (e) {
                    console.log(e);
                }

            }, (error => {
                appNotification.showError(error)

            }))


    }


    useEffect(() => {
        console.log("useEffect", "useEffect call isFirstTime=" + isFirstTime)

        getSpeciality();
        const speciality = "CARDIOLOGIST";
        getDoctors(speciality);

    }, [])


    const handleClickBookAppoint = () => {
    };

    const handleClickViewDetails = () => {

    };

    const handleChange = (selectedOption) => {
        console.log("selectedOption", "selectedOption=" + selectedOption.value)
        getDoctors(selectedOption.value);
    };


    return (<React.Fragment>

        <Container component="main" maxWidth="xs">

            <Typography style={{marginTop: 20}}>Select Speciality:</Typography>
            <div className="App">
                <Select options={selectOptions} onChange={handleChange.bind(this)}/>
            </div>

            {
                (data.isFetching) ?
                    <div>Loading ... </div> : <div classes={classes.list_parent}>
                        <ul classes={classes.list_theme}>
                            {data.doctors.map(item => (


                                <Paper elevation={0} className={classes.paper_theme}>

                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                            <Typography>
                                                Doctor Name:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography>
                                                {item.firstName + " " + item.lastName}
                                            </Typography>
                                        </Grid>

                                    </Grid>


                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                            <Typography>
                                                Speciality:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography>
                                                {item.speciality}
                                            </Typography>
                                        </Grid>

                                    </Grid>


                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                            <Typography>
                                                Rating:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8}>


                                            <Rating

                                                ratingValue={item.rating}
                                                size={20}
                                                label
                                                transition
                                                fillColor='orange'
                                                emptyColor='gray'
                                                className='foo'

                                            />

                                        </Grid>

                                    </Grid>


                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Button classes={classes.button_theme} color="primary" variant="contained"
                                                    onClick={handleClickBookAppoint}>
                                                BOOK APPOINTMENT
                                            </Button>


                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button classes={classes.button_theme} color="primary" variant="contained"
                                                    onClick={handleClickViewDetails}>
                                                VIEW DETAILS
                                            </Button>
                                        </Grid>

                                    </Grid>


                                </Paper>


                            ))}
                        </ul>
                    </div>
            }
        </Container>


    </React.Fragment>)

}

export default DoctorList