// ✅ File: src/utils/stocksApi.ts

// Mock data for fallback
const mockPatterns = [
  {
    id: '1',
    symbol: 'RELIANCE',
    date: '2024-01-15',
    open: 2450.50,
    close: 2475.30,
    high: 2485.00,
    low: 2440.25,
    volume: 1250000,
    prev_close: 2440.75,
    avg_price: 2462.50,
    matched_patterns: 'Bullish Engulfing, Morning Star'
  },
  {
    id: '2',
    symbol: 'TCS',
    date: '2024-01-15',
    open: 3650.00,
    close: 3680.25,
    high: 3695.50,
    low: 3645.75,
    volume: 980000,
    prev_close: 3645.50,
    avg_price: 3670.25,
    matched_patterns: 'Hammer, Doji'
  },
  {
    id: '3',
    symbol: 'INFY',
    date: '2024-01-15',
    open: 1520.30,
    close: 1535.80,
    high: 1540.00,
    low: 1515.25,
    volume: 1150000,
    prev_close: 1518.75,
    avg_price: 1527.50,
    matched_patterns: 'Rising Wedge, Breakout'
  },
  {
    id: '4',
    symbol: 'HDFC',
    date: '2024-01-15',
    open: 1680.50,
    close: 1695.25,
    high: 1702.00,
    low: 1675.30,
    volume: 890000,
    prev_close: 1678.40,
    avg_price: 1688.75,
    matched_patterns: 'Cup and Handle'
  },
  {
    id: '5',
    symbol: 'ICICIBANK',
    date: '2024-01-15',
    open: 950.75,
    close: 965.50,
    high: 968.25,
    low: 948.60,
    volume: 1350000,
    prev_close: 952.30,
    avg_price: 958.25,
    matched_patterns: 'Double Bottom, Support Break'
  },
  {
    id: '6',
    symbol: 'SBIN',
    date: '2024-01-15',
    open: 580.25,
    close: 590.75,
    high: 595.50,
    low: 578.90,
    volume: 1650000,
    prev_close: 582.15,
    avg_price: 586.35,
    matched_patterns: 'Ascending Triangle'
  }
];

const mockChartData = [
  { date: '2024-01-10', open: 2420, high: 2445, low: 2415, close: 2440, volume: 1200000 },
  { date: '2024-01-11', open: 2440, high: 2455, low: 2435, close: 2450, volume: 1100000 },
  { date: '2024-01-12', open: 2450, high: 2470, low: 2445, close: 2465, volume: 1300000 },
  { date: '2024-01-13', open: 2465, high: 2480, low: 2460, close: 2475, volume: 1150000 },
  { date: '2024-01-14', open: 2475, high: 2490, low: 2470, close: 2485, volume: 1250000 },
  { date: '2024-01-15', open: 2485, high: 2500, low: 2480, close: 2495, volume: 1400000 }
];

export const fetchPatterns = async (page: number) => {
  try {
    const response = await fetch(
      `https://modern-stock-api-9dd7c6923f13.herokuapp.com/patterns/latest?page=${page}&limit=40`,
      {
        method: 'GET',
        headers: {
          'x-api-key': '973827821435462',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('API fetch failed, using mock data:', error);
    // Return mock data with pagination simulation
    const startIndex = (page - 1) * 40;
    const endIndex = startIndex + 40;
    const paginatedData = [];
    
    // Generate more mock data for pagination
    for (let i = 0; i < 40; i++) {
      const basePattern = mockPatterns[i % mockPatterns.length];
      paginatedData.push({
        ...basePattern,
        id: `${page}-${i}`,
        symbol: basePattern.symbol + (i > 5 ? (i - 5) : ''),
        date: `2024-01-${15 + (i % 15)}`
      });
    }
    
    return paginatedData;
  }
};

export const fetchChartData = async (symbol: string) => {
  try {
    const response = await fetch(
      `https://modern-stock-api-9dd7c6923f13.herokuapp.com/stock/${symbol}`,
      {
        method: 'GET',
        headers: {
          'x-api-key': '973827821435462',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Chart API fetch failed, using mock data:', error);
    return mockChartData;
  }
};