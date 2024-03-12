"use client";

import { useState } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setSearchTerm(searchTerm);
    console.log(searchTerm);
  };
  return (
    <div
      className="
        border-[1px]
        w-full
        md:w-auto
        py-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
    "
    >
       <form onSubmit={handleSearch}>
      <div
        className="
            flex
            flex-row
            items-center
            justify-between
        "
      >
        <div
          className="
                text-sm
                font-semibold
                px-6    
            "
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
        </div>
        <div
          className="
          text-sm
          pl-6
          pr-2
          text-gray-600
          flex
          items-center
          gap-3
        "
        >
          <button type="submit">
            <div
              className="
            p-2
            bg-rose-500
            rounded-full
            text-white
          "
            >
              <BiSearch size={18} />
            </div>
          </button>
        </div>
      </div>
      </form>
    </div>
  );
};

export default Search;
