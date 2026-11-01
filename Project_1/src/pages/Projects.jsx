import { useCallback, useEffect, useMemo, useState } from "react";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || "24it009-Kishan";

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchRepos = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch repositories");
      }
      const data = await response.json();
      setRepos(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  const filteredRepos = useMemo(
    () => repos.filter((repo) => repo.name.toLowerCase().includes(search.toLowerCase())),
    [repos, search]
  );

  return (
    <section className="projects-page">
      <h1>My GitHub Repositories</h1>
      <input
        className="repo-search"
        type="text"
        placeholder="Search repositories..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {loading && <Spinner />}
      {!loading && error && <ErrorMessage message={error} onRetry={fetchRepos} />}

      {!loading && !error && (
        <div className="repo-list">
          {filteredRepos.length === 0 ? (
            <p>No repositories found.</p>
          ) : filteredRepos.map((repo) => (
            <article className="repo-item" key={repo.id}>
              <h2>{repo.name} <span>⭐ {repo.stargazers_count}</span></h2>
              <p>{repo.description || "No description available"}</p>
              <p>Language: {repo.language || "Not specified"}</p>
              <p>⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}</p>
              <a href={repo.html_url} target="_blank" rel="noreferrer">View Repository</a>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
