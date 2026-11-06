import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Page not found — FCAI Summaries";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <main className="not-found">
      <div className="not-found-glow" />
      <div className="not-found-card">
        <div className="not-found-code">404</div>
        <h1>This page moved or never existed</h1>
        <p>
          The lecture you're looking for isn't at this address. Try one of the
          study hubs below.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="not-found-primary">
            Back to home
          </Link>
          <Link to="/2nd-year" className="not-found-secondary">
            2nd Year — Term 2
          </Link>
          <Link to="/3rd-year" className="not-found-secondary">
            3rd Year — Term 1
          </Link>
        </div>
      </div>
    </main>
  );
}
