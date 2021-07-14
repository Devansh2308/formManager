
import { Box, Divider, Grid, IconButton, Switch, TextField as MaterialTextField, TextFieldProps, Tooltip } from "@material-ui/core"
import React from "react"
import { renderSettingsProps, TComponentType } from "../types"
import { AddOutlined, RadioButtonCheckedOutlined, RemoveCircleOutline } from "@material-ui/icons"
import { Formik, Field, Form, FieldProps, FieldArray } from 'formik';
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core"
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab"
import CheckBoxInput from "./customizedComponents/CheckBox";
import RadioButtonInput from "./customizedComponents/RadioButton";


const radioButtonSettingsInitialValues = {
    label: "Radio Button",
    description: "",
    options: ["Option 1"],
    singleOption: true,
    minOptionToBeSelected: 1,
    maxOptionToBeSelected: 1,
    required: false,
    enabled: true
}

const textFieldSettingsValidationSchema = {}


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
        },
        options: {
            padding: "8px !important"
        },
        optionContainer: {
            display: "flex",
            marginTop: spacing(2)
        }

    }))

const RenderSettings: React.FC<renderSettingsProps> = (props) => {

    const classes = useStyles()
    const initialValues = Boolean(props?.settings) ? props?.settings : radioButtonSettingsInitialValues

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

                >
                    {({ values, setValues }) => (
                        <Form className={classes.form} id="settings-form">
                            <Grid container>
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
                                {values.options && <Grid xs={12} className={classes.divider} ><Divider></Divider></Grid>}
                                <Box ><b>Options</b></Box>
                                <Grid xs={12} className={classes.field} style={{ marginTop: "0px" }}>
                                    <FieldArray
                                        name="options"
                                        render={arrayHelpers => (
                                            <div >
                                                {values.options && (
                                                    values.options.map((option: string, index: number) => (
                                                        <div key={index} className={classes.optionContainer}>
                                                            <Field name={`options.${index}`}>
                                                                {({ field, meta }: FieldProps<string>) => (
                                                                    <MaterialTextField
                                                                        id={`option.${index + 1}`}
                                                                        label={`Option ${index + 1}`}
                                                                        variant="outlined"
                                                                        size="small"

                                                                        error={!!(meta.touched && meta.error)}
                                                                        helperText={meta.touched ? meta.error : ''}
                                                                        {...field}
                                                                    />)}
                                                            </Field>
                                                            <Box>
                                                                {values.options.length > 1 && <Tooltip title="Remove Option">
                                                                    <IconButton
                                                                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                                        className={classes.options}
                                                                    >
                                                                        <RemoveCircleOutline />
                                                                    </IconButton>
                                                                </Tooltip>}
                                                                {index === 0 && <Tooltip title="Add Option">
                                                                    <IconButton
                                                                        type="button"
                                                                        onClick={() => arrayHelpers.insert(index, ``)} // insert an empty string at a position
                                                                        className={classes.options}
                                                                    >
                                                                        <AddOutlined />
                                                                    </IconButton>
                                                                </Tooltip>}
                                                            </Box>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        )}
                                    />
                                </Grid>


                                <Grid xs={12} className={classes.divider} ><Divider></Divider></Grid>
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


const RadioButtonComponent: TComponentType = {
    component: (props: any) => {
        const radioButtonProps = {
            options: props?.["options"] ?? ["option 1"],
            label: props?.["label"] ?? "Check Box",
            description: props?.["description"] ?? "",
            builderMode: props?.["builderMode"] ?? true
        }
        return <RadioButtonInput
            {...radioButtonProps}
            multiple
        />
    },
    componentSettings: [],
    type: "RADIO_BUTTON",
    itemName: "Radio-Button",
    icon: <RadioButtonCheckedOutlined />,
    renderSettings: (props: renderSettingsProps) => <RenderSettings {...props} />,
    initialValue: radioButtonSettingsInitialValues
}

export default RadioButtonComponent