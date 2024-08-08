import React, { useState } from 'react';
import "../styles/searchBar.css";
import { IoSearchOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInput = (e) => {
    setSearchValue(e.target.value);
    const crossBtn = document.getElementById("crossBtn");
    if (searchValue !== "") {
      crossBtn.style.display = 'flex';
    } else {
      crossBtn.style.display = 'none';
    }
  }
  return (
    <div className='searchBarContainer'>
      <div id='crossBtn' onClick={() => {setSearchValue("")}}>
        <RxCrossCircled />
      </div>
      <input type='text' placeholder='type to search here...' value={searchValue} onInput={handleSearchInput}/>
      <button className='searchBtn'>
        <div className='searchIcon'><IoSearchOutline className='searchOutline'/></div>
        <div>Search</div>
      </button>
    </div>
  )
}
