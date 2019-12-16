import {
    filterData,
    getDataSources,
    getCampaigns
} from './helpers';

const rawFixture = {
    Date: '01.01.2019',
    Datasource: 'Test source',
    Campaign: 'Test campaign',
    Clicks: '100',
    Impressions: '200'
};

test('filterData when empty', () => {
    expect(filterData([])).toStrictEqual([]);
});

test('filterData from one day', () => {
    const input = [rawFixture, rawFixture, rawFixture];

    const expectedOutput = [{
        date: rawFixture.Date,
        clicks: 300,
        impressions: 600
    }];
    expect(filterData(input)).toStrictEqual(expectedOutput);
});

test('filterData from different days', () => {
    const input = [rawFixture, rawFixture, {...rawFixture, Date: '02.01.2019'}];

    const expectedOutput = [
        {
            date: rawFixture.Date,
            clicks: 200,
            impressions: 400
        },
        {
            date: input[2].Date,
            clicks: 100,
            impressions: 200
        }];
    expect(filterData(input)).toStrictEqual(expectedOutput);
});

test('filterData with datasource selected', () => {
    const input = [rawFixture, {...rawFixture, Datasource: 'Different datasource'}];

    const expectedOutput = [
        {
            date: rawFixture.Date,
            clicks: 100,
            impressions: 200
        }];
    expect(filterData(input, [rawFixture.Datasource])).toStrictEqual(expectedOutput);
});

test('filterData with campaign selected', () => {
    const input = [rawFixture, {...rawFixture, Campaign: 'Different campaign'}];

    const expectedOutput = [
        {
            date: rawFixture.Date,
            clicks: 100,
            impressions: 200
        }];
    expect(filterData(input, [], [rawFixture.Campaign])).toStrictEqual(expectedOutput);
});

test('filterData with both datasource and campaign selected', () => {
    const selectedCampaign = 'Selected Campaign';
    const selectedDatasource = 'Selected datasource';
    const input = [
        rawFixture,
        rawFixture,
        {...rawFixture, Campaign: selectedCampaign},
        {...rawFixture, Datasource: selectedDatasource},
        {...rawFixture, Campaign: selectedCampaign, Datasource: selectedDatasource}
        ];

    const expectedOutput = [
        {
            date: rawFixture.Date,
            clicks: 100,
            impressions: 200
        }];
    expect(filterData(input, [selectedDatasource], [selectedCampaign])).toStrictEqual(expectedOutput);
});

test('getDataSources when empty', () => {
    expect(getDataSources([])).toStrictEqual([]);
});

test('getDataSources from one day', () => {
    const input = [rawFixture];

    const expectedOutput = [rawFixture.Datasource];
    expect(getDataSources(input)).toStrictEqual(expectedOutput);
});

test('getCampaigns when empty', () => {
    expect(getCampaigns([])).toStrictEqual([]);
});

test('getCampaigns from one day', () => {
    const input = [rawFixture];

    const expectedOutput = [rawFixture.Campaign];
    expect(getCampaigns(input)).toStrictEqual(expectedOutput);
});
