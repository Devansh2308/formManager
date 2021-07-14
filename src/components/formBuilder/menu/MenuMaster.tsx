import { Avatar, Box, Divider, Drawer, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@material-ui/core"
import React from "react"
import { ReactSortable } from 'react-sortablejs'
import { HomeOutlined, BusinessCenterOutlined } from "@material-ui/icons"
import MenuItem, { IMenuItemProps } from "./MenuItem"
import { makeStyles } from '@material-ui/core/styles';
import { useFormBuilder } from "../../FormBuilderProviders"
import { nanoid } from 'nanoid'


const useStyles = makeStyles({
    drawer: {
        width: "20%"
    },

});


const FormMenuMaster: React.FC = () => {

    const classes = useStyles()
    const { formElementsMap } = useFormBuilder()
    const items: IMenuItemProps[] = formElementsMap?.map(({ itemName, type, icon }) => {
        return {
            type,
            ItemName: itemName,
            ItemIcon: icon,
            id: nanoid()
        }
    })!


    return (<React.Fragment >
        <Drawer anchor={"left"}
            open={true}
            variant="persistent"
            className={classes.drawer}
            classes={{
                paper: classes.drawer,
            }}
        >

            <ListItem alignItems="flex-start">
                <ListItemText
                    primary="Form Items"
                    secondary={"Click on item or drag and drop to build area to use elements in forms"}
                    primaryTypographyProps={{ variant: "h6" }}
                />
            </ListItem>
            <Divider />
            <Box mt={1}>
                <ReactSortable
                    animation={300}
                    group={{ name: 'shared', pull: 'clone', put: false }}
                    list={items}
                    sort={false}
                    setList={() => undefined}
                    // className={classes.list}
                    setData={(dataTransfer: DataTransfer, draggedElement: HTMLElement) => {
                        const dragImage = document.createElement('img')
                        dragImage.src = draggedElement.dataset.dragImage as string
                        dataTransfer.setDragImage(dragImage, -10, -10)
                    }}
                >
                    <List>
                        {items.map((item) => {
                            return <MenuItem {...item} />
                        })}
                    </List>
                </ReactSortable>
            </Box>
        </Drawer>
    </React.Fragment>)
}

export default FormMenuMaster