import './Rating.css';

function Rating({ rating }) {
  return (
    <div className="rating" aria-label={`Rated ${rating} out of 5 stars`}>
      <span className="rating-stars" aria-hidden="true">★★★★★</span>
      <span className="rating-number">{rating}</span>
    </div>
  );
}

export default Rating;
