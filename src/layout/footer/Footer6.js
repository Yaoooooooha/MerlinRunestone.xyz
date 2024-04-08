import Link from "next/link";

const Footer6 = ({ dark }) => {
  return (
    <footer className="main-footer footer-six pt-80">
      <div className="container">
        <div className="copyright-area rel mt-25 pt-35 pb-25">
          <div className="row">
            <div className="col-lg-6">
              <div className="footer-copyright-text wow fadeInUp delay-0-2s">
                <p>
                  Copyright @2024, <Link href="/">MerlinHats</Link> All Rights
                  Reserved
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="footer-bottom-social text-lg-end wow fadeInRight delay-0-2s">
                <div className="social-style-two">
                  <a href="#">
                    <i className="fab fa-twitter" />
                  </a>
                  <a href="#">
                    <i className="fab fa-telegram" />
                  </a>
                  <a href="#">
                    <i className="fas fa-envelope" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Scroll Top Button */}
          <button className="scroll-top scroll-to-target" data-target="html">
            <span className="far fa-chevron-double-up" />
          </button>
        </div>
      </div>
    </footer>
  );
};
export default Footer6;
