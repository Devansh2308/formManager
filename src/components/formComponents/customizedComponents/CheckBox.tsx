import {
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    FormHelperText,
    Box,
    Typography
} from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import React from "react"

const useStyles = makeStyles(({ palette: { text },
    spacing, typography: { subtitle2, body1 }, }: Theme) => ({
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
        },
        description: {
            ...subtitle2,
            fontStyle: "italic"
        }

    }))




interface CheckBoxInputProps {
    options: string[],
    label: String,
    multiple?: boolean,
    description?: string
}

const CheckBoxInput: React.FC<CheckBoxInputProps> = ({ options, label, multiple, description }) => {
    const classes = useStyles()

    return <>
        <FormControl component="fieldset" >
            <FormLabel className={classes.formLabel}>{label}</FormLabel>
            <FormGroup className={classes.formGroup}>
                <Box pl={1} display="grid">
                    {options.map((option) => {
                        return (<FormControlLabel
                            control={<Checkbox checked={false} onChange={() => { }} name={option} className={classes.checkBox} />}
                            label={option}
                        />)
                    })}
                </Box>
            </FormGroup>
            {description && <FormHelperText>
                <Typography className={classes.description} variant="subtitle2">{description}</Typography>
            </FormHelperText>}
        </FormControl>
    </>
}

export default CheckBoxInput