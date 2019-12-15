import Papa from 'papaparse';
import {groupBy} from "lodash-es";

import { RawDataState, DataState } from './types';

export const fetchAndParseCsv = async (url: string): Promise<RawDataState[]> => {
    const response = await fetch(url);
    const text = await response.text();
    const parsedCsvData = Papa.parse(text, { header: true });
    return parsedCsvData.data.filter(data => !!data.Date);
};

export const filterData = (rawData: RawDataState[]): DataState[] => {
    const dataGrouped = groupBy(rawData, element =>  element.Date);
    return Object.entries(dataGrouped).map(([key, value]) => {
        const clicks = value.reduce(
            (acc, current) => acc + Number(current.Clicks),
            0
        );
        const impressions = value.reduce(
            (acc, current) => acc + Number(current.Impressions),
            0
        );
        return { date: key, clicks, impressions };
    });
};

export const getDataSources = (rawData: RawDataState[]): string[] => {
    const groupedByDatasource = groupBy(rawData, element =>  element.Datasource);
    return  Object.keys(groupedByDatasource);
};

export const getCampaigns = (rawData: RawDataState[]): string[] => {
    const groupedByCampaign = groupBy(rawData, element =>  element.Campaign);
    return  Object.keys(groupedByCampaign);
};
