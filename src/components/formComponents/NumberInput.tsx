
import { Divider, Grid, Switch, TextField as MaterialTextField, TextFieldProps } from "@material-ui/core"
import React from "react"
import { renderSettingsProps, TComponentType } from "../types"
import { BorderColorOutlined } from "@material-ui/icons"
import { Formik, Field, Form, FieldProps } from 'formik';
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core"
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab"


const textFieldSettingsInitialValues = {
    label: "",
    description: "",
    placeholder: "",
    variant: "outlined",
    size: "medium",
    minCharLimit: 0,
    maxCharLimit: 255,
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
        }

    }))

const RenderSettings: React.FC<renderSettingsProps> = (props) => {

    const classes = useStyles()
    const initialValues = Boolean(props?.settings) ? props?.settings : textFieldSettingsInitialValues

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
                                    <Field name="placeholder">
                                        {({ field, meta }: FieldProps<string>) => (
                                            <MaterialTextField
                                                id="placeholder"
                                                label="Placeholder"
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
                                <Grid xs={12}
                                    className={classes.field}
                                    style={{ display: "grid" }}>
                                    <span className={classes.span}>
                                        Variant
                                    </span>
                                    <ToggleButtonGroup
                                        value={values.variant}
                                        exclusive
                                        onChange={(v, a) => { setValues({ ...values, variant: a }) }}
                                        aria-label="variant"
                                        size="small"
                                        className={classes.buttonGroup}
                                    >
                                        <ToggleButton value="outlined" aria-label="left aligned">
                                            OUTLINED
                                        </ToggleButton>
                                        <ToggleButton value="standard" aria-label="centered">
                                            STANDARD
                                        </ToggleButton>
                                        <ToggleButton value="filled" aria-label="right aligned">
                                            FILLED
                                        </ToggleButton>

                                    </ToggleButtonGroup>
                                </Grid>
                                <Grid xs={12} className={classes.field} style={{ display: "grid" }}>
                                    <span className={classes.span}>
                                        Size
                                    </span>
                                    <ToggleButtonGroup
                                        value={values.size}
                                        exclusive
                                        onChange={(v, a) => { setValues({ ...values, size: a }) }}
                                        aria-label="variant"
                                        size="small"
                                        className={classes.buttonGroup}
                                    >
                                        <ToggleButton value="small" aria-label="left aligned">
                                            SMALL
                                        </ToggleButton>
                                        <ToggleButton value="medium" aria-label="centered">
                                            MEDIUM
                                        </ToggleButton>
                                        <ToggleButton value="large" aria-label="right aligned">
                                            LARGE
                                        </ToggleButton>

                                    </ToggleButtonGroup>
                                </Grid>
                                <Grid xs={12} className={classes.divider} ><Divider></Divider></Grid>
                                <Grid xs={12} className={classes.field}>
                                    <Field name="initialValue">
                                        {({ field, meta }: FieldProps<string>) => (
                                            <MaterialTextField
                                                id="initialValue"
                                                label="Initial Value"
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                error={!!(meta.touched && meta.error)}
                                                helperText={meta.touched ? meta.error : ''}
                                                {...field}
                                            />)}
                                    </Field>
                                </Grid>
                                <Grid className={classes.field} container direction={"row"} spacing={1}>
                                    <Grid xs={6} item >
                                        <Field name="minCharLimit">
                                            {({ field, meta }: FieldProps<number>) => (
                                                <MaterialTextField
                                                    id="minChar"
                                                    label="Min Char Limit"
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
                                        <Field name="maxCharLimit">
                                            {({ field, meta }: FieldProps<number>) => (
                                                <MaterialTextField
                                                    id="maxChar"
                                                    label="Max Char Limit"
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


const NumberInput: TComponentType = {
    component: (props: any) => {
        console.log("componentProps", props)
        const textFieldProps: TextFieldProps = {
            variant: props?.["variant"] ?? "outlined",
            size: props?.["size"] ?? "small",
            label: props?.["label"] ?? "",
            helperText: props?.["description"] ?? ""
        }
        return < MaterialTextField {...textFieldProps}
            type="number"
        />
    },
    componentSettings: [],
    type: "NUMBER_INPUT",
    itemName: "Number Input",
    icon: <BorderColorOutlined />,
    renderSettings: (props: renderSettingsProps) => <RenderSettings {...props} />
}

export default NumberInput