import React from "react"
import FormBuilderMaster from "../../components/formBuilder"
import FormBuilderProvider from "../../components/FormBuilderProviders"
import * as formElementMap from "../../components/formComponents"
import { FormBuilderState } from "../../components/types"


const FormMakerMaster: React.FC = () => {

    const [state, setState] = React.useState<FormBuilderState | null>(null)
    console.log(Object(formElementMap))

    return (<>
        <FormBuilderProvider builderState={state}
            setBuilderState={setState as any}
            formElementsMap={Object.values(formElementMap)}>
            <FormBuilderMaster />
        </FormBuilderProvider>
    </>)

}

export default FormMakerMaster