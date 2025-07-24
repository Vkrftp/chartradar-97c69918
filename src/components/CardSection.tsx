import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchPatterns } from '@/utils/stocksApi';
import Chart from './Chart';

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

  const openChart = (pattern: Pattern) => {
    setSelectedPattern(pattern);
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
            <Chart 
              symbol={selectedPattern.symbol} 
              onClose={closeChart} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default CardSection;