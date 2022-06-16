import React from "react";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer--row">
        <aside className="footer--col1">
          <h2>NETFLIX CLONE</h2>
          <div>
            Designed and Developed by <br></br> Perrin Joseph{" "}
            <div className="footer--col1--icons">
              <FaFacebookF size={35} className="footer--col1--icons--icon" />
              <FaInstagram size={35} className="footer--col1--icons--icon" />
              <FaTwitter size={35} className="footer--col1--icons--icon" />
            </div>
          </div>
        </aside>
        <section className="footer--col2">
          <nav>
            <header className="footer--header">Similar Projects</header>
            <ul>
              <li>Whatsaap</li>
              <li>Facebook 2.0</li>
              <li>Gmail</li>
            </ul>
          </nav>
        </section>
        <aside className="footer--col3">
          <nav>
            <header className="footer--header">Menu</header>{" "}
            <ul>
              <li>
                <Link to="/login" className="link-styles-reset link-footer">
                  Login -for testing
                </Link>
              </li>
              <li>
                <Link to="/home" className="link-styles-reset link-footer">
                  Home -for testing
                </Link>
              </li>
              <li>Tv Shows</li>
              <li>Movies</li>
              <li>New & Popular</li>

              <li>My List</li>
            </ul>
          </nav>
        </aside>
        <aside className="footer--col4">
          <nav>
            <ul>
              <li>Helo & FAQ</li>
              <li>
                <Link
                  to="/accountsetup"
                  className="link-styles-reset link-footer"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>Contact</li>
            </ul>
          </nav>
        </aside>
      </div>
      <div className="footer--row">
        <aside className="footer--terms">
          This application was build using JavaScript, React, Scss, React-Icons,
          React Router v6, Redux, axios, Node js, JWT, cryptojs, mongoDB,
          GridFS, GridStream, mongoose, express, multer, ndoemon. Please
          understand that this is just an educational project. This website is
          is no way supported/funded/run by netflix or has any affiliation with
          netflix. To create an account you must agree to the following terms
          and conditions. I understand that my information may not be protected
          as this is an educational project. I understand that giving my
          personal information, such as credit card number, phone number, name
          etc "could" be leaked or stolen. I understand that all the information
          provided is not accurate and the developer may use this data in any
          way they intend. I understand that the payment section uses a fully
          working API, therefore, providing my payment information may lead to a
          charge on my account.
        </aside>
      </div>
    </footer>
  );
}

export default Footer;
