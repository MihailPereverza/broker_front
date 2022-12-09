import {Button, FormControl, FormGroup, Input, InputLabel, TextField} from "@mui/material";
import {makeStyles} from '@mui/styles'
// import
import React, {useState} from "react";
import axios from "axios";


const useStyle = makeStyles({
    formStyle: {
        width: "50%",
        margin: 'auto'
    }
})


function sendForm(inputs) {
    const newInputs = {
        ...inputs,
        balance: parseFloat(inputs.balance)
    }
    console.log(newInputs)
    axios.post(`http://localhost:3000/brokers`, newInputs).then(() => {})
}


function CreateBrokerModal() {
    const classes = useStyle()
    const [inputs, setInputs] = useState({
        name: "",
        balance: "",
    })
    const handleChange = (e) => {
        console.log(e.target.name, e.target.value)
        if (e.target.name === 'balance' && !e.target.value.match(/^([0-9]{0,})(\.){0,1}([0-9]{0,})?$/)) {
            return
        }
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        sendForm(inputs)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FormGroup className={classes.formStyle}>
                    <FormControl>
                    <TextField
                        name='name'
                        value={inputs.name}
                        onChange={handleChange}
                        placeholder='enter name'
                        type='text'
                        variant='outlined'
                        sx={{margin: "20px"}}
                    />
                    </FormControl>
                    <br/>
                    <FormControl>
                        <TextField
                            name='balance'
                            value={inputs.balance}
                            onChange={handleChange}
                            placeholder='enter balance'
                            variant='outlined'
                            sx={{margin: "20px"}}
                        />
                    </FormControl>
                    <Button type="submit" variant='contained' color='secondary'>Send</Button>
                </FormGroup>
            </form>
        </div>
    )
}

export default CreateBrokerModal;