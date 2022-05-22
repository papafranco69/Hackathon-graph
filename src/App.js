import LineGraph from './components/LineGraph';
import RadarGraph from './components/RadarGraph';
import LineGraphData from './assets/testData.json';
import RadarChartData from './assets/radarChartClients.json';
import { readClientInfo } from './helpers/loadData';
import * as d3 from 'd3';

const App = () => {
  // JSON Data
  const lineGraphData = LineGraphData;
  const radarChartData = readClientInfo(RadarChartData);

  // Line Graph Props
  const categories = Object.keys(lineGraphData[0]).filter((value) =>
    value.includes('V_t')
  );
  const seriesData = lineGraphData.slice(0, 3).map((value) => {
    let name = `Client${value.cust_id} `;
    let dataArray = [];
    for (let i = 3; i < Object.keys(value).length; i++) {
      dataArray.push(value[Object.keys(value)[i]]);
    }
    return { name: name, data: dataArray };
  });

  // Radio Chart Props
  const radarChartPropData = [
    {
      name: 'Product',
      axes: [
        { axis: 'Sec. Type', value: 2 },
        { axis: 'S&P Rating', value: 3 },
        { axis: 'R&I Rating', value: 2.3 },
        { axis: 'Moodys Rating', value: 2.6 },
        { axis: 'JCR Rating', value: 2 },
        { axis: 'Maturity', value: 4 },
        { axis: 'Industry', value: 3 },
      ],
    },
    ...radarChartData.slice(1, 3),
  ];

  const chartOptions = {
    w: 290,
    h: 350,
    margin: { top: 100, right: 100, bottom: 100, left: 100 },
    levels: 4,
    maxValue: 4,
    roundStrokes: true,
    format: '.1f',
    opacityArea: 0.1,
    labelFactor: 1.2,
    color: d3.scaleOrdinal(['#00FFFF', '#FF0000', '#6B8E23']),
    legend: {
      title: 'Product/Client Analysis',
      translateX: 120,
      translateY: 80,
    },
  };

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <div style={{ width: '50%' }}>
        <LineGraph data={seriesData} categories={categories} />
      </div>
      <div style={{ width: '50%' }}>
        <RadarGraph chartOptions={chartOptions} data={radarChartPropData} />
      </div>
    </div>
  );
};

export default App;
