import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// Components
const Home = () => <div>Home</div>;
const About = () => <div>About</div>;
const Contact = () => <div>Contact</div>;
const Phone = () => <div>Phone</div>;

// Breadcrumb component
const Breadcrumb = () => (
  <Router>
    <nav>
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        <Route path="/about">
          <li>
            <Link to="/about">About</Link>
          </li>
        </Route>
        <Route path="/contact">
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <Route path="/contact/phone">
            <li>
              <Link to="/contact/phone">Phone</Link>
            </li>
          </Route>
        </Route>
      </ol>
    </nav>

    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route exact path="/contact" component={Contact} />
    <Route path="/contact/phone" component={Phone} />
  </Router>
);

export default Breadcrumb;