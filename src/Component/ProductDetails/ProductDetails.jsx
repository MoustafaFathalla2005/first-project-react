import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import instance from "../../api/axiosInstance.js";
import { useCart } from "../../context/CartContext.jsx";
import products from "../../data/products.js";
import "./ProductDetails.css";

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
    let isMounted = true;
    setLoading(true);
    setError(false);
    setAdded(false);
    setQty(1);

    const localProduct = products.find((item) => item.id === Number(id));
    if (localProduct) {
      setProduct(localProduct);
      setLoading(false);
    } else {
      instance.get(`/products/${id}`).then((res) => {
        if (isMounted) {
          setProduct(res.data);
          setLoading(false);
        }
      }).catch(() => {
        if (isMounted) { setError(true); setLoading(false); }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
  };

  if (loading) {
    return (
      <div className="status-wrap">
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="status-wrap error">
        <p>Something went wrong!</p>
      </div>
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
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
                −
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase">
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
