import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { getProducts } from "../../store/productsSlice.js";
import { useCart } from "../../context/CartContext.jsx";
import "./Products.css";

function Products() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [searchParams, setSearchParams] = useSearchParams();
  const timerRef = useRef(null);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const handleAdd = (product) => {
    addToCart(product, 1);
    setJustAdded(product.id);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setJustAdded(null), 1200);
  };

  const categories = ["All", ...new Set(products.map((product) => product.category))];
  const requestedCategory = searchParams.get("category");
  const category = categories.find(
    (item) => item.toLowerCase() === requestedCategory?.toLowerCase(),
  ) ?? "All";
  const visibleProducts = products
    .filter((product) => category === "All" || product.category === category)
    .filter((product) =>
      `${product.title} ${product.category}`.toLowerCase().includes(query.trim().toLowerCase()),
    )
    .sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      return (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0);
    });

  const selectCategory = (nextCategory) => {
    const nextParams = new URLSearchParams(searchParams);
    if (nextCategory === "All") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", nextCategory);
    }
    setSearchParams(nextParams);
  };

  const productCards = [];
  for (let i = 0; i < visibleProducts.length; i++) {
    const product = visibleProducts[i];
    productCards.push(
      <div
        className="product-card fade-in-up"
        key={product.id}
        style={{ animationDelay: `${Math.min(i, 8) * 0.05}s` }}
      >
        <Link to={`/details/${product.id}`} className="product-img">
          <img src={product.image} alt={product.title} loading="lazy" />
          <span className="product-badge">{product.badge}</span>
        </Link>
        <span className="product-category">{product.category}</span>
        <h3>{product.title}</h3>
        <div className="product-meta">
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="rating">
            ⭐ {product.rating?.rate}{" "}
            <span className="rating-count">({product.rating?.count})</span>
          </p>
        </div>
        <div className="card-actions">
          <Link to={`/details/${product.id}`} className="btn btn-outline btn-half">
            View
          </Link>
          <button
            className={`btn btn-half ${justAdded === product.id ? "btn-added" : ""}`}
            onClick={() => handleAdd(product)}
          >
            {justAdded === product.id ? "Added ✓" : "Add to bag +"}
          </button>
        </div>
      </div>,
    );
  }

  if (loading) {
    return (
      <main className="status-wrap page" role="status" aria-live="polite">
        <div className="spinner" />
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="status-wrap error page" role="alert">
        <p>Something went wrong!</p>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="catalog-head fade-in-up">
        <div><span className="eyebrow">THE SPRINTIX CATALOG</span><h1>Find your<br /><em>next level.</em></h1><p>Performance essentials designed for every version of your active life.</p></div>
        <div className="catalog-count"><strong>{visibleProducts.length.toString().padStart(2, "0")}</strong><span>pieces<br />in the edit</span></div>
      </div>
      <div className="catalog-toolbar">
        <div className="filter-pills" role="group" aria-label="Filter products by category">
          {categories.map((item) => (
            <button
              type="button"
              className={category === item ? "selected" : ""}
              onClick={() => selectCategory(item)}
              aria-pressed={category === item}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="catalog-controls">
          <label className="search-box">
            ⌕
            <input
              aria-label="Search products"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search gear"
            />
          </label>
          <select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Sort: Featured</option>
            <option value="price-low">Price: Low to high</option>
            <option value="price-high">Price: High to low</option>
          </select>
        </div>
      </div>
      <div className="products-grid">
        {productCards}
      </div>
      {visibleProducts.length === 0 && (
        <div className="empty-search" role="status">
          <strong>No gear found.</strong>
          <span>Try another search or category.</span>
        </div>
      )}
    </main>
  );
}

export default Products;
