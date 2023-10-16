import { 
  Box, Grid, InputAdornment, InputLabel, 
  Select, FormControl, MenuItem, FormHelperText, 
  TextField, Button } 
  from "@mui/material";
import React from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { AmountInput } from "./AmountInput";


export function Bill({id, setArray, array}) {
  const [accountId, setAccountId] = React.useState("");
  const [accountAmount, setAccountAmount] = React.useState("");
  const [payee, setPayee] = React.useState("");
  const [date, setDate] = React.useState(null);
  const [repeat, setRepeat] = React.useState("");
  const [note, setNote] = React.useState("");
  const [amount, setAmount] = React.useState("0.00");
  const [errors, setErrors] = React.useState({
    amount: false,
    account: false,
    payee: false,
    repeat: false,
    note: false,
  })

  React.useEffect(() => {
    if(accountId && payee && date && repeat && note && amount) {
      const newArray = array.map(obj => {
        if (obj.id === id) {
          return { ...obj, filled: true, data: {
            amount: amount,
            account: accountId,
            date: date,
            payee: payee,
            repeat: repeat,
            note: note,
          } };
        }
        return obj;
      })
      setArray(newArray)
    } else {
      const newArray = array.map(obj => {
        if (obj.id === id) {
          return { ...obj, filled: false, data: {
            amount: "0.00",
            account: "",
            date: null,
            payee: "",
            repeat: "",
            note: "",
          } };
        }
        return obj;
      })
      setArray(newArray)
    }
  }, [accountId, payee, date, repeat, note, amount])
  
 
  const accounts = [
    {id: 1, name: "First account", amount: 12000},
    {id: 2, name: "Second account", amount: 2000}
  ]

  const payees = [
    {id: 1, name: "First payye"},
    {id: 2, name: "Second payye"}
  ]

  const frequencies = [
    {id:1, value: "Every Month, Untill"},
    {id:2, value: "Every 2 Month, Untill"},
    {id:3, value: "Every 3 Month, Untill"}
  ]

  const handleChangeAccountId = (event) => {
    setAccountId(event.target.value);
    setAccountAmount(accounts.find(acc => acc.id === event.target.value).amount)
  };

  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleDelete = () => {
    const indexToDelete = array.findIndex(item => item.id === id);
    if(indexToDelete !== -1) {
      const newArray = [...array];
      newArray.splice(indexToDelete, 1);
      setArray(newArray)
    }
  }


  return <LocalizationProvider dateAdapter={AdapterDayjs} >
    <Box sx={{ 
      display: "flex", flexDirection: "column", 
      alignItems: "center", backgroundColor: "#e3f2fd", 
      width: "1100px", borderRadius: "", p:2, mb: 5
    }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <InputLabel sx={{ color: "#9e9e9e", mx: "auto" }}>Amount</InputLabel>
        <Button onClick={handleDelete}>Delete</Button>
      </Box>
      
      <FormControl>
        <AmountInput 
          value={amount} 
          onChange={handleChangeAmount} 
          onBlur={() => !amount ? setErrors({...errors, amount: true}) : null}
        />
        <FormHelperText sx={{ color: "red", pb: 5}}>{errors.amount ? "Set an amount" : ""}</FormHelperText >
      </FormControl>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>From account</InputLabel>
            <Select
              error={errors.account}
              value={accountId}
              label="From account"
              onChange={handleChangeAccountId}
              onBlur={() => !accountId ? setErrors({...errors, account: true}) : null}
              endAdornment={
                <InputAdornment position="end" sx={{ pr: "15px" }}>
                  ${accountAmount}
                </InputAdornment>
              }
            >
              {accounts.map(acc => 
                <MenuItem key={acc.id} value={acc.id}>{acc.name}</MenuItem>
              )}
            </Select>
            <FormHelperText sx={{ color: "red"}}>{errors.account ? "Select account" : ""}</FormHelperText >
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Payee</InputLabel>
            <Select
              error={errors.payee}
              value={payee}
              label="Payee"
              onChange={e => setPayee(e.target.value)}
              onBlur={() => !payee ? setErrors({...errors, payee: true}) : null}
            >
              {payees.map(acc => 
                <MenuItem key={acc.id} value={acc.id}>{acc.name}</MenuItem>
              )}
            </Select>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormHelperText>Last payment.....</FormHelperText >
              <FormHelperText sx={{ color: "red"}}>{errors.payee ? "Select payee" : ""}</FormHelperText >
            </Box>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ pt: 1 }}>
        <Grid item xs={2}>
          <DatePicker format="ll" value={date} onChange={newValue => setDate(newValue)}/> 
        </Grid>
        <Grid item xs={5}>
          <FormControl fullWidth>
            <InputLabel>Repeat</InputLabel>
            <Select
              error={errors.repeat}
              value={repeat}
              label="Repeat"
              onChange={e => setRepeat(e.target.value)}
              onBlur={() => !repeat ? setErrors({...errors, repeat: true}) : null}
            >
              {frequencies.map(freq => 
                <MenuItem key={freq.id} value={freq.value}>
                  {`${freq.value} ${dayjs(`${date}`).format("MMM DD, YYYY")}`}
                </MenuItem>
              )}
            </Select>
            <FormHelperText sx={{ color: "red"}}>{errors.repeat ? "Select payment frequency" : ""}</FormHelperText >
          </FormControl>
        </Grid>
        <Grid item xs={5}>
          <FormControl fullWidth>
            <TextField
              error={errors.note}
              fullWidth
              label="Note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              onBlur={() => !note ? setErrors({...errors, note: true}) : null}
              inputProps={{
                maxLength: 31
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: "flex-end" }}>
              <FormHelperText sx={{ textAlign: "right" }}>{note.length}/31</FormHelperText>
              <FormHelperText sx={{ color: "red"}}>{errors.note ? "Note required" : ""}</FormHelperText >
            </Box>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  </LocalizationProvider>
}