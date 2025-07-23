// ✅ File: src/utils/stocksApi.ts

export const fetchPatterns = async (page: number) => {
  const response = await fetch(
    `https://modern-stock-api-9dd7c6923f13.herokuapp.com/patterns/latest?page=${page}&limit=40`,
    {
      headers: {
        'x-api-key': '973827821435462'
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch patterns');
  }

  const data = await response.json();
  return data;
};

export const fetchChartData = async (symbol: string) => {
  const response = await fetch(
    `https://modern-stock-api-9dd7c6923f13.herokuapp.com/stock/${symbol}`,
    {
      headers: {
        'x-api-key': '973827821435462'
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch chart data');
  }

  const data = await response.json();
  return data;
};