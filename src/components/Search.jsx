const Search = () => {
  return (
    <div className="flex px-2 mx-3 mb-2 justify-between items-center bg-white shadow-blue-400 shadow rounded-2xl">
      <input placeholder="Search a game deal" className="w-full text-black" />
      <img src="search.png" className="w-4 h-4" />
    </div>
  );
};

export default Search;
