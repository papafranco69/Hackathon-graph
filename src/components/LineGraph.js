import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const LineGraph = ({ data, categories }) => {
  const options = {
    title: {
      text: 'Expected Trending Value',
    },
    yAxis: {
      tickAmount: 10,
      floor: -10,
      title: {
        text: 'Expected Value',
      },
    },
    xAxis: {
      plotLines: [
        {
          color: 'brown',
          dashStyle: 'dash',
          value: 25,
          width: 1,
        },
      ],
      title: {
        text: 'Time Period',
      },
      labels: {
        formatter: function () {
          return `T(${this.value / 5})`;
        },
      },
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },
    tooltip: {
      formatter: function () {
        return (
          '<b>' +
          categories[this.x] +
          '</b>' +
          ' - ' +
          this.points.reduce(function (s, point) {
            return s + '<br/>' + point.series.name + ': ' + point.y;
          }, '<b>' + this.x + '</b>')
        );
      },
      shared: true,
    },

    series: data,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineGraph;
