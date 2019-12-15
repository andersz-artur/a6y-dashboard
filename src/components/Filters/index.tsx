import React from 'react';

import './styles.css';
import { Multiselect } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';

const App: React.FC<{
  onCampaignsChange: any;
  onDatasourceChange: any;
  dataSources: string[];
  campaigns: string[];
  selectedCampaigns: string[];
  selectedDataSources: string[];
}> = ({
  onCampaignsChange,
  onDatasourceChange,
  dataSources,
  campaigns,
  selectedCampaigns,
  selectedDataSources
}) => {
  return (
    <section className="filters">
      <h2>Filter dimension values</h2>
      <hr />
      <button
        className="filters-apply"
        onClick={() => {
          // applyFilters(123);
        }}
      >
        Apply
      </button>
      <div className="filters-section">
        <div className="filters-header">
          <h3>Datasource</h3>
          <button
            className="filters-reset"
            onClick={() => {
              onDatasourceChange([]);
            }}
          >
            Reset
          </button>
        </div>

        <Multiselect
          data={dataSources}
          onChange={onDatasourceChange}
          value={selectedDataSources}
          placeholder="All "
        />
      </div>
      <div className="filters-section">
        <div className="filters-header">
          <h3>Campaign</h3>
          <button
            className="filters-reset"
            onClick={() => {
              onCampaignsChange([]);
            }}
          >
            Reset
          </button>
        </div>

        <Multiselect
          data={campaigns}
          onChange={onCampaignsChange}
          value={selectedCampaigns}
          placeholder="All "
        />
      </div>
    </section>
  );
};

export default App;
