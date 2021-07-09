
import { Box, Checkbox, Collapse, Divider, Grid, ListItem, ListItemIcon, ListItemText, MenuItem, Select, Switch, TextField as MaterialTextField, TextFieldProps } from "@material-ui/core"
import React from "react"
import { renderSettingsProps, TComponentType } from "../types"
import { ColorLensOutlined } from "@material-ui/icons"
import { Formik, Field, Form, FieldProps } from 'formik';
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core"
import ColorPickerInput from "./customizedComponents/ColorPickerInput"
import * as yup from "yup"



const colorPickerSettingsInitialValues = {
    label: "Pick a color of your choice",
    description: "",
    placeholder: "",
    variant: "TWITTER",
    initialColor: "",
    required: false,
    enabled: true
}

const colorPickerSettingsValidationSchema = yup.object().shape({
    label: yup
        .string()
        .max(50, (`Max 50 characters allowed` as unknown) as string)
        .required((`Required` as unknown) as string),
})



const useStyles = makeStyles(({ palette: { text },
    spacing,
    typography: { h6, body1 } }: Theme) => ({

        root: {
            margin: spacing(1),
            padding: spacing(1)
        },
        header: {
            ...h6,
            marginBottom: spacing(1)
        },
        form: {
            marginLeft: spacing(1)
        },
        field: {
            margin: spacing(1.5)
        },
        span: {
            ...body1,
            color: text.secondary,
            marginLeft: spacing(1),
            marginBottom: spacing(0.5)
        },
        divider: {
            marginTop: spacing(3),
            marginBottom: spacing(3)
        },
        buttonGroup: {
            "& .MuiToggleButtonGroup-groupedHorizontal": {
                width: "33% !important"
            }
        },
        buttonGroup2: {
            "& .MuiToggleButtonGroup-groupedHorizontal": {
                width: "50% !important"
            }
        }

    }))

const RenderSettings: React.FC<renderSettingsProps> = (props) => {

    const classes = useStyles()
    const initialValues = Boolean(props?.settings) ? props?.settings : colorPickerSettingsInitialValues

    return (<>
        <div className={classes.root}>
            <div>
                <Formik
                    initialValues={initialValues!}
                    onSubmit={(
                        values
                    ) => {
                        props?.onSave?.(values)
                    }}
                    validationSchema={colorPickerSettingsValidationSchema}
                >
                    {({ values, setValues }) => (
                        <Form className={classes.form} id="settings-form">
                            <Grid container>
                                <Box mb={1}>Label & Placeholder's settings</Box>
                                <Grid xs={12} className={classes.field}>
                                    <Field name="label">
                                        {({ field, meta }: FieldProps<string>) => (
                                            <MaterialTextField
                                                id="label"
                                                label="Field Label"
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                error={!!(meta.touched && meta.error)}
                                                helperText={meta.touched ? meta.error : ''}
                                                {...field}
                                            />)}
                                    </Field>
                                </Grid>
                                <Grid xs={12} className={classes.field}>
                                    <Field name="description">
                                        {({ field, meta }: FieldProps<string>) => (
                                            <MaterialTextField
                                                id="desc"
                                                label="Description"
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                rowsMax={6}
                                                error={!!(meta.touched && meta.error)}
                                                helperText={meta.touched ? meta.error : ''}
                                                {...field}
                                            />)}
                                    </Field>
                                </Grid>

                                <Grid xs={12} className={classes.divider} ><Divider></Divider></Grid>
                                <Box >Variant & Styling Settings</Box>
                                <Grid xs={12}
                                    className={classes.field}
                                    style={{ display: "flex" }}>
                                    <Box width="fit-content" pt={0.5} mr={2}>
                                        VARIANT
                                    </Box>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={values.variant}
                                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                            setValues({ ...values, variant: event.target.value })
                                        }}
                                        style={{ width: "fit-content" }}
                                    >
                                        <MenuItem value={"BLOCK"}>Block</MenuItem>
                                        <MenuItem value="TWITTER" aria-label="centered">
                                            Twitter
                                        </MenuItem>
                                        <MenuItem value="GITHUB" aria-label="right aligned">
                                            Github
                                        </MenuItem>
                                        <MenuItem value="CHROME" aria-label="right aligned">
                                            Chrome
                                        </MenuItem>
                                        <MenuItem value="SWATCHES" aria-label="right aligned">
                                            Swatches
                                        </MenuItem>
                                        <MenuItem value="CIRCLE" aria-label="right aligned">
                                            Circle
                                        </MenuItem>
                                    </Select>
                                </Grid>
                                <Grid xs={12} className={classes.divider} ><Divider></Divider></Grid>
                                <Box >Initial Values Settings</Box>
                                <Grid xs={12} className={classes.field}>
                                    <ListItem >
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={Boolean(values.initialColor)}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{ 'aria-labelledby': "labelId" }}
                                                onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                                    if (!Boolean(values.initialColor)) {
                                                        setValues({ ...values, initialColor: "#F2F340" })
                                                    } else {
                                                        setValues({ ...values, initialColor: "" })
                                                    }
                                                }}
                                            />

                                            <Box pt={1}>
                                                <ListItemText primary={`Set default initial color value`} primaryTypographyProps={{ color: "textPrimary" }} />
                                            </Box>

                                        </ListItemIcon>

                                    </ListItem>
                                    <Collapse in={Boolean(values.initialColor)}>
                                        <ListItem >
                                            <Box ml={3.5}>
                                                <ColorPickerInput label={"Choose default initial color value"} variant={"TWITTER"} initialColor={values.initialColor} />
                                            </Box>
                                        </ListItem>
                                    </Collapse>
                                </Grid>
                                <Grid xs={12} className={classes.divider} ><Divider></Divider></Grid>
                                <Box >Validations</Box>
                                <Grid className={classes.field} style={{ marginTop: "0px" }} container direction={"row"} spacing={1}>
                                    <Grid xs={5} style={{ paddingTop: "12px" }} >
                                        REQUIRED
                                    </Grid>
                                    <Grid xs={5} alignContent="flex-end">
                                        <Switch
                                            checked={values.required! as any}
                                            onChange={() => { setValues({ ...values, required: !values.required }) }}
                                            inputProps={{ 'aria-label': 'primary checkbox' }} />
                                    </Grid>
                                </Grid>
                                <Grid className={classes.field} style={{ marginTop: "0px" }} container direction={"row"} spacing={1}>
                                    <Grid xs={5} style={{ paddingTop: "12px" }} >
                                        ENABLE
                                    </Grid>
                                    <Grid xs={5} alignContent="flex-end">
                                        <Switch
                                            checked={values.enabled as any}
                                            onChange={() => { setValues({ ...values, required: !values.enabled }) }}
                                            inputProps={{ 'aria-label': 'primary checkbox' }} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Form>)}
                </Formik>
            </div>
        </div>

    </>)
}


const ColorPickerComponent: TComponentType = {
    component: (props: any) => {
        console.log("componentProps", props)
        const colorPickerProps = {
            variant: props?.["variant"] ?? "TWITTER",
            label: props?.["label"] ?? "",
            description: props?.["description"] ?? ""
        }
        return <ColorPickerInput {...colorPickerProps} />
    },
    componentSettings: [],
    type: "COLOR_PICKER",
    itemName: "Color Picker",
    icon: <ColorLensOutlined />,
    renderSettings: (props: renderSettingsProps) => <RenderSettings {...props} />,
    initialValue: colorPickerSettingsInitialValues

}

export default ColorPickerComponent