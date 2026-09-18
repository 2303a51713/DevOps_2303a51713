import BookCard from './BookCard';
import './BookList.css';

const books = [
  { title: 'The Midnight Library', author: 'Matt Haig', price: 16.99, category: 'Fiction', rating: 4.7 },
  { title: 'Atomic Habits', author: 'James Clear', price: 18.5, category: 'Non-fiction', rating: 4.8 },
  { title: 'Project Hail Mary', author: 'Andy Weir', price: 20.0, category: 'Science', rating: 4.9 },
  { title: 'Educated', author: 'Tara Westover', price: 15.25, category: 'Biography', rating: 4.6 },
  { title: 'Tomorrow, and Tomorrow, and Tomorrow', author: 'Gabrielle Zevin', price: 17.75, category: 'Fiction', rating: 4.5 },
  { title: 'A Brief History of Time', author: 'Stephen Hawking', price: 14.99, category: 'Science', rating: 4.4 },
];

function BookList({ searchTerm, selectedCategory }) {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title.toLowerCase().includes(normalizedSearch);
    const matchesCategory = selectedCategory === 'All Books' || book.category === selectedCategory;
    return matchesTitle && matchesCategory;
  });

  return (
    <section id="books" aria-labelledby="book-results-heading">
      {filteredBooks.length > 0 ? (
        <>
          <p className="result-message" role="status">Book Found</p>
          <div className="book-grid" id="book-results-heading">
            {filteredBooks.map((book) => (
              <BookCard key={book.title} {...book} />
            ))}
          </div>
        </>
      ) : (
        <div className="empty-results" role="status">
          <h3>No Books Found</h3>
          <p>Try another title or choose a different category.</p>
        </div>
      )}
    </section>
  );
}

export default BookList;
