import React, { useState, useEffect } from 'react';

import './styles.css';
import { RawDataState, DataState } from '../../types';
import { fetchAndParseCsv, filterData } from '../../helpers';

import loader from '../../loader.gif';
import Filters from '../Filters';
import ChartArea from '../ChartArea';

const App: React.FC = () => {
  const DATA_URL: string =
    'http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv';
  const [isLoading, setLoading] = useState<boolean>(false);
  const [rawData, setRawData] = useState<RawDataState[]>([]);
  const [data, setData] = useState<DataState[]>([]);

  useEffect(() => {
    setLoading(true);
    fetchRawData();
  }, []);

  useEffect(() => {
    if (rawData && rawData.length) {
      const filteredData = filterData(rawData);
      setData(filteredData);
      setLoading(false);
    }
  }, [rawData]);

  const fetchRawData = async () => {
    const data = await fetchAndParseCsv(DATA_URL);
    setRawData(data);
  };

  const onFiltersChange = (text: any) => {
    console.log('change filters!', text);
  };

  return (
    <div className="box">
      {isLoading ? (
        <div className="loading">
          <h1>Loading data...</h1> <img src={loader} alt="loading..." />
        </div>
      ) : (
        <>
          <Filters applyFilters={onFiltersChange} />
          <ChartArea data={data} />
        </>
      )}
    </div>
  );
};

export default App;
