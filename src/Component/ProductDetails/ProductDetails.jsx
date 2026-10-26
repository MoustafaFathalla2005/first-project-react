import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import instance from "../../api/axiosInstance.js";
import { useCart } from "../../context/CartContext.jsx";
import products from "../../data/products.js";
import "./ProductDetails.css";

function isProductDetails(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof value.title === "string" &&
    value.title.trim().length > 0 &&
    typeof value.category === "string" &&
    value.category.trim().length > 0 &&
    Number.isFinite(value.price) &&
    value.price >= 0 &&
    typeof value.image === "string" &&
    value.image.length > 0 &&
    typeof value.description === "string"
  );
}

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    setAdded(false);
    setQty(1);
    setProduct(null);

    const productId = Number(id);
    if (!Number.isSafeInteger(productId) || productId < 1) {
      setError(true);
      setLoading(false);
      return () => controller.abort();
    }

    const localProduct = products.find((item) => item.id === productId);
    if (localProduct) {
      setProduct(localProduct);
      setLoading(false);
    } else {
      instance.get(`/products/${productId}`, { signal: controller.signal }).then((res) => {
        if (isProductDetails(res.data)) {
          setProduct(res.data);
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      }).catch((requestError) => {
        if (!controller.signal.aborted) {
          console.error("Unable to load product details.", requestError);
          setError(true);
          setLoading(false);
        }
      });
    }

    return () => controller.abort();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
  };

  if (loading) {
    return (
      <main className="status-wrap page" role="status" aria-live="polite">
        <div className="spinner" />
        <p>Loading...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="status-wrap error page" role="alert">
        <p>Product not found or unavailable.</p>
        <Link to="/products" className="btn">Browse products</Link>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="details-card fade-in-up">
        <div className="details-img">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="details-info">
          <span className="product-category">{product.category}</span>
          <h2>{product.title}</h2>
          <p className="price">${product.price}</p>
          <p className="rating">
            ⭐ {product.rating?.rate}{" "}
            <span className="rating-count">({product.rating?.count} reviews)</span>
          </p>
          <p className="description">{product.description}</p>

          <div className="qty-row">
            <span className="qty-label">Quantity</span>
            <div className="qty-stepper">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label={`Decrease quantity of ${product.title}`}>
                −
              </button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)} aria-label={`Increase quantity of ${product.title}`}>
                +
              </button>
            </div>
          </div>

          <div className="details-actions">
            <button className="btn" onClick={handleAddToCart}>
              {added ? "Added to Cart ✓" : "Add to Cart"}
            </button>
            {added && (
              <button className="btn btn-outline" onClick={() => navigate("/cart")}>
                Go to Cart →
              </button>
            )}
          </div>

          <Link to="/products" className="back-link">
            ← Back to Products
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
