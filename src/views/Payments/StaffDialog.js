import React, { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ethereum_address from 'ethereum-address';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import { Tokens } from '../../config';

const useStyles = makeStyles((theme) => ({
    basicContainer: {
        padding: "50px"
    },
    dialogTitle: {
        fontWeight: "bold !important"
    }
}));

const GreenSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: `${pink[600]} !important`,
        '&:hover': {
            backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: `${pink[600]} !important`,
    },
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));

const StaffDialog = ({ type, staff, staffOpen, sHandleClose, memberData, addMember, editMember }) => {

    const classes = useStyles();
    const [id, setId] = useState("");
    const [wName, setWName] = useState("");
    const [address, setAddress] = useState("");
    const [price, setPrice] = useState("");
    const [token, setToken] = useState("");
    const [paid, setPaid] = useState(false);

    useEffect(() => {
        if (memberData.id) {
            setId(memberData.id)
            setWName(memberData.wName)
            setAddress(memberData.address)
            setPrice(memberData.price)
            setToken(memberData.token)
            setPaid(memberData.paid)
        } else {
            setId("")
            setWName("")
            setAddress("")
            setPrice("")
            setToken("")
            setPaid(false)
        }
    }, [memberData])

    const saveMember = () => {
        var obj = {
            id,
            wName,
            address,
            price,
            token,
            paid
        }
        if (!ethereum_address.isAddress(address)) {
            toast("address is invalid")
            return;
        }
        if (!wName || !address || !price || !token) {
            toast("Input fields correctly")
            return;
        }
        if (obj.address === memberData.address && obj.id === memberData.id && obj.wName === memberData.wName && obj.paid === memberData.paid && obj.price === memberData.price && obj.token === memberData.token) {
            sHandleClose()
            return;
        }
        type === "add" ? addMember(obj) : editMember(obj);
    }

    return (
        <Dialog open={staffOpen} className={classes.dialogRoot}>
            <Box className={classes.basicContainer}>
                <DialogTitle className={classes.dialogTitle}>{type === "add" ? "Add Member" : "Edit Member"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="wName"
                        label="Wallet Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={wName}
                        onChange={(e) => setWName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="address"
                        label="Wallet Address"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="price"
                        label="Price"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <FormControl sx={{ m: 1, minWidth: "100%", margin: 0 }} variant="standard">
                        <InputLabel id="customized-select-label">Token</InputLabel>
                        <Select
                            labelId="customized-select-label"
                            id="customized-select"
                            value={token}
                            onChange={(e) => {
                                setToken(e.target.value)
                            }}
                            input={<BootstrapInput />}
                        >
                            {Tokens.map((item, index) => {
                                return <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        control={
                            <GreenSwitch
                                checked={paid}
                                value={paid}
                                onChange={(e) => setPaid(e.target.checked)}
                                value="paid"
                            />
                        }
                        label="Is Paid"
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={sHandleClose}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={saveMember}>Ok</Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}

export default StaffDialog;