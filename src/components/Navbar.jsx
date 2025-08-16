export default function Navbar({ query, setQuery, onSearch }) {
  return (
    <div className="flex sm:flex-row flex-col items-center justify-between p-4">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl sm:mb-0 mb-5 font-bold  text-gray-800">
        Crypto Price Tracker
      </h1>
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Search for a cryptocurrency"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-white md:w-96 py-2 px-4 text-center border rounded"
      />

      <button onClick={onSearch} className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-400">Search</button>
    
    </div>
    </div>
  );
}
