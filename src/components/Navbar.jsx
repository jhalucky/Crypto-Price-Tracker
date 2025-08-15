export default function Navbar({ query, setQuery, onSearch }) {
  return (
    <div className="flex flex-1 space-x-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Crypto Price Tracker
      </h1>
      <div className="flex bg-amber-700 gap-50">
      <input
        type="text"
        placeholder="Search for a cryptocurrency..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-white border border-gray-300 rounded-lg"
      />

      <button onClick={onSearch} className="bg-amber-300 p-2 rounded-lg">Search</button>
    </div>
    </div>
  );
}
