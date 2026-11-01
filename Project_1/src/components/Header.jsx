export default function Header({ name, color = "#2563eb" }) {
  return (
    <header className="portfolio-header" style={{ backgroundColor: color }}>
      <h1>Student Portfolio</h1>
      <p>{name}</p>
    </header>
  );
}
