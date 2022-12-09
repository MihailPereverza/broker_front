
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button, TextField} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {useEffect, useState} from "react";

function MarketList() {
    const [labels, setLabels] = useState()
    useEffect(() => {
        axios.get('http://localhost:3000/market/objects')
            .then(r => {
                setLabels(r.data)
            })
    }, [setLabels])
    if (!labels) return

    const generateSwapCallback = (label) => {
        return (e) => {
            labels[label]['status'] = !labels[label]['status']
            e.target.innerHTML = labels[label]['status'] ? 'Убрать': 'Использовать'
            axios.get(`http://localhost:3000/market/swap/${label}`).then(() => {})
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650}} aria-label="table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Компания</TableCell>
                        <TableCell align="center">label</TableCell>
                        <TableCell align="center">Участвует</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.values(labels).map((row) => (
                        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.label}</TableCell>
                            <TableCell align="center"><Button onClick={generateSwapCallback(row.label)} variant="text">{row.status ? 'Убрать': 'Использовать'}</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}


export default MarketList