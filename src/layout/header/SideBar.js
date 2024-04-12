import { Fragment } from "react";
const SideBar = () => {
  return (
    <Fragment>
      <div className="form-back-drop"></div>
      <section className="hidden-bar">
        <div className="inner-box text-center">
          <div className="cross-icon">
            <span className="fa fa-times" />
          </div>
          <div className="title">
            <h4>Early Access</h4>
          </div>
          {/*Appointment Form*/}
          <div className="appointment-form">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                document
                  .querySelector("body")
                  .classList.remove("side-content-visible");
              }}
            >
              <div className="form-group">
                <input
                  type="text"
                  name="text"
                  placeholder="Twitter ID"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="text"
                  placeholder="Merlin Address"
                  required
                />
              </div>
              <div className="form-group">
                <button type="submit" className="theme-btn">
                  JOIN NOW
                </button>
              </div>
            </form>
          </div>
          {/*Social Icons*/}
          <div className="social-style-one">
            <a href="https://twitter.com/MerlinRUNESTONE" target="_blank">
              <i className="fab fa-x-twitter" />
            </a>
            <a href="#" target="_blank">
              <i className="fa-regular fa-paper-plane" />
            </a>
            {/* <a href="#">
              <i className="fa-regular fa-envelope" />
            </a> */}
          </div>
        </div>
      </section>
    </Fragment>
  );
};
export default SideBar;
