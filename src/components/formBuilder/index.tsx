import React from "react"
import FormMenu from "./menu/MenuMaster"
import { makeStyles } from '@material-ui/core/styles';
import FormPreview from "./preview/PreviewMaster";
import { Fab, Grid } from "@material-ui/core";
import { VisibilityOutlined } from "@material-ui/icons"
import { useStore } from "../hooks/useStore";
import { useFormBuilder } from "../FormBuilderProviders";


const useStyles = makeStyles({
    editor: {
        backgroundColor: "#EEEEEE",
        width: "100%",
        minHeight: "100vh"
    },

});
const FormBuilderMaster: React.FC = () => {
    const classes = useStyles()


    return <>
        {/* <div className={classes.editor}> */}
        <Grid container className={classes.editor}>
            <Grid item xs={2}>
                <FormMenu />
            </Grid>
            <Grid item xs={10}>
                <FormPreview />
            </Grid>
            <Fab color="primary" aria-label="add">
                <VisibilityOutlined />
            </Fab>
        </Grid>
        {/* </div> */}
    </>
}

export default FormBuilderMaster

