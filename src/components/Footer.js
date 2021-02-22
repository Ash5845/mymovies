import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-center">
        <a className="footer-disclaimer" href="http://www.ashadur.com/" target="_blank">Created By Ashadur Rahman | &copy; 2021 All rights reserved</a>
        <ul className="footer-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/mymovies">Watchlist</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
