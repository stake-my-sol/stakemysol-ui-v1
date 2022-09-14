import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { ScoreChartLabel } from "../@types/types";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

interface TotalScoresGraphProps {
  chartData: ScoreChartLabel[];
  // read layout paddings for different mediaQueries
}

function TotalScoresGraph({ chartData }: TotalScoresGraphProps) {
  const labels: string[] = [];
  const scores: number[] = [];
  chartData.forEach((entry: ScoreChartLabel) => {
    labels.push(entry.criteria);
    scores.push(entry.score);
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Scores",
        data: scores,
        fill: true,
        backgroundColor: "rgba(25, 118, 210, 0.2)",
        borderColor: "rgba(25, 118, 210, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    scales: {
      r: {
        min: 0,
        max: 2,
        ticks: {
          display: false,
          count: 3,
          stepSize: 1,
        },
      },
    },
    ticks: {
      display: false,
      padding: 100,
    },
    elements: {
      line: {
        borderWidth: 3,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      decimation: {
        enabled: false,
      },
    },
  };

  return <Radar options={options} data={data} width="100%" height="20rem" />;
}

export default TotalScoresGraph;
