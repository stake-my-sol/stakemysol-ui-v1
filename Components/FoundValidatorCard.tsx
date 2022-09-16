import { useState } from "react";
import _ from "lodash";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Grid,
  Collapse,
  CardActions,
  IconButton,
  IconButtonProps,
} from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { IValidator } from "../@types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/future/image";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface FoundValidatorCardProps {
  validator: IValidator;
}
export default function FoundValidatorCard({
  validator,
}: FoundValidatorCardProps) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ bgcolor: blue[300] }}>
      <CardHeader
        avatar={
          <Avatar
            // src={_.isNil(validator.avatar_url) ? "" : validator.avatar_url}
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
          >
            <Image
              alt="validator logo"
              src={_.isNil(validator.avatar_url) ? "" : validator.avatar_url}
              fill
            />
          </Avatar>
        }
        title={validator.name ? validator.name : "Name not Provided"}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>
              APY:{" "}
              {_.isNil(validator.apy)
                ? "Not Provided"
                : (validator.apy * 100).toPrecision(2)}
              %
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Commission:{" "}
              {_.isNil(validator.commission)
                ? "Not Provided"
                : validator.commission}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>
            {_.isNil(validator.details)
              ? "Description Not Provided"
              : validator.details}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
