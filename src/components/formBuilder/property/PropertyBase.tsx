import {
    AppBar,
    Button,
    DialogActions,
    Divider,
    SwipeableDrawer,
    Toolbar,
    IconButton,
    Tooltip
} from "@material-ui/core"
import React from "react"
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import { useFormBuilder } from "../../FormBuilderProviders";
import CloseIcon from '@material-ui/icons/Close';
import { isUndefined } from "lodash";

interface IPropertyBaseProps {
    open: boolean,
    onClose: () => void
}


const useStyles = makeStyles(({ palette: { background, divider, common },
    spacing, typography: { h5 }, shape, breakpoints }: Theme) => ({
        wrapper: {
            width: '100%',
            minHeight: spacing(15),
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
            borderRightStyle: "solid"
        },
        header: {
            ...h5,
            marginBottom: spacing(1),
            fontSize: "1.2rem"
        },
        appBar: {
            top: 'auto',
            bottom: 0,
            width: 550,
            backgroundColor: "#F1F1F1"

        },
        header1: {
            display: "flex",
            margin: spacing(2)
        },
        grow: {
            flexGrow: 1,
        },
        list: {
            width: 550,
            height: "100%"
        },
        search: {
            flexGrow: 1,
            alignContent: "right"
        },
        closeIcon: {
            float: "right",
            padding: "0px !important"
        },
        topHeader: {
            // position: "fixed"
            position: "sticky",
            top: "0px",
            backgroundColor: "white",
            zIndex: 100
        }

    }))

const PropertyBase: React.FC<IPropertyBaseProps> = ({ open,
    onClose
}) => {
    const classes = useStyles()
    const { builderState, formElementsMap, setBuilderState } = useFormBuilder()
    const handleSave = (values: any) => {
        const selectedIndex = builderState?.items.findIndex((item) => item.id === builderState.selected)
        if (builderState?.items && !isUndefined(selectedIndex) && selectedIndex! > -1) {
            const newItem = [...builderState?.items]
            newItem[selectedIndex] = { ...newItem[selectedIndex], settings: values }
            setBuilderState({ ...builderState, items: newItem })
        }
        onClose()
    }

    const RenderSettingTemplate = React.useMemo(() => {
        const selectedItem = builderState?.items.find((item) => item.id === builderState.selected)
        const C = formElementsMap?.find((El) => El.type === selectedItem?.element)
        return { C, selectedItem }
    }, [builderState])




    return <>
        <SwipeableDrawer
            anchor={"right"}
            open={open}
            onClose={onClose}
            onOpen={() => { }}
        >
            <div className={classes.topHeader}>
                <div >
                    <div className={classes.header1}>
                        <div className={classes.header}>
                            {RenderSettingTemplate.C?.itemName} Settings
                        </div>
                        <div className={classes.search}>
                            <Tooltip title="Close">
                                <IconButton onClick={onClose} className={classes.closeIcon}>
                                    <CloseIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <Divider />
            </div>
            <div
                className={classes.list}
                role="presentation"
            >
                {RenderSettingTemplate.C?.renderSettings({
                    settings: RenderSettingTemplate.selectedItem?.settings! as any, onSave: handleSave
                })}
            </div>
            <AppBar position="sticky" color="primary" className={classes.appBar}>
                <Toolbar style={{ display: "grid" }}>
                    <DialogActions>
                        <Button onClick={onClose} variant="outlined" >
                            Cancel
                        </Button>
                        <Button type="submit" form="settings-form" variant="contained" autoFocus color="secondary">
                            Save
                        </Button>
                    </DialogActions>
                </Toolbar>
            </AppBar>
        </SwipeableDrawer>
    </>
}

export default PropertyBase