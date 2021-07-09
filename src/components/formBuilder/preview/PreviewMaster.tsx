import { Container, Paper, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";
import React from "react"
import { useDrop } from "react-dnd";
import { useFormBuilder } from "../../FormBuilderProviders";
import { useRender } from "../../hooks/useRender";
import PropertyBase from "../property/PropertyBase";

const useStyles = makeStyles({
    container: {

        minHeight: "60vh",
        backgroundColor: "#FFFFFF",
        borderRadius: "0px",
        marginLeft: "-12px",
        marginTop: "96px"
    },

});

const FormPreview: React.FC = () => {
    const classes = useStyles()
    const { builderState, setBuilderState } = useFormBuilder()
    const render = useRender()
    const [openProperty, setOpenProperty] = React.useState(false)

    const [{ canDrop, isOver }, drop] = useDrop(
        () => ({
            accept: ["INPUT"],
            drop: (item) => ({

            }),
            collect: (monitor: any) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop()
            })
        }),
        []
    );

    return (
        <>
            <PropertyBase open={openProperty} onClose={() => setOpenProperty(false)} />
            <Container maxWidth="md" >
                <Paper elevation={4} className={classes.container} ref={drop}>
                    {builderState?.items.map((item) => {
                        return render(item, () => {
                            setBuilderState({ ...builderState, selected: item.id })
                            setOpenProperty(true)
                        })
                    })}
                </Paper>
            </Container>
        </>
    )

}

export default FormPreview