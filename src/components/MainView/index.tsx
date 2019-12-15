import React, { useState, useEffect } from 'react';

import './styles.css';
import { RawDataState, DataState } from '../../types';
import {
  fetchAndParseCsv,
  filterData,
  getDataSources,
  getCampaigns
} from '../../helpers';

import loader from '../../loader.gif';
import Filters from '../Filters';
import ChartArea from '../ChartArea';

const App: React.FC = () => {
  const DATA_URL: string =
    'http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv';
  const [isLoading, setLoading] = useState<boolean>(false);
  const [rawData, setRawData] = useState<RawDataState[]>([]);
  const [data, setData] = useState<DataState[]>([]);
  const [dataSources, setDataSources] = useState<string[]>([]);
  const [campaigns, setCampaigns] = useState<string[]>([]);
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    fetchRawData();
  }, []);

  useEffect(() => {
    if (rawData && rawData.length) {
      const filteredData = filterData(rawData);
      const dataSources = getDataSources(rawData);
      const campaigns = getCampaigns(rawData);

      setData(filteredData);
      setDataSources(dataSources);
      setCampaigns(campaigns);
      setLoading(false);
    }
  }, [rawData]);

  const fetchRawData = async () => {
    const data = await fetchAndParseCsv(DATA_URL);
    setRawData(data);
  };

  const handleCampaignsChange = (campaigns: string[]) => {
    setSelectedCampaigns(campaigns);
  };

  const handleDatasourceChange = (datasources: string[]) => {
    setSelectedDataSources(datasources);
  };

  const handleApplyFilters = () => {
    const filteredData = filterData(
      rawData,
      selectedDataSources,
      selectedCampaigns
    );
    setData(filteredData);
  };

  return (
    <div className="box">
      {isLoading ? (
        <div className="loading">
          <h1>Loading data...</h1> <img src={loader} alt="loading..." />
        </div>
      ) : (
        <>
          <Filters
            onCampaignsChange={handleCampaignsChange}
            onDatasourceChange={handleDatasourceChange}
            selectedCampaigns={selectedCampaigns}
            selectedDataSources={selectedDataSources}
            dataSources={dataSources}
            campaigns={campaigns}
            applyFilters={handleApplyFilters}
          />
          <ChartArea data={data} />
        </>
      )}
    </div>
  );
};

export default App;
