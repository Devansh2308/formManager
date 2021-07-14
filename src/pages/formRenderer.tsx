import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormRendererMaster from "./../components/formRenederer"
import { useStore } from '../components/hooks/useStore';
import FormRendererProvider from '../components/FormRendererProviders';
import { FormRenderContextProps } from '../components/types';

export default function FormDialog() {
    const [open, setOpen] = React.useState(true);
    const [store] = useStore<FormRenderContextProps>('form-state', {} as any)

    


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <FormRendererProvider renderState={store as any}>
                        <FormRendererMaster />
                    </FormRendererProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}