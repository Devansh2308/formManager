
import { Box, Divider, Grid, MenuItem, Select, Switch, TextField as MaterialTextField, TextFieldProps } from "@material-ui/core"
import React from "react"
import { renderSettingsProps, TComponentType } from "../types"
import { DateRangeOutlined } from "@material-ui/icons"
import { Formik, Field, Form, FieldProps } from 'formik';
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core"
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab"
import { DatePicker } from "@material-ui/pickers";


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


const DatePickerComponent: TComponentType = {
    component: (props: any) => {
        const textFieldProps: TextFieldProps = {
            variant: props?.["variant"] ?? "outlined",
            size: props?.["size"] ?? "small",
            label: props?.["label"] ?? "",
            helperText: props?.["description"] ?? ""
        }
        return <DatePicker
            label="Basic example"
            value={"12/03/2022"}
            onChange={() => { }}
            animateYearScrolling
        />
    },
    componentSettings: [],
    type: "DATE_PICKER",
    itemName: "Date Picker",
    icon: <DateRangeOutlined />,
    renderSettings: (props: renderSettingsProps) => <RenderSettings {...props} />
}

export default DatePickerComponent