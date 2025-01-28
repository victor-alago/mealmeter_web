import React, { useState } from 'react';
import styles from '../assets/css/SearchPage.module.css';
import NavbarHome from '../components/NavbarHome';
import axios from 'axios';

function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            // Retrieve the token from localStorage
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authorization token found');
            }

            const response = await axios.get('http://localhost:8000/food/search', {
                params: { query: searchQuery },
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setSearchResults(response.data.results || []);
            console.log('Search results:', response.data.results);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div>
            <NavbarHome />
            <div className={styles.searchContainer}>
                <div className={styles.searchItem}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.inputField}
                        placeholder="Enter search query"
                    />
                    <button onClick={handleSearch} className={styles.actionButton}>
                        Search
                    </button>
                </div>
            </div>
            {searchResults.length > 0 && (
                <div className={styles.searchContainer}>
                    <div className={styles.resultsContainer}>
                        <ul className={styles.resultsList}>
                            {searchResults.map((result, index) => (
                                <li key={index} className={styles.resultItem}>
                                    <h3>{result.food_name}</h3>
                                    <p>{result.food_description}</p>
                                    <p>Type: {result.food_type}</p>
                                    {result.brand_name && <p>Brand: {result.brand_name}</p>}
                                    <a href={result.food_url} target="_blank" rel="noopener noreferrer">
                                        More Info
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchPage; 