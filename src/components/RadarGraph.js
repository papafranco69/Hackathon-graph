import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { drawChart } from '../helpers/drawChart';
import '../css/graph.css';

const RadarGraph = ({ chartOptions, data }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const svg = d3.select(containerRef.current);
      drawChart(svg, data, chartOptions);
    }
  }, [containerRef, data]);

  return (
    <>
      <svg ref={containerRef} className="radarChart container"></svg>
    </>
  );
};

export default RadarGraph;
