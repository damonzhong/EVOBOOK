import React from "react";

const Footer = () => {
  return (
    <footer className="App-footer">
      <div className="footerBlock">
        <div className="footerTitle">
          <p>Company</p>
        </div>
        <div className="footerLinks">
          <a href="/Construction">About Us</a>
          <a href="/Construction">Blog</a>
        </div>
      </div>

      <div className="footerBlock">
        <div className="footerTitle">
          <p>Product</p>
        </div>
        <div className="footerLinks">
          <a href="/Construction">Features</a>
          <a href="/Construction">Pricing</a>
          <a href="/Register">Sign Up</a>
          <a href="/Login">Log in</a>
        </div>
      </div>

      <div className="footerBlock">
        <div className="footerTitle">
          <p>Support</p>
        </div>
        <div className="footerLinks">
          <a href="/Construction">FAQ</a>
          <a href="/Construction">Contact</a>
          <a href="/Construction">Terms of Use</a>
          <a href="/Construction">Privacy Policy</a>
        </div>
      </div>

      <div className="footerBlock">
        <div className="footerTitle">
          <p>Follow Us!</p>
        </div>
        <div className="footerLinks">
          <a href="http://www.facebook.com">Facebook</a>
          <a href="http://www.twitter.com">Twitter</a>
          <a href="http://www.instagram.com">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
