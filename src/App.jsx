import { useState, useEffect } from 'react';
import { fetchCryptoData } from './api/cryptoapi';
import Navbar from './components/Navbar';
import Cryptocard from './components/Cryptocard';

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [allCryptoData, setAllCryptoData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const loadCryptoData = async (page) => {
    try {
      setLoading(true);
      const data = await fetchCryptoData(page);
      if (!data || data.length === 0) {
        setError("No more data available");
      } else {
        setCryptoData(data);
        setError(null);
      }
    } catch (err) {
      setError(`Failed to fetch cryptocurrency data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadAllPagesForSearch = async () => {
    try {
      setLoading(true);
      const allData = [];

      const promises = Array.from({ length: totalPages }, (_, i) =>
        fetchCryptoData(i + 1)
      );
      const results = await Promise.all(promises);

      results.forEach((pageData) => {
        if (pageData && pageData.length > 0) {
          allData.push(...pageData);
        }
      });

      setAllCryptoData(allData);
      setError(null);
    } catch (err) {
      setError(`Failed to fetch all cryptocurrency data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fixed dependency
  useEffect(() => {
    loadCryptoData(currentPage);
  }, [currentPage]);

  const filteredCryptos = cryptoData.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-violet-800 p-5 py-8">
      <Navbar
        query={searchQuery}
        setQuery={setSearchQuery}
        onSearch={() => {}}
      />

      {error && (
        <div className="text-red-500 text-center my-4">{error}</div>
      )}

      {loading ? (
        <div className="text-center my-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          <p className="text-white mt-4 animate-pulse">
            Loading your cryptocurrency
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCryptos.map((crypto, index) => (
              <div
                key={crypto.id}
                className="transform transition-all duration-500 ease-out"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.5s ease-out forwards',
                }}
              >
                <Cryptocard crypto={crypto} />
              </div>
            ))}
          </div>
          <style jsx>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>

          {/* ✅ Single Pagination Section */}
          <div className="flex justify-center gap-4 mt-8 pb-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1 || loading}
              className={`px-4 py-2 rounded ${
                currentPage === 1 || loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-400'
              } text-white font-semibold`}
            >
              Previous Page
            </button>
            <span className="flex items-center text-white font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage >= totalPages || loading}
              className={`px-4 py-2 rounded ${
                currentPage >= totalPages || loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-400'
              } text-white font-semibold`}
            >
              Next Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;