import React, { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        onSearch(term);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        onSearch("");
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Поиск по всей таблице..."
                value={searchTerm}
                onChange={handleInputChange}
            />
            {searchTerm && (
                <button className="clear-button" onClick={handleClearSearch}>
                    &times; {/* Символ крестика */}
                </button>
            )}
        </div>
    );
};

export default SearchBar;
