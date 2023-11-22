import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

export const AppModal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.modal.isOpen);

    const cancel = () => {
        dispatch(closeModal());
    }

    const confirm = () => {
        if (components.onConfirm) {
            components.onConfirm();
        }
        dispatch(closeModal());
    }

    return (
        <Modal
            open={isOpen}>
            <Box
                component='div'>
                <Box p={2} borderBottom={1} borderColor='border.light'>
                    <Typography >
                        {components.header ? components.header : 'Confirmation Title'}
                    </Typography>
                </Box>

                <Box p={2} borderBottom={1} borderColor='border.light' >
                    {components.body ? components.body :
                        <Typography >
                            Are you sure
                        </Typography>
                    }
                </Box>
                <Box
                    component='div'
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        p: 1
                    }}
                >
                    <Button
                        onClick={cancel}
                        sx={{ mr: 1 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={confirm}>
                        OK
                    </Button>
                </Box>

            </Box >
        </Modal>
    );
};

export const setModalComponent = ( comps ) => {
    components = comps;
}