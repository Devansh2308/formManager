import React from 'react'
import { FormBuilderContextProps } from './types'


export const FormBuilderContext = React.createContext<FormBuilderContextProps>({
    builderState: null,
    formElementsMap: null,
    setBuilderState: () => undefined
})

export const useFormBuilder = () => React.useContext(FormBuilderContext)

const FormBuilderProvider: React.FC<FormBuilderContextProps> = ({ children, ...props }) => {
    return (<FormBuilderContext.Provider value={props}>
        {children}
    </FormBuilderContext.Provider>)
}

export default FormBuilderProvider
