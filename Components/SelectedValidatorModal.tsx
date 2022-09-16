import _ from "lodash";
import {
  Divider,
  Grid,
  Paper,
  Typography,
  Avatar,
  Chip,
  Container,
} from "@mui/material";
import { IValidator } from "../@types";
import TotalScoresGraph from "./TotalScoresGraph";
import CommissionsChart from "./CommissionsChart";
import VotePerformanceChart from "./VotePeformancesChart";

interface SelectedValidatorModalProps {
  validator: IValidator;
}

function SelectedValidatorModal({ validator }: SelectedValidatorModalProps) {
  let delinquent;
  if (_.isBoolean(validator.delinquent)) {
    delinquent = validator.delinquent ? "Yes" : "No";
  } else {
    delinquent = "Not Provided";
  }

  let website;
  if (_.isString(validator.www_url)) {
    website = validator.www_url;
  } else {
    website = "Not Provided";
  }

  let apy;
  if (_.isNumber(validator.apy)) {
    apy = `${(validator.apy * 100).toFixed(2)}%`;
  } else {
    apy = "Not Provided";
  }

  let activeStake;
  if (_.isNumber(validator.active_stake)) {
    activeStake = `${(validator.active_stake! / 1000000000).toFixed(2)} SOL`;
  } else {
    activeStake = "Not Provided";
  }

  let commission;
  if (_.isNumber(validator.commission)) {
    commission = `${validator.commission}%`;
  } else {
    commission = "Not Provided";
  }

  let asn;
  if (_.isNumber(validator.autonomous_system_number)) {
    asn = validator.autonomous_system_number;
  } else {
    asn = "Not Provided";
  }

  let softwareVersion;
  if (_.isString(validator.software_version)) {
    softwareVersion = validator.software_version;
  } else {
    softwareVersion = "Not Provided";
  }

  // scores chart data
  const scoresChartData = [
    // [0] root distance score
    {
      criteria: "Root Distance",
      score: 0,
    },
    // [1] vote distance score
    {
      criteria: "Vote Distance",
      score: 0,
    },
    // [2] skipped slot score
    {
      criteria: "Skipped Slot",
      score: 0,
    },

    // [3] software version score
    {
      criteria: "Software Version",
      score: 0,
    },
    // [4] published information score
    {
      criteria: "Published Information",
      score: 0,
    },
    // [5] security report score
    {
      criteria: "Security Report",
      score: 0,
    },
    // [6] data center concentration score
    {
      criteria: "DataCenter Concentration",
      score: 0,
    },
    // [7] stake concentration score
    {
      criteria: "Stake Concentration",
      score: 0,
    },
    // [8] authorized withdrawer score
    {
      criteria: "Authorized Withdrawer",
      score: 0,
    },
  ];

  if (_.isNumber(validator.root_distance_score)) {
    scoresChartData[0].score = validator.root_distance_score;
  }
  if (_.isNumber(validator.vote_distance_score)) {
    scoresChartData[1].score = validator.vote_distance_score;
  }
  if (_.isNumber(validator.skipped_slot_score)) {
    scoresChartData[2].score = validator.skipped_slot_score;
  }
  if (_.isNumber(validator.software_version_score)) {
    scoresChartData[3].score = validator.software_version_score;
  }
  if (_.isNumber(validator.published_information_score)) {
    scoresChartData[4].score = validator.published_information_score;
  }
  if (_.isNumber(validator.security_report_score)) {
    if (validator.security_report_score === 1) {
      scoresChartData[5].score = 2;
    } else {
      scoresChartData[5].score = 0;
    }
  }
  if (_.isNumber(validator.data_center_concentration_score)) {
    if (validator.data_center_concentration_score === -2) {
      scoresChartData[6].score = 0;
    } else if (validator.data_center_concentration_score === -1) {
      scoresChartData[6].score = 1;
    } else {
      scoresChartData[6].score = 2;
    }
  }
  if (_.isNumber(validator.stake_concentration_score)) {
    if (validator.stake_concentration_score === -2) {
      scoresChartData[7].score = 0;
    } else {
      scoresChartData[7].score = 2;
    }
  }
  if (_.isNumber(validator.authorized_withdrawer_score)) {
    if (validator.authorized_withdrawer_score === -2) {
      scoresChartData[8].score = 0;
    } else {
      scoresChartData[8].score = 2;
    }
  }

  return (
    <Paper
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        overflow: "auto",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        width: "95%",
        height: "85vh",
        maxWidth: 600,
        maxHeight: 700,
        p: "1rem 0",
      }}
    >
      <Container maxWidth="md">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={2}>
            <Avatar
              alt="validator_avatar"
              src={validator.avatar_url!}
              sx={{ width: 50, height: 50 }}
            />
          </Grid>
          <Grid container item xs={10}>
            <Grid item xs>
              <Typography textAlign="center">{validator.name}</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs>
          <Divider />
        </Grid>

        <Grid
          container
          item
          xs
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Chip size="medium" label="Public Key" variant="filled" />
          </Grid>
          <Grid item zeroMinWidth>
            <Typography noWrap>{validator.account}</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Chip size="medium" label="Website" variant="filled" />
          </Grid>
          <Grid item>
            <Typography>{website}</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Grid
            container
            item
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sm={6}
            spacing={1}
          >
            <Grid item xs={6}>
              <Chip size="medium" label="APY" variant="filled" />
            </Grid>
            <Grid item xs={6}>
              <Typography>{apy}</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sm={6}
            spacing={1}
          >
            <Grid item xs={6}>
              <Chip size="medium" label="Active Stake" variant="filled" />
            </Grid>
            <Grid item xs={6}>
              <Typography>{activeStake}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Grid
            container
            item
            sm={6}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={6}>
              <Chip size="medium" label="Commission" variant="filled" />
            </Grid>
            <Grid item xs={6}>
              <Typography>{commission}</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            sm={6}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={6}>
              <Chip size="medium" label="ASN" variant="filled" />
            </Grid>
            <Grid item xs={6}>
              <Typography>{asn}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Grid
            container
            item
            sm={6}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={6}>
              <Chip size="medium" label="Delinquent" variant="filled" />
            </Grid>
            <Grid item xs={6}>
              <Typography>{delinquent}</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            sm={6}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={6}>
              <Chip size="medium" label="Software Version" variant="filled" />
            </Grid>
            <Grid item xs={6}>
              <Typography>{softwareVersion}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Divider />
        </Grid>
        <Grid item xs>
          <Typography textAlign="center">
            Total Score: {validator.total_score}
          </Typography>
        </Grid>
        <Grid item xs>
          <Paper
            sx={{
              height: "20rem",
              bgcolor: "grey.50",
              boxSizing: "border-box",
            }}
          >
            <TotalScoresGraph chartData={scoresChartData} />
          </Paper>
        </Grid>
        <Grid item xs>
          <Divider />
        </Grid>

        <Grid item xs>
          <Paper
            sx={{
              height: "20rem",
              bgcolor: "grey.50",
              boxSizing: "border-box",
            }}
          >
            <CommissionsChart chartData={validator.commissions} />
          </Paper>
        </Grid>
        <Grid item xs>
          <Divider />
        </Grid>
        <Grid item xs>
          <Paper
            sx={{
              height: "20rem",
              bgcolor: "grey.50",
              boxSizing: "border-box",
            }}
          >
            <VotePerformanceChart chartData={validator.vote_performances} />
          </Paper>
        </Grid>
        <Grid item xs>
          <Divider />
        </Grid>

        {/* <Grid
                container
                item
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Chip
                    size="medium"
                    label="Validators.app profile"
                    variant="filled"
                  />
                </Grid>
                <Grid item>
                  <Typography>{validator.url}</Typography>
                </Grid>
              </Grid> */}
      </Container>
    </Paper>
  );
}

export default SelectedValidatorModal;
