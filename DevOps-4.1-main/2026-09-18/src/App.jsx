import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Category from './components/Category';
import BookList from './components/BookList';
import Footer from './components/Footer';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Books');

  return (
    <div className="app-shell">
      <Header />
      <main className="page-content">
        <section className="welcome-section" aria-labelledby="page-title">
          <p className="section-kicker">A thoughtful collection for curious minds</p>
          <h1 id="page-title" className="page-title">Welcome to Online Book Store</h1>
          <p className="page-intro">
            Find stories that stay with you, ideas that move you, and a quiet place to begin your next chapter.
          </p>
        </section>

        <div className="catalog-toolbar">
          <div>
            <p className="section-kicker">Browse the shelves</p>
            <h2>Featured books</h2>
          </div>
          <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        </div>

        <Category
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <BookList searchTerm={searchTerm} selectedCategory={selectedCategory} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
