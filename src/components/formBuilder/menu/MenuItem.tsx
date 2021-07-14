import { fade, IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles, Theme, Typography } from "@material-ui/core"
import React from "react"
import { useDrag, DragSourceMonitor } from "react-dnd";
import { useFormBuilder } from "../../FormBuilderProviders";
import { nanoid } from 'nanoid'
import { Element, TComponentType } from "./../../types"
import { AddOutlined } from "@material-ui/icons"
import {
    usePopupState,
    bindTrigger,
    bindPopover,
} from 'material-ui-popup-state/hooks'
import Popover from '@material-ui/core/Popover'

export interface IMenuItemProps {
    ItemName: React.ReactNode
    ItemIcon: React.ReactNode
    type: TComponentType["type"]
    id: string

}

// const useStyles = makeStyles({
//     listItems: {
//         // width: "20%"
//         paddingLeft:
//     },

// });
const useStyles = makeStyles(({ palette: { background, divider, common, action, primary },
    spacing, typography: { h6 }, shape, breakpoints, transitions, }: Theme) => ({

        listItems: {
            paddingLeft: `${spacing(4)}px !important`,
            paddingTop: `${spacing(2)}px !important`,
            paddingBottom: `${spacing(2)}px !important`,
            "&:hover": {
                backgroundColor: `${fade("#3BA68A", 0.04)} !important`,
                color: "#3BA68A"
            },

        },



    }))




const MenuItem: React.FC<IMenuItemProps> = (item) => {
    const { formElementsMap, builderState, setBuilderState } = useFormBuilder()
    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'demoPopover',

    })
    const popOverProps = bindTrigger(popupState)
    const selectedItemSettings = formElementsMap?.find((items) => items.itemName === item.ItemName)

    const classes = useStyles()
    const { ItemName, ItemIcon } = item
    const [{ opacity }, drag] = useDrag(
        () => ({
            type: item.type,
            item: item,
            end(item, monitor) {
                const dropResult = monitor.getDropResult()
                const id = nanoid()
                setBuilderState({
                    items: Boolean(builderState?.items) ?
                        [...builderState?.items!, { id: id, element: item.type, settings: selectedItemSettings?.initialValue }] as any :
                        [{ id: id, element: item.type, settings: selectedItemSettings?.initialValue }] as any,
                    selected: id
                })
            },
            collect: (monitor: DragSourceMonitor) => ({
                opacity: monitor.isDragging() ? 0.4 : 1
            })
        }),
        [item.id]
    );

    return (<>

        <ListItem
            button
            onClick={(event) => { }}
            ref={drag}
            className={classes.listItems}

        >
            <ListItemIcon >
                {ItemIcon}
            </ListItemIcon>
            <ListItemText primary={ItemName} />

        </ListItem>


    </>)
}

export default MenuItem