import { Dispatch, SetStateAction, ChangeEvent } from "react";
import _ from "lodash";
import { styled } from "@mui/material/styles";
import Slider, { SliderThumb } from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";

interface CustomSliderProps {
  min: number;
  max: number;
  step: number;
  value: number[] | number;
  setValue: Dispatch<SetStateAction<number[] | number>>;
}

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.primary.main,
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 3,
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 3,
  },
}));

interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {}

function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

function CustomSlider({ min, max, step, value, setValue }: CustomSliderProps) {
  return (
    <AirbnbSlider
      components={{ Thumb: AirbnbThumbComponent }}
      getAriaLabel={(index) =>
        index === 0 ? "Minimum price" : "Maximum price"
      }
      value={value}
      onChange={(_e, newValue) => {
        if (!_.isEqual(value, newValue)) {
          console.log(newValue);
          setValue(newValue);
        }
      }}
      // defaultValue={[0, 10]}

      valueLabelDisplay="auto"
      min={min}
      max={max}
      step={step}
    />
  );
}

export default CustomSlider;
