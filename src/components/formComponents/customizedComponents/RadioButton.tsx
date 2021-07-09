import {
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Radio,
    FormHelperText,
    Box
} from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import React from "react"

const useStyles = makeStyles(({ palette: { background, divider, common, text },
    spacing, typography: { body1 }, shape, breakpoints }: Theme) => ({
        root: {
            display: 'flex',
        },
        formLabel: {
            ...body1,
            color: text.primary,

        },
        formGroup: {
            marginLeft: spacing(0.6),
        },
        checkBox: {
            padding: spacing(0.7)
        }

    }))




interface RadioButtonInputProps {
    options: string[],
    label: String,
    multiple: boolean,
    instructions?: string
}

const RadioButtonInput: React.FC<RadioButtonInputProps> = ({ options, label, multiple, instructions }) => {
    const classes = useStyles()

    return <>
        <FormControl component="fieldset" >
            <FormLabel className={classes.formLabel}>{label}</FormLabel>
            <FormGroup className={classes.formGroup}>
                <Box pl={1} display="grid">
                    {options.map((option) => {
                        return (<FormControlLabel
                            control={<Radio checked={false} onChange={() => { }} name={option} className={classes.checkBox} />}
                            label={option}
                        />)
                    })}
                </Box>
            </FormGroup>
            <FormHelperText>{instructions}</FormHelperText>
        </FormControl>
    </>
}

export default RadioButtonInput