import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Chart } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { fetchPatterns, fetchChartData } from '@/utils/stocksApi';

interface Pattern {
  id?: string;
  symbol: string;
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  prev_close: number;
  avg_price: number;
  matched_patterns: string;
}

interface ChartData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const CardSection = () => {
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null);
  const [loading, setLoading] = useState(false);
  const TOTAL_PAGES = 5;

  const fetchPatternsData = async (page: number) => {
    try {
      setLoading(true);
      const data = await fetchPatterns(page);
      setPatterns(data);
    } catch (error) {
      console.error('Error fetching patterns:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatternsData(currentPage);
  }, [currentPage]);

  const renderChart = (symbol: string, data: ChartData[]) => {
    const ctx = document.getElementById('chart-canvas') as HTMLCanvasElement;
    if (!ctx) return;

    // Destroy previous chart if exists
    if ((ctx as any).chart) {
      (ctx as any).chart.destroy();
    }

    const processedData = data.map(item => ({
      x: new Date(item.date),
      o: item.open,
      h: item.high,
      l: item.low,
      c: item.close,
      volume: item.volume
    }));

    (ctx as any).chart = new Chart(ctx, {
      type: 'bar',
      data: {
        datasets: [{
          label: `${symbol} Price`,
          data: processedData,
          borderColor: (ctx: any) => ctx.raw.c >= ctx.raw.o ? '#10B981' : '#EF4444',
          backgroundColor: (ctx: any) => ctx.raw.c >= ctx.raw.o 
            ? 'rgba(16, 185, 129, 0.8)' 
            : 'rgba(239, 68, 68, 0.8)',
          borderWidth: 1,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            time: { unit: 'day', tooltipFormat: 'PP' },
            grid: { display: false }
          },
          y: {
            ticks: { callback: (value: any) => `₹${value}` },
            grid: { color: 'rgba(255, 255, 255, 0.1)' }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (ctx: any) => [
                `Open: ₹${ctx.raw.o}`,
                `High: ₹${ctx.raw.h}`,
                `Low: ₹${ctx.raw.l}`,
                `Close: ₹${ctx.raw.c}`,
                `Volume: ${ctx.raw.volume.toLocaleString()}`
              ]
            }
          },
          legend: { display: false }
        }
      }
    });
  };

  const openChart = async (pattern: Pattern) => {
    setSelectedPattern(pattern);
    try {
      const data = await fetchChartData(pattern.symbol);
      setTimeout(() => renderChart(pattern.symbol, data), 0);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const closeChart = () => {
    setSelectedPattern(null);
  };

  return (
    <div className="p-6 bg-background min-h-screen text-foreground">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <motion.div
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {patterns.map((pattern, index) => (
              <motion.div
                key={pattern.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative bg-card rounded-2xl shadow-xl border border-border p-6 hover:shadow-primary/20 transition-all duration-300"
              >
                <button
                  onClick={() => openChart(pattern)}
                  className="absolute top-3 right-3 bg-primary text-primary-foreground text-sm px-3 py-1 rounded shadow hover:bg-primary/90 transition"
                >
                  Chart
                </button>

                <h3 className="text-2xl font-extrabold text-primary mb-2 tracking-wide">
                  {pattern.symbol}
                </h3>
                <ul className="space-y-1 text-sm font-medium text-muted-foreground">
                  <li className="text-muted-foreground">📅 <span className="text-foreground">Date:</span> {pattern.date}</li>
                  <li><span className="text-foreground">Open:</span> ₹{pattern.open}</li>
                  <li><span className="text-foreground">Close:</span> ₹{pattern.close}</li>
                  <li><span className="text-foreground">High:</span> ₹{pattern.high}</li>
                  <li><span className="text-foreground">Low:</span> ₹{pattern.low}</li>
                  <li><span className="text-foreground">Volume:</span> {pattern.volume}</li>
                  <li><span className="text-foreground">Prev Close:</span> ₹{pattern.prev_close}</li>
                  <li><span className="text-foreground">Avg Price:</span> ₹{pattern.avg_price}</li>
                  <li className="text-accent mt-2"><span className="text-foreground">📈 Pattern:</span> {pattern.matched_patterns}</li>
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-1 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: TOTAL_PAGES }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-1 rounded font-semibold transition ${
                  currentPage === i + 1
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, TOTAL_PAGES))}
              disabled={currentPage === TOTAL_PAGES}
              className="px-4 py-1 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {selectedPattern && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
              <div className="bg-card rounded-xl shadow-xl w-full max-w-6xl h-[80vh] p-6 relative">
                <button
                  onClick={closeChart}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-2xl z-10"
                >
                  &times;
                </button>
                <div className="h-full w-full">
                  <canvas id="chart-canvas" className="w-full h-full" />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CardSection;