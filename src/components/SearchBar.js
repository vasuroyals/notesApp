import React from 'react';
import './styles/SearchBar.css';

const SearchBar = ({ setCategoryFilter, setSearchQuery, searchQuery, categoryFilter }) => {
    return (
        <div className="search-bar">
            <label htmlFor="search">Search:</label>
            <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title or category"
            />
            <label htmlFor="category">Category:</label>
            <select
                id="category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
            >
                <option value="All">All</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Others">Others</option>
            </select>
        </div>
    );
};

export default SearchBar;
