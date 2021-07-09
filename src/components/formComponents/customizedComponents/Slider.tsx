import {
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    FormHelperText,
    Switch,
    Slider
} from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import React from "react"

const useStyles = makeStyles(({ palette: { background, divider, common },
    spacing, typography: { h5 }, shape, breakpoints }: Theme) => ({
        root: {
            display: 'flex',
        },
        formControl: {
            margin: spacing(3),
        },

    }))




interface SliderInputProps {
    label: string,
    instructions?: string
}

const SliderInput: React.FC<SliderInputProps> = ({ label, instructions }) => {
    const classes = useStyles()

    return <>
        <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup>
                <FormControlLabel
                    control={<Slider name={label} />}
                    label={label}
                />
            </FormGroup>
            <FormHelperText>{instructions}</FormHelperText>
        </FormControl>
    </>
}

export default SliderInput