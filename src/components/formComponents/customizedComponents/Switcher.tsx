import {
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    FormHelperText,
    Switch
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




interface SwitchInputProps {
    label: string,
    instructions?: string
}

const SwitchInput: React.FC<SwitchInputProps> = ({ label, instructions }) => {
    const classes = useStyles()

    return <>
        <FormControl component="fieldset" className={classes.formControl}>

            <FormGroup>
                <FormControlLabel
                    control={<Switch name={label} />}
                    label={label}
                    labelPlacement="start"
                />

            </FormGroup>
            <FormHelperText>{instructions}</FormHelperText>
        </FormControl>
    </>
}

export default SwitchInput