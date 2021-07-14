import { Box, Button, Paper, Typography } from "@material-ui/core"
import React from "react"
import {
    BlockPicker,
    TwitterPicker,
    GithubPicker,
    SketchPicker,
    ChromePicker,
    SwatchesPicker,
    CirclePicker,
} from "react-color"
import {
    usePopupState,
    bindTrigger,
    bindPopover,
} from 'material-ui-popup-state/hooks'
import Popover from '@material-ui/core/Popover'
import { makeStyles, Theme } from "@material-ui/core/styles"





interface ColorPickerProps {
    variant: "BLOCK" | "TWITTER" | "GITHUB" | "SKETCH" | "CHROME" | "SWATCHES" | "CIRCLE",
    label: string
    description?: string
    initialColor?: string
}
const useStyles = (color: string) => {
    return makeStyles(({ palette: { text },
        spacing, typography: { subtitle2 }, shape, breakpoints }: Theme) => ({
            button: {
                height: spacing(3),
                width: spacing(3),
                borderRadius: "50%",
                backgroundColor: color,
                cursor: "pointer",
                borderStyle: "solid",
                borderWidth: "2px",
                borderColor: "white",
                "&:hover": {
                    backgroundColor: color,
                },

            },
            description: {
                ...subtitle2,
                fontSize: "0.75rem",
                color: text.secondary

            }

        }))
}


const ColorPickerComponent: React.FC<ColorPickerProps> = ({ label, variant, description, initialColor }) => {
    const [color, setColor] = React.useState(Boolean(initialColor) ?
        initialColor : "#" + Math.floor(Math.random() * 16777215).toString(16))
    const classes = useStyles(color!)()

    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'demoPopover',
    })

    const getColorPicker = () => {
        switch (variant) {
            case "BLOCK": {
                return <BlockPicker
                    color={color}
                    onChange={(color) =>
                        setColor(color.hex)}
                />
            }
            case "TWITTER": {
                return <TwitterPicker
                    color={color}
                    onChange={(color) =>
                        setColor(color.hex)} />
            }
            case "GITHUB": {
                return <GithubPicker
                    color={color}
                    onChange={(color) =>
                        setColor(color.hex)}
                />
            }
            case "SKETCH": {
                return <SketchPicker
                    color={color}
                    onChange={(color) =>
                        setColor(color.hex)} />
            }
            case "CHROME": {
                return <ChromePicker
                    color={color}
                    onChange={(color) =>
                        setColor(color.hex)} />
            }
            case "SWATCHES": {
                return <SwatchesPicker
                    color={color}
                    onChange={(color) =>
                        setColor(color.hex)} />
            }
            case "CIRCLE": {
                return <CirclePicker
                    color={color}
                    onChange={(color) =>
                        setColor(color.hex)} />
            }
        }
    }

    return <>

        <Box display="flex">
            <Box mt={0.25}>{label}</Box>
            <Box ml={1}><Paper elevation={0} className={classes.button} {...bindTrigger(popupState)}></Paper></Box>
        </Box>
        {description && <Typography className={classes.description} >{description}</Typography>}
        <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <Box mt={1} p={1}>{getColorPicker()}</Box>


        </Popover>
    </>
}


export default ColorPickerComponent