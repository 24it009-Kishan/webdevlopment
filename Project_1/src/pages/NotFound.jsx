import { Link } from "react-router-dom";

export default function NotFound() {
  return <section className="page-section"><h1>404 - Page Not Found</h1><Link to="/">Go to Home</Link></section>;
}
