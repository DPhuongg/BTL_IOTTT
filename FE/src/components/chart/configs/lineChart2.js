import { convertUtcToVnTimeChart } from "../../../ulti";

export const series2 = (data) => [
  {
    name: "Gas",
    data: data.gass,
    offsetY: 0,
  },
];

export const options2 = (data) => {
  return {
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      curve: "smooth",
      width: [2, 2, 2],
    },
    colors: ['#A66DD4'],
    yaxis: [
      {
        title: {
          text: "Gas",
        },
        seriesName: "Gas",
        min: 0,
        max: 1000,
        tickAmount: 5,
      }
    ],

    xaxis: {
      categories: data.times.map(t => convertUtcToVnTimeChart(t))
    },

    tooltip: {
      y: [
        {
          formatter: function (val) {
            return val + "??";
          },
        },
      ],
    },
    animations: { enabled: true, easing: 'linear', dynamicAnimation: { speed: 1000 } }
  }
}