import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import "./Cart.css";

function Cart() {
  const { items, removeFromCart, updateQty, clearCart, totalPrice } = useCart();
  const [placed, setPlaced] = useState(false);

  const handleCheckout = () => {
    clearCart();
    setPlaced(true);
  };

  if (placed) {
    return (
      <main className="status-wrap success page fade-in-up" role="status">
        <div className="success-badge">✓</div>
        <h2>Demo checkout complete!</h2>
        <p>This checkout is a simulation; no payment was collected.</p>
        <Link to="/products" className="btn">
          Continue Shopping
        </Link>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="status-wrap page">
        <p>Your cart is empty.</p>
        <Link to="/products" className="btn">
          Browse Products
        </Link>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="section-heading fade-in-up">
        <h1>Your Cart</h1>
        <p>Review your items before checkout.</p>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item, i) => (
            <div
              className="cart-item fade-in-up"
              key={item.id}
              style={{ animationDelay: `${Math.min(i, 8) * 0.05}s` }}
            >
              <div className="cart-item-img">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
              </div>
              <div className="qty-stepper">
                <button type="button" onClick={() => updateQty(item.id, item.qty - 1)} aria-label={`Decrease quantity of ${item.title}`}>
                  −
                </button>
                <span>{item.qty}</span>
                <button type="button" onClick={() => updateQty(item.id, item.qty + 1)} aria-label={`Increase quantity of ${item.title}`}>
                  +
                </button>
              </div>
              <p className="cart-item-subtotal">${(item.price * item.qty).toFixed(2)}</p>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.title} from bag`}
                type="button"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <aside className="cart-summary fade-in-up">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button className="btn btn-block" onClick={handleCheckout} type="button">
            Complete demo checkout
          </button>
          <p className="checkout-note">Demo only — no payment will be collected.</p>
        </aside>
      </div>
    </main>
  );
}

export default Cart;
