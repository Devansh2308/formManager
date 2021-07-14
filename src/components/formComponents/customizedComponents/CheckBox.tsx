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
import { useFormikContext } from "formik"
import { get } from "lodash"
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
            fontSize: "0.75rem",
            color: text.secondary

        }

    }))




interface CheckBoxInputProps {
    options: string[],
    label: string,
    multiple?: boolean,
    description?: string,
    builderMode: boolean
}

const CheckBoxInput: React.FC<CheckBoxInputProps> = ({ options, label, multiple, description, builderMode }) => {


    const classes = useStyles()

    const formikProps = useFormikContext<any>()
    console.log(formikProps)
    const handleChange = (option: string) => {
        if (!builderMode) {
            if (formikProps?.values?.[label]?.includes(option)) {
                let options = formikProps?.values?.[label].filter((v: any) => v != option)
                formikProps?.setValues({ ...formikProps?.values, [label]: options })

            } else {

                let options = formikProps?.values[label]
                options?.push(option)
                formikProps?.setValues({ ...formikProps?.values, [label]: Boolean(options) ? options : [option] })
            }

        }
    }


    return <>
        <form>
            <FormControl component="fieldset" >
                <FormLabel className={classes.formLabel}>{label}</FormLabel>
                <FormGroup className={classes.formGroup}>
                    <Box pl={1} display="grid">
                        {options.map((option, index) => {
                            return (<FormControlLabel
                                key={index}
                                //@ts-ignore
                                control={<Checkbox checked={formikProps?.values?.[label]?.includes(option)} onChange={() => { handleChange(option) }}
                                    name={option} className={classes.checkBox} />}
                                label={option}
                            />)
                        })}
                    </Box>
                </FormGroup>
                {description && <FormHelperText>
                    <Typography className={classes.description} variant="subtitle2">{description}</Typography>
                </FormHelperText>}
            </FormControl>
        </form>
    </>
}

export default CheckBoxInput