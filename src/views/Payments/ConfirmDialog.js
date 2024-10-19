import React, { useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import Box from '@mui/material/Box';

const useStyles = makeStyles((theme) => ({
    basicContainer: {
        padding: "50px"
    },
    dialogTitle: {
        fontWeight: "bold !important"
    }
}));

const ConfirmDialog = ({ cOpen, cHandleClose, deleteMember }) => {
    const classes = useStyles();
    return (
        <Dialog
            className={classes.confirmRoot}
            open={cOpen}
            onClose={cHandleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <Box className={classes.basicContainer}>
                <DialogTitle className={classes.dialogTitle} id="alert-dialog-title">
                    {"Please Confirm"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Will you really remove this staff?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={cHandleClose}>Disagree</Button>
                    <Button variant="contained" color="primary" onClick={deleteMember} autoFocus>Agree</Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}

export default ConfirmDialog;