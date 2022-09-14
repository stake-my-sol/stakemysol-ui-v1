import { Dispatch, SetStateAction, ChangeEvent } from "react";
import _ from "lodash";
import { styled } from "@mui/material/styles";
import Slider, { SliderThumb, SliderProps } from "@mui/material/Slider";

interface CustomSliderProps extends SliderProps {
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

function CustomSlider({ value, setValue, ...other }: CustomSliderProps) {
  return (
    <AirbnbSlider
      components={{ Thumb: AirbnbThumbComponent }}
      getAriaLabel={(index) =>
        index === 0 ? "Minimum price" : "Maximum price"
      }
      onChange={(_e, newValue) => {
        if (!_.isEqual(value, newValue)) {
          setValue(newValue);
        }
      }}
      valueLabelDisplay="auto"
      value={value}
      {...other}
    />
  );
}

export default CustomSlider;
