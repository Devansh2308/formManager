import { AppBar, Box, Button, Grid, Toolbar, Typography, useScrollTrigger } from "@material-ui/core"
import React, { Props } from "react"
import { makeStyles, Theme } from "@material-ui/core/styles";
import Image from 'next/image';


const useStyles = makeStyles(({ palette: { text, primary },
    spacing,
    typography: { h6, body1 } }: Theme) => ({

        root: {
            minHeight: '100vh',
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
            flexGrow: 1,
            background: `url('/Wave.svg')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',


        },

        inner: {
            padding: spacing(16)
        },

        header: {
            color: primary.main,
            fontWeight: "bold",
            fontSize: "2.5rem"
        },
        li: {
            fontSize: "1.2rem",
            padding: spacing(1)
        },
        text: {
            marginTop: spacing(7)
        },
        field: {
            margin: spacing(1.5)
        },
        img: {
            borderRadius: spacing(2),

        },
        span: {
            ...body1,
            color: text.secondary,
            marginLeft: spacing(1),
            marginBottom: spacing(0.5)
        },
        divider: {
            marginTop: spacing(3),
            marginBottom: spacing(3)
        },
        buttonGroup: {
            "& .MuiToggleButtonGroup-groupedHorizontal": {
                width: "33% !important"
            }
        },
        buttonGroup2: {
            "& .MuiToggleButtonGroup-groupedHorizontal": {
                width: "50% !important"
            }
        }

    }))


function ElevationScroll(props: any) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const LandingPage: React.FC = () => {


    const classes = useStyles()

    return <>
        <div className={classes.root}>
            <ElevationScroll >
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6" style={{ color: "white" }}>Form-O-Manager</Typography>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.inner}>
                {/* Header */}
                <div></div>
                {/* Bottom Part */}
                <Grid container>
                    <Grid item xs={7}>
                        <div className={classes.text}>
                            <Typography variant="h5" className={classes.header} >
                                Simplify data collection with form-o-manager
                            </Typography>
                            <ul>
                                <li><Typography className={classes.li}> Create , Manage ,Delete and Publish forms any time at one platform </Typography></li>
                                <li><Typography className={classes.li}> Analyze , And Study your user's data effectively </Typography></li>
                                <li><Typography className={classes.li}> Powerful validations for different fields </Typography></li>
                                <li><Typography className={classes.li}> Upcoming theme and background images of forms </Typography></li>
                                <li><Typography className={classes.li}> 10+ Input Elements , Input elements like payment are coming soon. </Typography></li>
                            </ul>
                        </div>
                        <div>
                            <Typography style={{ marginLeft: "8px", fontSize: "1.1rem" }}>
                                Managing forms can be challenging and frustrating. It can be tough to manage multiple forms and
                                their responses.Specialty of form-o-manager is to make collection of data and Analyze the data in
                                different formats seamlessly easy and cool.
                            </Typography>
                        </div>
                        <Button color="secondary" variant="contained">
                            View Demo
                        </Button>
                    </Grid>
                    <Grid item xs={5} justify="flex-end" alignItems="flex-end">
                        <Box>
                            <img
                                src="/landing2.png"
                                alt="logo"
                                width={700}
                                height={520}
                                className={classes.img}

                            />
                        </Box>
                    </Grid>

                </Grid>
            </div>
        </div>

    </>
}

export default LandingPage