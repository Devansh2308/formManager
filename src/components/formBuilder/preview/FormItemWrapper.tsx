import React from "react"
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Theme } from "@material-ui/core";
import { useFormBuilder } from "../../FormBuilderProviders";
import clsx from "clsx";

const useStyles = makeStyles(({ palette: { background, divider }, spacing }: Theme) => ({
    selected: {
        width: '100%',

        backgroundColor: "#F9FFFE",
        borderLeftWidth: "-8px",
        borderLeftStyle: "solid",
        borderLeftColor: "#3BA68A",
        borderTopWidth: "1px",
        borderTopColor: "#90D8C8",
        borderTopStyle: "solid",
        borderBottomWidth: "1px",
        borderBottomColor: "#90D8C8",
        borderBottomStyle: "solid",
        borderRightWidth: "1px",
        borderRightColor: "#90D8C8",
        borderRightStyle: "solid",
        '&:hover': {
            borderStyle: "dashed",
            borderColor: "black",
            borderWidth: "1px"
        }
    },
    simple: {
        width: '100%',

        '&:hover': {
            borderStyle: "dashed",
            borderColor: "black",
            borderWidth: "1px"
        }
    },
    child: {
        margin: spacing(2),
        padding: spacing(2)
    }

}))

const ElementWrapper: React.FC<{ onItemClick: () => void, id: string }> = ({ children, onItemClick, id }) => {
    const { builderState } = useFormBuilder()
    const classes = useStyles()
    return (<>
        <div className={
            clsx(builderState?.selected === id ?
                classes.selected :
                classes.simple)} onClick={onItemClick}>
            <div className={classes.child}>
                {children}
            </div>
        </div>
        <Divider />
    </>)
}

export default ElementWrapper