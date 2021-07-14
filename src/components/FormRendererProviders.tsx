import React from 'react'
import { FormRenderContextProps } from './types'


export const FormRenderContext = React.createContext<FormRenderContextProps>({
    renderState: null,

})

export const useFormRender = () => React.useContext(FormRenderContext)

const FormRendererProvider: React.FC<FormRenderContextProps> = ({ children, ...props }) => {
    return (<FormRenderContext.Provider value={props}>
        {children}
    </FormRenderContext.Provider>)
}

export default FormRendererProvider
