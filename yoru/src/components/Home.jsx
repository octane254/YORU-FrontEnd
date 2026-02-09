import { useState, useEffect } from 'react';
import "./styles/home.css";

const Home = () => {
  // Library/manga data
  const [library, setLibrary] = useState(null);
  
  // User's reading progress
  const [continueReading, setContinueReading] = useState([]);
  
  // Featured/trending manga
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  
  // User bookmarks/favorites
  const [bookmarks, setBookmarks] = useState([]);
  
  // Search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  
  // UI state
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Fetch data on component mount
  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        // Fetch all data (replace with your API calls)
        const [libraryData, featuredData, trendingData, newData, userProgress] = await Promise.all([
          fetch('/api/library').then(res => res.json()),
          fetch('/api/featured').then(res => res.json()),
          fetch('/api/trending').then(res => res.json()),
          fetch('/api/new-releases').then(res => res.json()),
          fetch('/api/user/progress').then(res => res.json())
        ]);
        
        setLibrary(libraryData);
        setFeatured(featuredData);
        setTrending(trendingData);
        setNewReleases(newData);
        setContinueReading(userProgress);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHomeData();
  }, []);
  
  // Toggle bookmark
  const toggleBookmark = (mangaId) => {
    setBookmarks(prev => 
      prev.includes(mangaId)
        ? prev.filter(id => id !== mangaId)
        : [...prev, mangaId]
    );
  };
  
  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    // Implement search logic or API call
  };
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-carousel">
          {featured && featured.length > 0 && (
            <>
              <div 
                className="hero-slide"
                style={{ backgroundImage: `url(${featured[currentSlide]?.bannerUrl})` }}
              >
                <div className="hero-content">
                  <h1>{featured[currentSlide]?.title}</h1>
                  <p>{featured[currentSlide]?.description}</p>
                  <div className="hero-actions">
                    <button className="btn-primary">Start Reading</button>
                    <button className="btn-secondary">Add to Library</button>
                  </div>
                </div>
              </div>
              
              {/* Carousel dots */}
              <div className="carousel-dots">
                {featured.map((_, index) => (
                  <button
                    key={index}
                    className={index === currentSlide ? 'active' : ''}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* Continue Reading Section */}
      {continueReading && continueReading.length > 0 && (
        <section className="continue-reading">
          <h2>Continue Reading</h2>
          <div className="manga-grid">
            {continueReading.map(manga => (
              <MangaCard 
                key={manga.id}
                manga={manga}
                showProgress={true}
                isBookmarked={bookmarks.includes(manga.id)}
                onBookmark={() => toggleBookmark(manga.id)}
              />
            ))}
          </div>
        </section>
      )}
      
      {/* Trending Section */}
      <section className="trending">
        <div className="section-header">
          <h2>Trending Now</h2>
          <a href="/trending">View All →</a>
        </div>
        <div className="manga-scroll">
          {trending && trending.map(manga => (
            <MangaCard 
              key={manga.id}
              manga={manga}
              isBookmarked={bookmarks.includes(manga.id)}
              onBookmark={() => toggleBookmark(manga.id)}
            />
          ))}
        </div>
      </section>
      
      {/* New Releases Section */}
      <section className="new-releases">
        <div className="section-header">
          <h2>New Releases</h2>
          <a href="/new">View All →</a>
        </div>
        <div className="manga-grid">
          {newReleases && newReleases.slice(0, 12).map(manga => (
            <MangaCard 
              key={manga.id}
              manga={manga}
              isBookmarked={bookmarks.includes(manga.id)}
              onBookmark={() => toggleBookmark(manga.id)}
            />
          ))}
        </div>
      </section>
      
      {/* Genre Sections */}
      <section className="genre-section">
        <div className="section-header">
          <h2>Action</h2>
          <a href="/genre/action">View All →</a>
        </div>
        <div className="manga-scroll">
          {library?.action?.map(manga => (
            <MangaCard 
              key={manga.id}
              manga={manga}
              isBookmarked={bookmarks.includes(manga.id)}
              onBookmark={() => toggleBookmark(manga.id)}
            />
          ))}
        </div>
      </section>
      
      <section className="genre-section">
        <div className="section-header">
          <h2>Romance</h2>
          <a href="/genre/romance">View All →</a>
        </div>
        <div className="manga-scroll">
          {library?.romance?.map(manga => (
            <MangaCard 
              key={manga.id}
              manga={manga}
              isBookmarked={bookmarks.includes(manga.id)}
              onBookmark={() => toggleBookmark(manga.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;