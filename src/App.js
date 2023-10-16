import { Button, Paper } from "@mui/material";
import { Bill } from "./components/Bill";
import React from 'react';

let id = 1;

function App() {
  const [array, setArray] = React.useState([
    {id: 1, filled: false, data: {
      amount: "0.00",
      account: "",
      date: null,
      payee: "",
      repeat: "",
      note: "",
    }}
  ]);
  const [disabled, setDisabled] = React.useState(true)
  

  React.useEffect(() => {
    console.log(array)
    if(array.map(obj => obj.filled).every(value => value === true)) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [array])

  const handleAdd = () => {
    setArray([...array, {id: ++id, filled: false, data: {
      amount: "0.00",
      account: "",
      date: null,
      payee: "",
      repeat: "",
      note: "",
    }}])
  }

  return (
    <Paper sx={{ display: "flex", alignItems: "center", flexDirection: "column"}}>
      {
        array.map(bill => <Bill key={bill.id} id={bill.id} array={array} setArray={setArray}/>)
      }
      <Button onClick={handleAdd} disabled={disabled}>Add bill</Button>
    </Paper>
  );
}

export default App;
