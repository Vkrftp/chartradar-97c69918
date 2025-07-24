import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { fetchChartData } from '@/utils/stocksApi';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChartProps {
  symbol: string;
  onClose: () => void;
}

interface ChartDataPoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

const Chart: React.FC<ChartProps> = ({ symbol, onClose }) => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchChartData(symbol);
        
        const formattedData: ChartDataPoint[] = data.map((item: any) => ({
          time: item.date, // Should be in YYYY-MM-DD format
          open: parseFloat(item.open),
          high: parseFloat(item.high),
          low: parseFloat(item.low),
          close: parseFloat(item.close)
        }));

        // Sort by date to ensure proper order
        formattedData.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  useEffect(() => {
    if (!chartData.length || !chartContainerRef.current || loading) return;

    // Clear any previous chart
    if (chartRef.current) {
      chartRef.current.remove();
    }

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: 'transparent' },
        textColor: '#DDD',
      },
      grid: {
        vertLines: { color: 'rgba(42, 46, 57, 0.5)' },
        horzLines: { color: 'rgba(42, 46, 57, 0.5)' },
      },
      rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 0.4)',
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.4)',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    try {
      // Check if the method exists before calling it
      if (typeof chart.addCandlestickSeries === 'function') {
        const candlestickSeries = chart.addCandlestickSeries({
          upColor: '#10B981',
          downColor: '#EF4444',
          borderDownColor: '#EF4444',
          borderUpColor: '#10B981',
          wickDownColor: '#EF4444',
          wickUpColor: '#10B981',
        });

        candlestickSeries.setData(chartData);
        
        // Fit content to show all data
        chart.timeScale().fitContent();

        chartRef.current = chart;
        seriesRef.current = candlestickSeries;
      } else {
        throw new Error('addCandlestickSeries method not available');
      }
    } catch (error) {
      console.error('Error creating candlestick series:', error);
      // Fallback: create a line series instead
      const lineSeries = chart.addLineSeries({
        color: '#10B981',
        lineWidth: 2,
      });
      
      const lineData = chartData.map(item => ({
        time: item.time,
        value: item.close
      }));
      
      lineSeries.setData(lineData);
      chart.timeScale().fitContent();

      chartRef.current = chart;
      seriesRef.current = lineSeries;
    }

    // Handle resize
    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [chartData, loading]);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center p-4">
      <div className="bg-background border border-border rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {symbol} - Candlestick Chart
          </h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="hover:bg-accent"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="p-4">
          {loading ? (
            <div className="flex items-center justify-center h-[400px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-3 text-muted-foreground">Loading chart data...</span>
            </div>
          ) : (
            <div 
              ref={chartContainerRef} 
              className="w-full h-[400px] bg-card rounded-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chart;