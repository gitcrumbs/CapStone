import {React} from "../../component";
import HomeFullWidthTabs from "./HomeFullWidthTabs";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({

    '@global': {
        body: {
            backgroundColor: '#e6e6e6'
        },
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },

    toolbar: {
        flexWrap: 'wrap',
    }


}));

function Home(props) {

    const classes = useStyles();


    return (<React.Fragment>

        <div>
            <HomeFullWidthTabs className={classes.toolbar}>

            </HomeFullWidthTabs>

        </div>

    </React.Fragment>)

}

export default Home