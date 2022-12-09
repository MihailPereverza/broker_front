import BrokerList from "../elements/brokerList/BrokerList";
import {Button, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import DateFnsUtils from '@date-io/date-fns';
import axios from "axios";
import {MuiPickersUtilsProvider, TimePicker} from "material-ui-pickers";
import {io} from "socket.io-client";
import MarketChart from "../elements/marketChart/marketChart";
import ShowDate from "../elements/showDate/showDate";


const socket = io('http://localhost:3000');


function MarketSettingsPage() {
    const [settings, setSettings] = useState()
    const [labels, setLabels] = useState()


    function updateStartTrading(e) {
        if (e.target.value === settings['start_trading']) return
        axios.post('http://localhost:3000/market_settings/update/start-trading', {
            startTrading: e.target.value
        }).then(() => {})
    }
    function updateStopTrading(e) {
        if (e.target.value === settings['stop_trading']) return
        axios.post('http://localhost:3000/market_settings/update/stop-trading', {
            stopTrading: e.target.value
        }).then(() => {})
    }
    function updateUpdateDelay(e) {
        if (e.target.value === settings['update_delay']) return
        axios.post('http://localhost:3000/market_settings/update/update-delay', {
            updateDelay: e.target.value
        }).then(() => {})
    }

    useEffect(() => {
        axios.get('http://localhost:3000/market_settings')
            .then(r => {
                const data = r.data
                console.log(data)
                setSettings(data)
            })
    }, [setSettings])
    useEffect(() => {
        axios.get('http://localhost:3000/market')
            .then(r => {
                setLabels(r.data)
            })
    }, [setLabels])

    if (!settings) return
    if (!labels) return
    console.log(labels)

    const joinToRooms = () => {
        for (let label of labels) {
            if (!label.status) continue
            socket.emit('join', {room: label.label})
        }
    }
    return (
        <div style={{margin: 'auto'}}>
            <p style={{'paddingLeft': '10px', 'margin': '0 0 5px 0'}}>Введите дату начала торгов</p>
            <TextField onBlur={updateStartTrading} placeholder='Дату начала торгов' name='start-trading' defaultValue={settings['start_trading']} sx={{'padding': '0px 0 10px 10px'}}/>
            <br/>
            {/*<p style={{'paddingLeft': '10px', 'margin': '0 0 5px 0'}}>Введите время окончания торгов</p>*/}
            {/*<TextField onBlur={updateStopTrading} placeholder='Время окончания торгов' name='stop-trading' defaultValue={settings['stop_trading']} sx={{'padding': '0px 0 10px 10px'}}/>*/}
            {/*<br/>*/}
            <p style={{'paddingLeft': '10px', 'margin': '0 0 5px 0'}}>Введите задержку обновления графика</p>
            <TextField onBlur={updateUpdateDelay} placeholder='Задержка обновления графика' name='update-delay' defaultValue={settings['update_delay']} sx={{'padding': '0px 0 10px 10px'}}/>
            <br/>
            <Button sx={{'margin': '0 0 0 50px'}} onClick={joinToRooms}>Начать торги</Button>
            <ShowDate socket={socket}/>
            {labels.map((label, pos) => (
                label.status && <MarketChart key={pos} socket={socket} label={label.label} name={label.name}/>

            ))}
        </div>
    );
}

export default MarketSettingsPage;