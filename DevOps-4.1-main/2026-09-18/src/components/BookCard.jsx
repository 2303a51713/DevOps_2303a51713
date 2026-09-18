import Rating from './Rating';
import './BookCard.css';

function BookCard({ title, author, price, category, rating }) {
  return (
    <article className="book-card">
      <div className="book-card-topline">
        <span>{category}</span>
        <Rating rating={rating} />
      </div>
      <div className="book-cover" aria-hidden="true">
        <span>{title.slice(0, 1)}</span>
      </div>
      <div className="book-info">
        <h3>{title}</h3>
        <p className="book-author">by {author}</p>
        <p className="book-price">${price.toFixed(2)}</p>
      </div>
      <div className="book-actions">
        <button className="buy-button" type="button">Buy Now</button>
        <button className="details-button" type="button">View Details</button>
      </div>
    </article>
  );
}

export default BookCard;
