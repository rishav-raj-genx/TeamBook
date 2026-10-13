import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <div className="hero-text">
        <p className="eyebrow">WELCOME TO TEAMBOOK</p>
        <h1>Meet the people who make great things happen.</h1>
        <p className="hero-description">
          Browse our friendly employee directory, learn about each team, and see what everyone is working on.
        </p>
        <Link className="button" to="/employees">View team</Link>
      </div>
      <div className="hero-shape">
        <span>30</span>
        <p>team members</p>
      </div>
    </section>
  );
}

export default Home;
