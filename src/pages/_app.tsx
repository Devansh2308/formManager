import React from "react";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {

    CssBaseline,
    LinearProgress,
    Snackbar,
    Typography,
    Paper,

} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import "regenerator-runtime/runtime";
import { ThemeProvider } from "@material-ui/core/styles";
import { useRouter, Router } from "next/router";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'


import { makeStyles, Theme } from "@material-ui/core/styles";


import blue from "@material-ui/core/colors/blue";
import orange from "@material-ui/core/colors/orange";



const useStyles = makeStyles((theme: Theme) => ({
    linearLoading: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: theme.zIndex.modal + 1
    },
    error: {
        background: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        padding: theme.spacing(1, 3)
    }
}));



export interface ComponentProps {
    // environment: Environment
    // viewer: AppViewerQueryResponse["viewer"]
    refetch: () => void,
    setSuccessMessage: (message: string) => void,
    setErrorMessage: (message: string) => void
}


function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MyApp = ({
    Component,
    pageProps
}: {
    Component: any;
    pageProps: any;
}) => {


    const [success, setSuccess] = React.useState(false)
    const [errors, setError] = React.useState(false)
    const [successMsg, setSuccessMsg] = React.useState("")
    const [errorMsg, setErrorMsg] = React.useState("")
    const router = useRouter();
    const classes = useStyles();
    const paths = router.route.split("/");
    const first = paths[1];

    const isProtectedRoute = React.useMemo(() => {
        return first === "dashboard"
    }, [first,]);


    // const environment: Environment | null = React.useMemo(() => {
    //     if (first === "dashboard")
    //         return makeEnvironment();
    //     return null;
    // }, [first,]);

    /* Page loading animation */
    const [routeChange, setRouteChange] = React.useState<boolean>(false);

    Router.events.on("routeChangeStart", () => {
        setRouteChange(true);
    });
    Router.events.on("routeChangeComplete", () => setRouteChange(false));
    Router.events.on("routeChangeError", () => setRouteChange(false));
    const [loading, setLoading] = React.useState<boolean>(false);

    const [currentTheme, setCurrentTheme] = React.useState(() =>
        createMuiTheme({
            typography: {
                fontFamily: [
                    'Nunito',
                    'Montserrat',
                    'Roboto',
                    'sans-serif',
                    'Arial',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
                    'Roboto',
                    '"Helvetica Neue"',
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                ].join(','),
                body1: { fontSize: "0.85rem" }
            },

        })
    );

    const handleClose = (event?: React.SyntheticEvent,) => {
        setSuccess(false);
        setError(false)
    };

    const setSuccessMessage = (msg: string) => {
        setSuccessMsg(msg)
        setSuccess(true)
    }

    const setErrorMessage = (msg: string) => {
        setErrorMsg(msg)
        setError(true)
    }

    /* Error reporting */

    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DndProvider backend={HTML5Backend}>
                    <div >
                        <Component {...pageProps}
                            setSuccessMessage={setSuccessMessage}
                            setErrorMessage={setErrorMessage}
                        />
                    </div>
                </DndProvider>
            </MuiPickersUtilsProvider>
        </ThemeProvider >
    );
};

export default MyApp;