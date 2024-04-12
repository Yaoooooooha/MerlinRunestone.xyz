import Link from "next/link";
import Nav from "./Nav";
const Header2 = ({ singleMenu, dark }) => {
  return (
    <header className="main-header menu-absolute">
      {/*Header-Upper*/}
      <div className="header-upper">
        <div
          className="container container-1620 clearfix"
          style={{ padding: 0 }}
        >
          <div
            className="header-inner rpy-10 rel d-flex align-items-center"
            style={{ justifyContent: "space-between" }}
          >
            {/* <div className="logo-outer">
              <div className="logo">
                <Link legacyBehavior href="/">
                  <a>
                    <img
                      src={"assets/images/logos/logo.png"}
                      alt="Logo"
                      title="Logo"
                    />
                  </a>
                </Link>
              </div>
            </div> */}
            <div className="nav-outer  clearfix">
              {/* Main Menu */}
              <Nav singleMenu={singleMenu} />
              {/* Main Menu End*/}
            </div>
            {/* Menu Button */}
            <div className="menu-btns">
              <a legacyBehavior href="#">
                <a className="theme-btn style-two me-4 coming-soon">
                  <p style={{ margin: 0 }}>GET RUNESTON</p>

                  <p
                    className="coming-soon-p"
                    style={{ margin: 0, display: "none" }}
                  >
                    COMING SOON
                  </p>
                  <i className="fa fa-arrow-right" />
                </a>
              </a>
              {/* menu sidbar */}
              {/* <div className="menu-sidebar">
                <button className="bg-transparent">
                  <img
                    src="assets/images/icons/rigister.svg"
                    alt="Toggler"
                    style={{ height: "30px", margin: "30px" }}
                  />
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {/*End Header Upper*/}
    </header>
  );
};
export default Header2;
