import {
  forwardRef,
  Dispatch,
  SetStateAction,
  useImperativeHandle,
  ForwardRefExoticComponent,
} from "react";
import NumberFormat, { InputAttributes } from "react-number-format";
import TextField from "@mui/material/TextField";
import _ from "lodash";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  min: number;
  max: number;
  decimalScale: number;
}

interface FormattedNumberInputProps {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  max: number;
  min: number;
  decimalScale: number;
}

const NumberFormatCustom = forwardRef<
  NumberFormat<InputAttributes>,
  CustomProps
>(function NumberFormatCustom(props, ref) {
  const { onChange, min, max, decimalScale, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values: any) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      decimalScale={decimalScale}
      isNumericString
      allowNegative={false}
      isAllowed={({ value }) => Number(value) <= max && Number(value) >= min}
      style={{
        textAlign: "center",
      }}
    />
  );
});

export default function CustomNumberInput({
  value,
  setValue,
  max,
  min,
  decimalScale,
}: FormattedNumberInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  return (
    <TextField
      value={value}
      onChange={handleChange}
      name="numberformat"
      id="formatted-numberformat-input"
      InputProps={{
        inputComponent: NumberFormatCustom as any,
        inputProps: {
          min,
          max,
          decimalScale,
        },
      }}
      variant="outlined"
      sx={{
        width: 80,
        "& .MuiInputBase-input": {
          py: 1,
          borderRadius: "5px",
          border: "1px solid black",
        },
      }}
    />
  );
}
