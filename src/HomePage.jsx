import React, { useState } from 'react';
import axios from 'axios';
import { useImageContext } from './ImageContext';

function HomePage() {
  const { images, setImages, loading, setLoading, error, setError } = useImageContext();
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: { query, per_page: 12 },
        headers: {
          Authorization: `Client-ID 8ej6h1a4Lq1C2t3U9QpF7O7xP6ztThG8BV3k7yIolQ0`, 
        },
      });
      if (response.data.results.length > 0) {
        setImages(response.data.results);
      } else {
        setImages([]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setError('An error occurred while fetching images.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='search-container'>
      <h1>Image Search</h1>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for images..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {images.length === 0 && !loading && <p>No images found.</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}> 
        {images.map((image) => (
          <div key={image.id}>
            <a href={image.links.download} target="_blank" rel="noopener noreferrer">
              <img src={image.urls.small} alt={image.alt_description} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
