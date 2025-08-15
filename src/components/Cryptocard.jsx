export default function Cryptocard({ crypto }) {
  return (
    <div className="crypto-card bg-white flex flex-col justify-center items-center p-4 rounded-lg shadow-md">
      <img src={crypto.image} alt={crypto.name} className="crypto-image mb-4" />

      <h2>{crypto.name}</h2>
      <p>Symbol: {crypto.symbol.toUpperCase()}</p>
      <p>Price: ${crypto.current_price.toLocaleString()}</p>
    </div>
  );
}
