import Fab from '@mui/material/Fab';
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import Snackbar from '@mui/material/Snackbar';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const MARGIN = '10px';



function Page() {
    const [addDialogOpen, setAddOpenDialog] = React.useState(false);
    const [list, setList] = React.useState([]);
    const [filterList, setFilterList] = React.useState([]);
    const [disT, setD] = React.useState('dep');
    const [snack, setSnack] = React.useState(false);

    const [info, setInfo] = React.useState({
        NAME: '',
        DESC: '',
        AMT: 0,
        TYPE: 'dep'
    });

    const sendReqFetch20 = async () => {
        let send_data = JSON.stringify(
            {
                job: 'fetch'
            })

        try {
            fetch("http://localhost:10000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: send_data,
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                response.json().then((d) => {
                    let len = d.AMT.length;

                    let lst_ = []

                    for (let i = 0; i < len; i++) {
                        let e = {
                            AMT: d.AMT[i],
                            NAME: d.NAME[i],
                            TIME: d.TIME[i],
                            DESC:d.DESC
                        }

                        lst_.push(e);
                    }

                    setList(lst_);
                })// Parse the response body as JSON



            });
        }
        catch (error) {
            console.error("Error:", error.message);
        }
    };
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnack(false);
    };
    const snackAction = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnack}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    // data['data']['NAME']
    const sendReqAdd = async () => {
        let send_data = JSON.stringify(
            {
                job: 'add',
                data: info

            }
        );
        if (info.NAME === '' || info.TYPE === '') {
            console.error("Feilds cannot be empty!")
            setSnack(true);
            return;
        }

        console.log(`request json sent = ${send_data}`)

        try {
            fetch("http://localhost:10000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: send_data,
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                response.json().then((d) => {
                    let len = d.AMT.length;

                    let lst_ = []

                    for (let i = 0; i < len; i++) {
                        let e = {
                            AMT: d.AMT[i],
                            NAME: d.NAME[i],
                            TIME: d.TIME[i],
                            DESC:d.DESC
                        }

                        lst_.push(e);
                    }

                    setList(lst_);
                })// Parse the response body as JSON



            })


        }
        catch (error) {
            console.error("Error:", error.message);
        }
    };
    const handleClickOpen = () => {
        setAddOpenDialog(true);
    };
    const handleAddDialogClose = () => {
        setAddOpenDialog(false);
    };
    const handleCloseAdd = () => {
        sendReqAdd();
        setAddOpenDialog(false);
    };
    const handleFilter = () => {
        let send_data = JSON.stringify(
            {
                job: 'filter',
                data: {
                    NAME: info.NAME
                }

            }
        );

        try {
            fetch("http://localhost:10000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: send_data,
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                response.json().then((d) => {
                    let len = d.AMT.length;

                    let lst_ = []

                    for (let i = 0; i < len; i++) {
                        let e = {
                            AMT: d.AMT[i],
                            NAME: d.NAME[i],
                            TIME: d.TIME[i],
                            DESC:d.DESC
                        }

                        lst_.push(e);
                    }

                    setList(lst_);
                })
            })


        }
        catch (error) {
            console.error("Error:", error.message);
        }

    }

    return (
        <>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab color="primary" aria-label="add" style={{
                    margin: '10px', position: 'sticky'
                }} onClick={handleClickOpen}>
                    <AddIcon />
                </Fab>
                <Fab color="primary" aria-label="add" style={{
                    margin: '10px', position: 'sticky'
                }} onClick={sendReqFetch20}>
                    <RefreshIcon />
                </Fab>
            </Box>
            <Button onClick={handleFilter}>Filter</Button>

            <Dialog
                open={addDialogOpen}
                onClose={handleAddDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Add new transaction"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Add a new transaction to the database
                    </DialogContentText>
                    <TextField
                        required
                        id="outlined-required"
                        label="Name"
                        style={{ margin: MARGIN }}
                        onChange={(e) => {
                            setInfo({ ...info, NAME: e.target.value })
                        }}
                    /><br></br>
                    <TextField
                        required
                        id="outlined-required"
                        label="Amount"
                        type="number"
                        style={{ margin: MARGIN }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                        }}
                        onChange={(e) => {
                            setInfo({ ...info, AMT: (parseFloat(e.target.value)) });
                        }}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={disT}
                            label="Type"
                            onChange={(e) => {
                                setD(e.target.value);
                                setInfo({ ...info, TYPE: e.target.value });
                            }}
                        >
                            <MenuItem value={'dep'}>Deposit</MenuItem>
                            <MenuItem value={'wit'}>Withdraw</MenuItem>
                        </Select>
                    </FormControl>
                    <br></br>
                    <TextField
                        required
                        id="outlined-required"
                        label="Description"
                        multiline
                        style={{ margin: MARGIN }}
                        onChange={(e) => {
                            setInfo({ ...info, DESC: e.target.value });
                        }}
                    /><br></br>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddDialogClose}>Cancel</Button>
                    <Button onClick={handleCloseAdd} autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>


            <Box sx={{ width: '80%', backgroundColor: 'var(--background-100)' }}>
                <nav aria-label="main mailbox folders">
                    <List>
                        {
                            list.map((item) => (
                                <>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText primary={item.AMT} secondary={<div style={{ color: 'var(--text-600)' }}>{item.NAME + ', ' + item.TIME}</div>} />
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider />
                                </>

                            ))
                        }


                    </List>
                </nav>

            </Box>

            <Snackbar
                open={snack}
                autoHideDuration={6000}
                message="Feilds cannot be empty!"
                action={snackAction}
            />
        </>

    );
}


export default Page;