import { convertUtcToVnTime, convertUtcToVnTimeChart } from "../../../ulti";

export const series = (data) => [
  {
    name: "Nhiệt độ",
    data: data.temperatures,
    offsetY: 0,
  },
  {
    name: "Độ ẩm",
    data: data.humiditys,
    offsetY: 0,
  },
  {
    name: "Ánh sáng",
    data: data.lights,
    offsetY: 0,
  },
  // {
  //   name: "Gas",
  //   data: data.gass,
  //   offsetY: 0,
  // },
];

export const options = (data) => {
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

    yaxis: [
      {
        title: {
          text: "Nhiệt độ & Độ ẩm",
        },
        seriesName: "Nhiệt độ",
        min: 0,
        max: 100,
        tickAmount: 5,
      },
      {
        show: false,
        seriesName: "Độ ẩm",
        min: 0,
        max: 100,
        tickAmount: 5,
      },
      {
        opposite: true,
        title: {
          text: "Ánh sáng",
        },
        seriesName: "Ánh sáng",
        min: 0,
        max: 1024,
        tickAmount: 8,
      },
      // {
      //   show: false,
      //   title: {
      //     text: "Gas",
      //   },
      //   seriesName: "Gas",
      // },
    ],

    xaxis: {
      categories: data.times.map(t => convertUtcToVnTimeChart(t))
    },

    tooltip: {
      y: [
        {
          formatter: function (val) {
            return val + "°C";
          },
        },
        {
          formatter: function (val) {
            return val + "%";
          },
        },
        {
          formatter: function (val) {
            return val + " lux";
          },
        },
      ],
    },
    animations: { enabled: true, easing: 'linear', dynamicAnimation: { speed: 1000 } }
  }
}