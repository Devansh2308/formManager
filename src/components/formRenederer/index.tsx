import { Form, Formik } from "formik"
import React from "react"
import { useFormRender } from "../FormRendererProviders"
import * as formElementMap from "../../components/formComponents"


const Renderer: React.FC = () => {

    const { renderState } = useFormRender()
    const elements = Object.values(formElementMap)


    return <>
        <Formik initialValues={{}} onSubmit={(v) => { console.log(v) }}>
            <Form>
                {renderState?.items.map((item) => {
                    const el = elements.find((e) => e.type === item.element)
                    return el?.component({ ...item.settings!, builderMode: false } as any)
                })}
            </Form>
        </Formik>
    </>
}

export default Renderer