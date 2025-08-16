export default function Cryptocard({ crypto }) {
  return (
    <div className="crypto-card bg-white flex flex-col justify-center items-center p-4 rounded-lg shadow-md
                    transform transition-all duration-300 ease-in-out
                    active:scale-95 hover:scale-105 hover:shadow-xl
                    cursor-pointer">
      <img 
        src={crypto.image} 
        alt={crypto.name} 
        className="w-16 h-16 mb-4 transform transition-transform duration-300 hover:rotate-12" 
      />

      <h2 className="text-xl font-bold mb-2">{crypto.name}</h2>
      <p className="text-gray-600 mb-2">Symbol: {crypto.symbol.toUpperCase()}</p>
      <p className="text-lg font-semibold text-green-600">
        ${crypto.current_price.toLocaleString()}
      </p>
      
      <div className="mt-4 w-full space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">24h Change:</span>
          <span className={`font-medium ${crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {crypto.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ease-out ${
              crypto.price_change_percentage_24h >= 0 ? 'bg-green-500' : 'bg-red-500'
            }`}
            style={{ 
              width: `${Math.min(Math.abs(crypto.price_change_percentage_24h || 0), 100)}%`,
              transition: 'width 1s ease-in-out' 
            }}
          />
        </div>
      </div>
    </div>
  );
}
