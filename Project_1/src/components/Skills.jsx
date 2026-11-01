export default function Skills({ skills }) {
  return (
    <section className="portfolio-section">
      <h2>Skills</h2>
      <ul className="plain-list">
        {skills.map((skill) => <li key={skill}>{skill}</li>)}
      </ul>
    </section>
  );
}
