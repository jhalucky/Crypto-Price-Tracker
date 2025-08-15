import { useState, useEffect } from 'react';
import { fetchCryptoData } from './api/cryptoapi';
import Navbar from './components/Navbar';
import Cryptocard from './components/Cryptocard';

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCryptoData = async () => {
      try {
        setLoading(true);
        const data = await fetchCryptoData();
        setCryptoData(data);
        setError(null);
      } catch (err) {
        setError(`Failed to fetch cryptocurrency data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadCryptoData();
  }, [searchQuery]); 

  const filteredCryptos = cryptoData.filter(crypto =>
    crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-violet-800 py-8 px-4">
      
        
        <Navbar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {error && (
          <div className="text-red-500 text-center my-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center my-8">
            Loading cryptocurrency data...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredCryptos.map(crypto => (
              <Cryptocard 
                key={crypto.id}
                crypto={crypto}
              />
            ))}
          </div>
        )}
      </div>
  
  );
}

export default App;
