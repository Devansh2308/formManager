
import { Box, Divider, Grid, IconButton, Radio, Switch, TextField as MaterialTextField, TextFieldProps, Tooltip, Typography, Collapse } from "@material-ui/core"
import React from "react"
import { renderSettingsProps, TComponentType } from "../types"
import { CheckBoxOutlined, RemoveCircleOutline, AddOutlined } from "@material-ui/icons"
import { Formik, Field, Form, FieldProps, FieldArray } from 'formik';
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core"
import * as yup from "yup"
import CheckBoxInput from "./customizedComponents/CheckBox";




const checkBoxSettingsInitialValues = {
    label: "Check Box",
    description: "",
    options: ["Option 1"],
    singleOption: true,
    minOptionToBeSelected: 1,
    maxOptionToBeSelected: 1,
    required: false,
    enabled: true
}

const checkBoxSettingsValidationSchema = yup.object().shape({
    label: yup
        .string()
        .max(50, (`Max 50 characters allowed` as unknown) as string)
        .required((`Required` as unknown) as string),
    options: yup.array().of(yup
        .string()
        .max(50, (`Max 50 characters allowed` as unknown) as string)
        .required((`Required` as unknown) as string)),
    minOptionToBeSelected: yup.number().test('options', 'option Validation', function (value) {
        const options = this.parent.options
        if (this.parent.singleOption) return true
        if (this.parent.minOptionToBeSelected > options.length) {
            return new yup.ValidationError(
                (`minimum option can't be greater than ${options.length}` as unknown) as string,
                null,
                'minOptionToBeSelected'
            )
        }
        if (this.parent.minOptionToBeSelected < 1) {
            return new yup.ValidationError(
                (`minimum option can't be less than 1` as unknown) as string,
                null,
                'minOptionToBeSelected'
            )
        }
        return true
    }),
    maxOptionToBeSelected: yup.number().test('options', 'option Validation', function (value) {
        const options = this.parent.options
        if (this.parent.singleOption) return true
        if (this.parent.maxOptionToBeSelected > options.length) {
            return new yup.ValidationError(
                (`minimum option can't be greater than ${options.length}` as unknown) as string,
                null,
                'maxOptionToBeSelected'
            )
        }
        if (this.parent.maxOptionToBeSelected < 1) {
            return new yup.ValidationError(
                (`maximum option can't be less than 1` as unknown) as string,
                null,
                'maxOptionToBeSelected'
            )
        }
        return true
    })

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
    const initialValues = Boolean(props?.settings) ? props?.settings : { ...checkBoxSettingsInitialValues }

    return (<>
        <div className={classes.root}>
            <div>
                <Formik
                    initialValues={initialValues!}
                    validationSchema={checkBoxSettingsValidationSchema}
                    onSubmit={(
                        values
                    ) => {
                        props?.onSave?.(values)
                    }}

                >
                    {({ values, setValues }) => (
                        <Form className={classes.form} id="settings-form">
                            <Grid container>
                                <Box mb={1} ><b>Label & Placeholder's settings</b></Box>
                                <Grid xs={12} className={classes.field}>
                                    <Field name="label">
                                        {({ field, meta }: FieldProps<string>) => (
                                            <MaterialTextField
                                                id="label"
                                                label="Check Box Label"
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
                                <Box >Options</Box>
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
                                <Grid xs={12} className={classes.field}>
                                    <Box mb={0.5}>
                                        <Typography>Check-box settings</Typography>
                                    </Box>
                                    <Box>
                                        <Box display="flex">
                                            <Radio checked={values.singleOption} onClick={() => { setValues({ ...values, singleOption: true }) }} />
                                            <Box pt={1.5}>
                                                <Typography>Allow only single option to be selected</Typography>
                                            </Box>
                                        </Box>
                                        <Box display="flex">
                                            <Radio checked={!values.singleOption} onClick={() => { setValues({ ...values, singleOption: false }) }} />
                                            <Box pt={1.5}>
                                                <Typography>Allow multiple options to be selected</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Collapse in={!values.singleOption}>
                                    <Grid className={classes.field} container direction={"row"} spacing={1}>
                                        <Grid xs={6} item >
                                            <Field name="minOptionToBeSelected">
                                                {({ field, meta }: FieldProps<number>) => (
                                                    <MaterialTextField
                                                        id="minChar"
                                                        label="Minimum option"
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        type="number"
                                                        error={!!(meta.touched && meta.error)}
                                                        helperText={meta.touched ? meta.error : ''}
                                                        {...field}
                                                    />)}
                                            </Field>
                                        </Grid>
                                        <Grid xs={6} item >
                                            <Field name="maxOptionToBeSelected">
                                                {({ field, meta }: FieldProps<number>) => (
                                                    <MaterialTextField
                                                        id="maxChar"
                                                        label="Maximum option"
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        type="number"
                                                        error={!!(meta.touched && meta.error)}
                                                        helperText={meta.touched ? meta.error : ''}
                                                        {...field}
                                                    />)}
                                            </Field>
                                        </Grid>
                                    </Grid>
                                </Collapse>
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


const CheckBoxComponent: TComponentType = {
    component: (props: any) => {
        const checkBoxProps = {
            options: props?.["options"] ?? ["option 1"],
            label: props?.["label"] ?? "Check Box",
            description: props?.["description"] ?? "",
            builderMode: props?.["builderMode"] ?? true
        }
        return <CheckBoxInput

            {...checkBoxProps}
        />
    },
    componentSettings: [],
    type: "CHECKBOX",
    itemName: "Check-Box",
    icon: <CheckBoxOutlined />,
    renderSettings: (props: renderSettingsProps) => <RenderSettings {...props} />,
    initialValue: checkBoxSettingsInitialValues
}

export default CheckBoxComponent