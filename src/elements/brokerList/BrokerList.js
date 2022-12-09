import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import {useState, useEffect} from "react";
import {Button, TextField} from "@mui/material";


function deleteBroker(brokerId, tableData, setTableData) {
    axios.get(`http://localhost:3000/brokers/delete/${brokerId}`).then(() => {})
    let data = tableData.filter(broker => broker.id !== brokerId)
    setTableData(data)
}


function sendNewBalance(brokerId, balance) {
    axios.post(`http://localhost:3000/brokers/set/balance/${brokerId}`, {
        balance: balance
    }).then(() => {})
}


    function BrokerList() {
    const [tableData, setTableData] = useState();
    const generateDeleteCallback = (brokerId) => {
        return () => {
            deleteBroker(brokerId, tableData, setTableData)
        }
    }
    const generateBlurCallback = (brokerId) => {
        return (e) => {
            console.log(e.target.value)
            const row = tableData.filter((broker) => broker.id === brokerId)[0]
            if (e.target.value !== row.balance && e.target.value.match(/^([0-9]{0,})(\.){0,1}([0-9]{0,})?$/)) {
                const newTableData = tableData.map(broker => {
                    if (broker.id !== brokerId) return broker
                    broker.balance = e.target.value
                    return broker
                })
                setTableData(newTableData)

                const balance = parseFloat(e.target.value)
                sendNewBalance(brokerId, balance)
            } else {
                e.target.value = row.balance
            }
        }
    }

    useEffect(() => {
        axios.get('http://localhost:3000/brokers')
            .then(r => {
                const data = r.data
                console.log(data)
                setTableData(data)
            })

    }, [setTableData])
    if (!tableData) return

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650}} aria-label="table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Имя</TableCell>
                        <TableCell align="center">Баланс</TableCell>
                        <TableCell align="center">Удалить</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row) => (
                        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="center">{row.id}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center"><TextField name='balance' defaultValue={row.balance} onBlur={generateBlurCallback(row.id)}/></TableCell>
                            <TableCell align="center"><Button onClick={generateDeleteCallback(row.id)} variant="text">Удалить</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default BrokerList;