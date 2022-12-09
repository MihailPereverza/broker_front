import {useState} from "react";


function ShowDate({socket}) {
    const [currentDate, setCurrentDate] = useState()

    socket.on('new_date', (data)=> {
        console.log(data)
        setCurrentDate(data)
    })

    if (!currentDate) return
    console.log('adfsd')
    console.log(currentDate)
    return (
        <p>Текущая дата торгов: {currentDate}</p>
    )
}


export default ShowDate