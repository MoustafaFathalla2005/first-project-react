import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="not-found">
      <div className="fade-in-up">
        <h1>404</h1>
        <p>Page Not Found</p>
        <Link to="/" className="btn">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
