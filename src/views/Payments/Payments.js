import React, { useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import IconButton from '@mui/material/IconButton';

import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { toast } from 'react-toastify';
import Web3 from 'web3';

import { createGlobalStyle } from 'styled-components';

import database from './firebase';
import ConfirmDialog from './ConfirmDialog';
import StaffDialog from './StaffDialog';

import useRebateTreasury from "./useRebateTreasury"

import Page from '../../components/Page';
// import PaymentCard from './PaymentsCard';
import PaymentImage from '../../assets/img/background.png';

import config from '../../config';
import { FTMGAS, ERC20ABI, Tokens } from '../../config';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${PaymentImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color:
    theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
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
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
  },
  '& .MuiDataGrid-cell': {
    color:
      theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
  ...customCheckbox(theme),
}))

function customCheckbox(theme) {
  return {
    '& .MuiCheckbox-root svg': {
      width: 16,
      height: 16,
      backgroundColor: 'transparent',
      border: `1px solid ${theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'
        }`,
      borderRadius: 2,
    },
    '& .MuiCheckbox-root svg path': {
      display: 'none',
    },
    '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
      backgroundColor: '#1890ff',
      borderColor: '#1890ff',
    },
    '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
      position: 'absolute',
      display: 'table',
      border: '2px solid #fff',
      borderTop: 0,
      borderLeft: 0,
      transform: 'rotate(45deg) translate(-50%,-50%)',
      opacity: 1,
      transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
      content: '""',
      top: '50%',
      left: '39%',
      width: 5.71428571,
      height: 9.14285714,
    },
    '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
      width: 8,
      height: 8,
      backgroundColor: '#1890ff',
      transform: 'none',
      top: '39%',
      border: 0,
    },
  };
}

function CustomPagination() {
  const apiRef = useGridApiContext()
  const page = useGridSelector(apiRef, gridPageSelector)
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2)
  },
  content: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2)
  }
}))

