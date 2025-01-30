import React, { useState, useEffect } from 'react';
import styles from '../assets/css/SearchPage.module.css';
import NavbarHome from '../components/NavbarHome';
import axios from 'axios';
import { FaFireAlt, FaUtensils, FaTag, FaBalanceScale, FaInfoCircle } from 'react-icons/fa'; // Added icons

function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);

    // Debounce function
    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Utility function to parse only the unit of measure from the food description
    function parseNutritionInfo(description) {
        const info = {
            quantityUnit: 'Quantity not specified', // Default fallback text if no quantity or unit is found
        };

        // Regex to extract the quantity and the unit of measure
        const match = description.match(/Per (\d+\s*[a-zA-Z]+)\s*/);
        if (match && match[1]) {
            info.quantityUnit = match[1]; // captures values like '100g', '4 oz', etc.
        }

        return info;
    }

    const handleSearch = async () => {
        if (!searchQuery) return; // Early exit if searchQuery is empty
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authorization token found');
            }
            const response = await axios.get('http://localhost:8000/food/search', {
                params: { query: searchQuery },
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            // Slice the results to only include up to 5 items
            const topFiveResults = response.data.results.slice(0, 5);
            setSearchResults(topFiveResults);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    // Wrapped handleSearch with debounce
    const debouncedSearch = debounce(handleSearch, 300);

    useEffect(() => {
        if (searchQuery.length > 2) {
            debouncedSearch();
        }
    }, [searchQuery]);

    const handleSelectResult = (result) => {
        setSelectedResult(result);
        setSearchResults([]);
    };

    return (
        <div>
            <NavbarHome />
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.inputField}
                    placeholder="Search for a food item..."
                />
                {searchResults.length > 0 && (
                    <div className={styles.resultsDropdown}>
                        <ul className={styles.resultsList}>
                            {searchResults.map((result, index) => {
                                const nutrition = parseNutritionInfo(result.food_description);
                                return (
                                    <li
                                        key={index}
                                        className={styles.resultItem}
                                        onClick={() => handleSelectResult(result)}
                                    >
                                        {result.food_name} - {nutrition.quantityUnit}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
            {selectedResult && (
                <div className={styles.selectedResultContainer}>
                    <h3>{selectedResult.food_name}</h3>
                    <ul className={styles.detailsList}>
                        <li>
                            <FaBalanceScale color="#30302f" />
                            <span>{selectedResult.food_description}</span>
                        </li>
                        <li>
                            <FaUtensils color="#FFB74D" />
                            <span>Type: {selectedResult.food_type}</span>
                        </li>
                        {selectedResult.brand_name && (
                            <li>
                                <FaTag color="#81C784" />
                                <span>Brand: {selectedResult.brand_name}</span>
                            </li>
                        )}
                    </ul>
                    <a href={selectedResult.food_url} target="_blank" rel="noopener noreferrer" className={styles.moreInfoLink}>
                        <FaInfoCircle /> More Info
                    </a>
                </div>
            )}
        </div>
    );
}

export default SearchPage;