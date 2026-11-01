export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message">
      <h3>Error</h3>
      <p>{message}</p>
      <button onClick={onRetry}>Retry</button>
    </div>
  );
}
