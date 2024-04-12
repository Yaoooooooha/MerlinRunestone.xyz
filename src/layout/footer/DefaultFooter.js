import Link from "next/link";

const DefaultFooter = ({ dark }) => {
  return (
    <footer
      className="main-footer rel z-1"
      style={{
        backgroundImage: "url(assets/images/footer/footer-bg-shape.png)",
      }}
    >
      <div className="container container-1290">
        <div className="footer-top pt-20 pb-10">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="footer-logo mb-20 wow fadeInRight delay-0-2s animated">
                <Link legacyBehavior href="/">
                  <a>
                    <img
                      src={"assets/images/logos/footer-logo.png"}
                      alt="Logo"
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-lg-8 text-lg-end">
              <div className="social-style-four mb-20 wow fadeInLeft delay-0-2s animated">
                <a href="https://twitter.com/MerlinRUNESTONE" target="_blank">
                  <i className="fab fa-x-twitter" /> <span>Twitter</span>
                </a>
                <a href="#" target="_blank">
                  <i className="fa-regular fa-paper-plane" />
                  <span>Telegram</span>
                </a>
                {/* <a href="#" target="_blank">
                  <i className="fa-regular fa-envelope" /> <span>Email</span>
                </a> */}
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-6">
              <div className="footer-bottom-menu pt-30 pb-35 rpb-0 wow fadeInRight delay-0-2s animated">
                <ul>
                  <li>
                    <a legacyBehavior href="#home">
                      Home
                    </a>
                  </li>
                  <li>
                    <a legacyBehavior href="#about">
                      <a>About</a>
                    </a>
                  </li>
                  <li>
                    <a legacyBehavior href="#faqs">
                      <a>FAQs</a>
                    </a>
                  </li>
                  <li>
                    <a legacyBehavior href="#how-to-get-runestone">
                      How To Get Runestone
                    </a>
                  </li>
                  <li>
                    <a legacyBehavior href="#">
                      More
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6">
              <div className="copyright-text text-lg-end pt-40 pb-35 rpt-10 wow fadeInLeft delay-0-2s animated">
                <p>
                  Copyright @2024,
                  <br />
                  <Link legacyBehavior href="/">
                    <a>Merlin RUNESTONE</a>
                  </Link>{" "}
                  All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default DefaultFooter;
