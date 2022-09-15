import { forwardRef, Dispatch, SetStateAction } from "react";
import NumberFormat from "react-number-format";
import TextField from "@mui/material/TextField";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

interface FormattedNumberInputProps {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  max: number;
  min: number;
}

export default function CustomNumberInput({
  value,
  setValue,
  max,
  min,
}: FormattedNumberInputProps) {
  const NumberFormatCustom = forwardRef<NumberFormat<number>, CustomProps>(
    function NumberFormatCustom(props, ref) {
      const { onChange, ...other } = props;

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
          isNumericString
          allowNegative={false}
          isAllowed={({ value }) =>
            Number(value) <= max && Number(value) >= min
          }
          style={{
            textAlign: "center",
          }}
        />
      );
    },
  );

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
      }}
      variant="outlined"
      sx={{ width: 80 }}
    />
  );
}
