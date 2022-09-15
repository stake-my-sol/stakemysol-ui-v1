import _ from "lodash";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { VotePerformance } from "../@types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface CommissionChartProps {
  chartData: VotePerformance[] | null;
}

function VotePerformanceChart({ chartData }: CommissionChartProps) {
  const epochs: number[] = [];
  const votePerformances: number[] = [];

  if (_.isEmpty(chartData)) {
    // do sth
  } else {
    chartData!.slice(-13).forEach((entry) => {
      if (!_.isNil(entry.epoch)) {
        epochs.push(entry.epoch);
      } else {
        return;
      }

      if (!_.isNil(entry.performance)) {
        votePerformances.push(Number((entry.performance * 100).toFixed(1)));
      } else {
        votePerformances.push(0);
      }
    });
  }

  const data = {
    labels: epochs,
    datasets: [
      {
        label: "Vote Performance",
        data: votePerformances,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },

      // decimation: {
      //   enabled: false,
      // },
      title: {
        display: true,
        text: "Vote Performance History",
      },
    },
  };

  return <Bar options={options} data={data} width="100%" height="20rem" />;
}

export default VotePerformanceChart;
