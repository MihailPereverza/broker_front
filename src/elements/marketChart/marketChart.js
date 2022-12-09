import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {Socket} from "socket.io-client";
import {useState} from "react";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


function MarketChart({label, socket, name}) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: name,
            },
        },
    };
    const [chartData, setChartData] = useState([])
    const [chartLabels, setChartLabels] = useState([])
    const [lineData, setLineData] = useState({})
    socket.on(label, (data) => {
        console.log(data)
        console.log(data.date)
        setChartLabels([...chartLabels, data.date])
        setChartData([...chartData, parseFloat(data.close.slice(1))])
        setLineData({
            labels: chartLabels,
            datasets: [
                {
                    label: label,
                    data: chartData,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ]
        })
    })
    if (Object.keys(lineData).length === 0) return
    return (
        <Line options={options} data={lineData}/>
    )
}


export default MarketChart;
