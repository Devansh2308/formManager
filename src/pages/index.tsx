import { Box, Button, Grid, Typography } from "@material-ui/core"
import React from "react"
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


const LandingPage: React.FC = () => {


    const classes = useStyles()

    return <>
        <div className={classes.root}>
            <div className={classes.inner}>
                {/* Header */}
                <div></div>
                {/* Bottom Part */}
                <Grid container>
                    <Grid item xs={6}>
                        <div className={classes.text}>
                            <Typography variant="h5" className={classes.header} >
                                Mange all your forms from  one place
                            </Typography>
                            <ul>
                                <li><Typography className={classes.li}> Create , Manage ,Delete and Publish forms any time at one platform </Typography></li>
                                <li><Typography className={classes.li}> Analyze , And Study your user's data effectively </Typography></li>
                                <li><Typography className={classes.li}> Powerful validations for different fields </Typography></li>
                                <li><Typography className={classes.li}> Upcoming theme and background images of forms </Typography></li>
                            </ul>
                        </div>
                        <div>
                            <Button>
                                REGISTER
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={6} justify="flex-end" alignItems="flex-end">
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