import { Typography } from "@mui/material";

interface TrunkedTypographyProps {
  length?: number;
  children: string;
}

// *: setting a width for container of Typography
// *: plus "noWrap" props can produce same result
// *: this implementation is for the case in which, width is not
// *: fixed but is in a "%" format
function TrunkedTypography({ children, length = 10 }: TrunkedTypographyProps) {
  const result =
    children.length > length ? `${children.slice(0, length)}...` : children;
  return <Typography>{result}</Typography>;
}

TrunkedTypography.defaultProps = {
  length: 10,
};

export default TrunkedTypography;
