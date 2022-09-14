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

import { Commission } from "../@types/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface CommissionChartProps {
  chartData: Commission[] | null;
}

function CommissionsChart({ chartData }: CommissionChartProps) {
  const epochs: number[] = [];
  const commissions: number[] = [];

  if (_.isEmpty(chartData)) {
    // do sth
  } else {
    chartData!.slice(-13).forEach((entry) => {
      if (!_.isNil(entry.epoch)) {
        epochs.push(entry.epoch);
      }

      if (!_.isNil(entry.commission)) {
        commissions.push(entry.commission);
      }
    });
  }

  const data = {
    labels: epochs,
    datasets: [
      {
        label: "Commission",
        data: commissions,
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
        text: "Commission History",
      },
    },
  };

  return <Bar options={options} data={data} width="100%" height="20rem" />;
}

export default CommissionsChart;
