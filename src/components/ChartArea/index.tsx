import React from 'react';

import moment from 'moment';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';

import nodata from '../../nodata.png';
import './styles.css';
import { DataState } from '../../types';

const App: React.FC<{ data: DataState[] }> = ({ data }) => {
  const formatDate = (dateText: string) => {
    return moment(dateText, 'DD.MM.YYYY').format('DD.MMM');
  };

  return (
    <div className="chart">
      <h1>Clicks & Impressions</h1>
      {data && data.length ? (
        <LineChart
          width={900}
          height={400}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="date"
            domain={['dataMin', 'dataMax']}
            tickFormatter={formatDate}
          />
          <YAxis
            label={{ value: 'clicks', angle: -90, position: 'left' }}
            allowDataOverflow={true}
            yAxisId="1"
          />
          <YAxis
            label={{ value: 'impressions', angle: -90, position: 'right' }}
            orientation="right"
            allowDataOverflow={true}
            type="number"
            yAxisId="2"
            tickFormatter={data => `${data / 1000}k`}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Legend />
          <Line
            yAxisId="1"
            type="monotone"
            dataKey="clicks"
            stroke="#599964"
            dot={false}
          />
          <Line
            yAxisId="2"
            type="monotone"
            dataKey="impressions"
            stroke="#926FD1"
            dot={false}
          />
        </LineChart>
      ) : (
        <div className="nodata">
          <img src={nodata} alt="no data" />
          <h3>No data matched your criteria</h3>
        </div>
      )}
    </div>
  );
};

export default App;
