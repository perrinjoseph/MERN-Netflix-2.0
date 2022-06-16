import React from "react";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="footer" id="footer">
      <section className="footer--left">
        <section className="footer--left--top">
          <h1>NETFLIX</h1>
          <p className="footer--description">
            <br />v 2 . 0 <br />
            Developed by <br /> Perrin Joseph <br />
            perrinjoseph1998@gmail.com
          </p>
        </section>
        <section className="footer--left--bottom"></section>
      </section>

      <section className="footer--right">
        <section className="footer--right--top">
          <div className="footer--right--top--left">
            <header className="footer--right--top--left--header">Menu</header>
            <ul>
              <li>
                <Link to="/login">Login -for testing</Link>
              </li>
              <li>
                <Link to="/home">Home -for testing</Link>
              </li>
              <li>Tv Shows</li>
              <li>Movies</li>
              <li>New & Popular</li>

              <li>My List</li>
            </ul>
          </div>
          <div className="footer--right--top--right">
            <header className="footer--right--top--right--header">
              Similar Projects
            </header>
            <ul>
              <li>Whatsaap</li>
              <li>Facebook 2.0</li>
              <li>Gmail</li>
            </ul>
            <ul>
              <li>Helo & FAQ</li>
              <li>Terms & Conditions</li>
              <li>Contact</li>
            </ul>
          </div>
        </section>
        <section className="footer--right--bottom">
          <div className="footer--right--bottom--left">
            <FaTwitter className="footer--icons" size={24} />
            <FaFacebookF className="footer--icons" size={24} />
            <FaInstagram className="footer--icons" size={24} />
          </div>
          <div className="footer--right--bottom--right"></div>
        </section>
      </section>
    </footer>
  );
}

export default Footer;
