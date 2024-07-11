export const formattedResult = (res: {results: any}, year: any) => {
  if (res.results.length) {
    return [
      {id: year, value: year, type: 'label'},
      {id: `${year}_blank`, value: '', type: 'label'},
      ...res.results,
    ];
  } else {
    return [];
  }
};

export const DEFAULT_START_PAGE = 2012;
