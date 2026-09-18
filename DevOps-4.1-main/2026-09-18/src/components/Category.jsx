import './Category.css';

const categories = ['All Books', 'Fiction', 'Non-fiction', 'Science', 'Biography'];

function Category({ selectedCategory, onSelectCategory }) {
  return (
    <section className="category-section" aria-label="Book categories">
      <div className="category-label">Categories</div>
      <div className="category-list">
        {categories.map((category) => (
          <button
            className={selectedCategory === category ? 'category-button active' : 'category-button'}
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Category;
