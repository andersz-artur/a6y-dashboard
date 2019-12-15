import React from 'react';
// @ts-ignore
import Papa from 'papaparse';
// @ts-ignore
import { groupBy } from 'lodash-es';

import './styles.css';

import loader from '../../loader.gif';
import Filters from '../Filters';
import ChartArea from '../ChartArea';

const App: React.FC = () => {
  let getData: () => Promise<void>;
  const dataUrl: string =
    'http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv';
  const [isLoading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<[]>([]);

  React.useEffect(() => {
    console.log('did mount');
    console.log('Papa', Papa);
    getData();
  }, []);

  getData = async () => {
    setLoading(true);
    const response = await fetch(dataUrl);
    const text = await response.text();
    const parsedCsvData = Papa.parse(text, { header: true });
    console.log(parsedCsvData);

    const dataGrouped = groupBy(parsedCsvData.data, (element: any) => {
      // console.log('element', element);
      return element.Date;
    });

    const entires = Object.entries(dataGrouped);

    const data = entires.map((element: Array<any>) => {
      const clicks = element[1].reduce(
        (acc: any, current: any) => acc + Number(current.Clicks),
        0
      );
      const impressions = element[1].reduce(
        (acc: any, current: any) => acc + Number(current.Impressions),
        0
      );
      return { date: element[0], clicks, impressions };
    });

    // console.log('dataGrouped', dataGrouped);
    console.log('data', data);

    // @ts-ignore
    setData(data);
    setLoading(false);
  };

  return (
    <div className="box">
      {isLoading ? (
        <div className="loading">
          <h1>Loading data...</h1> <img src={loader} alt="loading..." />
        </div>
      ) : (
        <>
          <Filters />
          <ChartArea data={data} />
        </>
      )}
    </div>
  );
};

export default App;
