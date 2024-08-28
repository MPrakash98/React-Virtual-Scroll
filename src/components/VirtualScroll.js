import React, { useEffect, useState, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import axios from 'axios';
import { IoSearchSharp } from "react-icons/io5";

const VirtualScroll = () => {
  const [data, setData] = useState([]); // State to store and update data fetched from server 
  const [page, setPage] = useState(1); // State to store and update pagination / scroll info
  const [hasMore, setHasMore] = useState(true); // State to store and update data limit info
  const [searchQuery, setSearchQuery] = useState(''); // State to store and update search input
  const path = process.env.REACT_APP_API_URL; // Get the api url from env
  const limit = process.env.REACT_APP_PAGE_LIMIT; // Get the limit of data from env

  // Function for fetching Data 
  // By use of useCallback it implements memoization(preventing run on each render and only runs when one of its dependencies changes ) thus improving re-rendering issues,memory usage and rendering time.
  const fetchData = useCallback(async () => {
    if (hasMore) {
      const response = await axios.get(path, {
        params: { page, limit: limit, filterkeyword: searchQuery }
      });

      setData(prevData => [...prevData, ...response.data.data]);
      setPage(prevPage => prevPage + 1);
      setHasMore(response.data.data.length > 0);
    }
  }, [page, hasMore, searchQuery]);

  // Used for handling side effects of component lifecycle
  useEffect(() => {
    setData([]); // Reset data when search query changes
    setPage(1);  // Reset page to 1 on new search
    setHasMore(true);  // Reset hasMore
    fetchData();
  }, []);

  // Function for handling search 
  const handleSearch = () => {
    setPage(1);
    setData([]);
    fetchData();
  };

  const Row = ({ index, style }) => {
    const row = data[index];

    if (!row) { // In case data limit reachs it's end or system has no data
      return <div style={{ ...style, textAlign: 'center' }}>Loading...</div>;
    }

    return (
      <div style={{ ...style, display: 'flex', borderBottom: '1px solid #ddd', padding: '8px 16px' }} key={row.id}>
        <div style={{ width: '33.33%' }}>{row.id}</div>
        <div style={{ width: '33.33%' }}>{row.name}</div>
        <div style={{ width: '33.33%' }}>{row.city}</div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by name/city"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <button onClick={handleSearch} style={styles.searchButton}>
          <IoSearchSharp />
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', backgroundColor: '#f5f5f5', padding: '8px 16px', fontWeight: 'bold' }}>
        <div style={{ width: '33.33%' }}>ID</div>
        <div style={{ width: '33.33%' }}>Name</div>
        <div style={{ width: '33.33%' }}>City</div>
      </div>
      <List
        height={400} // Height of the scrollable area
        itemCount={data.length + 1} // Number of rows (+1 to trigger loading)
        itemSize={50} // Height of each row
        width="100%" // Full width
        onItemsRendered={({ visibleStopIndex }) => {
          if (visibleStopIndex >= data.length - 1) {
            fetchData(); // Fetch and render more data when the user scrolls to the end
          }
        }}
      >
        {Row}
      </List>
    </div>
  );
};

// Styling component for different elements used
const styles = {
  container: {
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: '4px',
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '8px 16px',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#f5f5f5',
    boxSizing: 'border-box',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px 0 0 4px',
    border: '1px solid #ddd',
    flex: 1,
    minWidth: '150px',
  },
  searchButton: {
    padding: '8px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: '1px solid #007BFF',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer',
  }
};

export default VirtualScroll;
