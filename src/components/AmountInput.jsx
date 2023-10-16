import { NumericFormat } from 'react-number-format';
import { TextField } from '@mui/material';
import React from 'react';

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref,
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      color="#0277bd"
      thousandSeparator
      valueIsNumericString
      decimalScale={2}
      prefix="$"
      
    />
  );
});

export function AmountInput({value, onChange, onBlur}) {

  return         <>
    <TextField
      variant="standard"
      InputProps={{
        inputComponent: NumericFormatCustom,
        disableUnderline: true,
      }}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  </>
}