export default function Payments() {

  const classes = useStyles()
  const rebateStats = useRebateTreasury()

  const { path } = useRouteMatch()
  const { account } = useWallet()
  const [staffOpen, setStaffOpen] = useState(false)
  const [cOpen, setCOpen] = useState(false)
  const [rowId, setRowId] = useState(null)
  const [type, setType] = useState(null)
  const [staff, setStaff] = useState(null)
  const [enoughGas, setEnoughGas] = useState(false)
  const [walletData, setWalletData] = useState([])
  const [memberData, setMemberData] = useState({})

  const web3 = new Web3(config.defaultProvider)

  const fields = [
    { field: 'id', headerName: 'ID', width: 10, hideable: true },
    {
      field: 'wName',
      headerName: 'Walllet Name',
      width: 200,
    },
    {
      field: 'address',
      headerName: 'Wallet Address',
      width: 400,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 100,
    },
    {
      field: 'token',
      headerName: 'Token',
      width: 100,
    },
    {
      field: 'paid',
      headerName: 'Is paid?',
      type: 'boolean',
      width: 100,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 250,
      sortable: false,
      getActions: (params) => [
        (<IconButton
          color="info"
          aria-label="more"
          onClick={() => onEditHandle(params.row)}>
          <MoreHorizIcon />
        </IconButton>),
        (<IconButton
          color="warning"
          aria-label="view in explorer"
          onClick={() => viewExplorer(params.row.address)}>
          <TravelExploreIcon />
        </IconButton>),
        (<IconButton
          color="success"
          aria-label="send rewards"
          onClick={() => sendRewards(params.row)}>
          <MonetizationOnIcon />
        </IconButton>),
        (<IconButton
          color="error"
          aria-label="send rewards"
          onClick={() => onDeletehandle(params.id)}>
          <DeleteSweepIcon />
        </IconButton>)
      ],
    },
  ];

  const viewExplorer = (selectedAddress) => {
    const { ftmscanUrl } = config;
    window.open(`${ftmscanUrl}/address/${selectedAddress}`, '_blank')
  }

  const addMember = (memberData) => {
    setStaffOpen(false)
    database.collection(account).get().then(querySnapshot => {
      var docRefID = null;
      querySnapshot.forEach((doc) => {
        if (walletData.findIndex(item => item.address === memberData.address) !== -1) {
          docRefID = doc.id;
        }
      })
      if (docRefID) {
        toast("Address is duplicated, if you want to edit, please edit it in edit mode!")
      } else {
        database.collection(account).add(memberData).then((docRef) => {
          memberData.id = docRef.id;
          setWalletData([
            ...walletData,
            memberData
          ])
          toast(`Success!`)
        }).catch(err => {
          console.log(err)
          toast(`Something went wrong`)
        })
      }
    })
  }

  const onEditHandle = (memberData) => {
    setType("edit")
    setMemberData(memberData)
    setStaffOpen(true)
  }

  const editMember = (memberData) => {
    setStaffOpen(false)
    database.collection(account).doc(memberData.id).update(memberData).then(() => {
      toast("Document successfully updated!")
      var basicWalletData = [];
      for (let i = 0; i < walletData.length; i++) {
        if (walletData[i].id !== memberData.id) {
          basicWalletData.push(walletData[i])
        } else {
          basicWalletData.push(memberData)
        }
      }
      setWalletData(basicWalletData)
    }).catch((error) => {
      console.log(error)
      toast("Error updating document: ", error)
      setCOpen(false)
    })
  }

  const sendRewards = async (memberData) => {
    if (memberData.paid === true) {
      toast("You have already paid to this staff.")
      return;
    }
    var mainAsset = Tokens.filter(item => item.name === memberData.token)[0]
    web3.eth.setProvider(Web3.givenProvider);
    const tokenA = new web3.eth.Contract(ERC20ABI, mainAsset.address)
    var balance = await tokenA.methods.balanceOf(account).call()

    if (web3.utils.fromWei(balance) > Number(memberData.price)) {
      var tokens = web3.utils.toWei(memberData.price.toString(), 'ether')
      var bntokens = web3.utils.toBN(tokens)
      tokenA.methods.transfer(memberData.address, bntokens).send({ from: account }, function (err, res) {
        if (err) {
          console.log("An error occured", err)
          return;
        }
        memberData.paid = true;
        var basicWalletData = [];
        for (let i = 0; i < walletData.length; i++) {
          if (walletData[i].id !== memberData.id) {
            basicWalletData.push(walletData[i])
          } else {
            basicWalletData.push(memberData)
          }
        }
        setWalletData(basicWalletData)
        editMember(memberData)
        toast(`${memberData.price} ${mainAsset.name} Sent to ${memberData.address}`)
      })
    } else {
      toast(`You don't have enough balance of ${mainAsset.name}`)
    }
  }

  const onDeletehandle = (rowId) => {
    setRowId(rowId)
    setCOpen(true)
  }

  const deleteMember = () => {
    database.collection(account).doc(rowId).delete().then(() => {
      toast("Document successfully deleted!")
      setWalletData(walletData.filter(item => item.id !== rowId))
      setCOpen(false)
    }).catch((error) => {
      toast("Error removing document: ", error)
      setCOpen(false)
    })
  }

  const cHandleClose = () => {
    setRowId(null)
    setCOpen(false)
  }

  const sHandleClose = () => {
    setStaffOpen(false)
  }

  const getMembers = async () => {
    if (account) {
      database.collection(account).get().then(querySnapshot => {
        var arr = []
        querySnapshot.docs.forEach((doc) => {
          var docData = doc.data()
          if (walletData.findIndex(item => item.address === docData.address) === -1) {
            docData.id = doc.id;
            arr.push(docData)
          }
        })
        setWalletData(arr)
      })
    }
  }

  const ContractCheck = async () => {
    var ftmBalance = await web3.eth.getBalance(account)
    if (ftmBalance < FTMGAS) {
      setEnoughGas(false)
    } else {
      setEnoughGas(true)
    }
  }

  const getBonds = async () => {

    var dt1 = await rebateStats.RebateTreasury.methods.totalVested().call()
    var dt2 = await rebateStats.RebateTreasury.methods.getBondPremium().call()
    var dt3 = await rebateStats.RebateTreasury.methods.bondVesting().call()

    console.log(dt1)
    console.log(dt2)
    console.log(dt3)

    // web3.utils.fromWei(claimable)
  }

  useEffect(() => {
    if (account) {
      getMembers()
      ContractCheck()
      getBonds()
    }
  }, [account])

  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <BackgroundImage />
          <Container maxWidth="lg">
            <ConfirmDialog cOpen={cOpen} cHandleClose={cHandleClose} deleteMember={deleteMember} rowId={rowId} />
            <StaffDialog
              type={type}
              staff={staff}
              staffOpen={staffOpen}
              sHandleClose={sHandleClose}
              memberData={memberData}
              addMember={addMember}
              editMember={editMember}
            />
            <Typography color="textPrimary" align="center" variant="h2" gutterBottom>
              Easy payments
            </Typography>
            <Box mt={5}>
              <Grid>
                <Typography color="textPrimary" variant="h4" gutterBottom>
                  Payout to 2omb/3omb Staff
                </Typography>
                {
                  enoughGas ? (
                    <Grid className={classes.root}>
                      <CssBaseline />
                      <Paper className={classes.content}>
                        <Grid className={classes.toolbar}>
                          <Typography variant="h6" component="h2" color="primary">
                            Staff
                          </Typography>
                          <Button
                            variant="contained"
                            color="primary"
                            startIcon={<PersonAddIcon />}
                            onClick={() => {
                              setMemberData({})
                              setType("add")
                              setStaffOpen(true)
                            }}
                          >
                            New Staff
                          </Button>
                        </Grid>
                        <StyledDataGrid
                          style={{ height: 400 }}
                          pageSize={5}
                          rowsPerPageOptions={[5]}
                          components={{
                            Pagination: CustomPagination,
                          }}
                          columnVisibilityModel={{
                            id: false,
                          }}
                          rows={walletData}
                          columns={fields}
                        />
                      </Paper>
                    </Grid>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        window.open(`https://spookyswap.finance/swap`, '_blank')
                      }}
                    >
                      You don't have enough FTM to transfer tokens, Please Swap Tokens
                    </Button>
                  )
                }
              </Grid>
            </Box>
          </Container>
        </Route>
      </Page>
    </Switch>
  )
}