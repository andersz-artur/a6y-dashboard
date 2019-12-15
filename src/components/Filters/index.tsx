import React from 'react';

import './styles.css';

const App: React.FC<{ applyFilters: any }> = ({ applyFilters }) => {
  return (
    <div className="filters">
      <header>Filter dimension values</header>
      <button
        onClick={() => {
          applyFilters(123);
        }}
      >
        Apply
      </button>
    </div>
  );
};

export default App;
