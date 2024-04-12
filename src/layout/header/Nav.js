import Link from "next/link";
import { Accordion } from "react-bootstrap";
import Menu from "./Menu";
const Nav = ({ singleMenu }) => {
  return (
    <nav className="main-menu navbar-expand-lg">
      <Accordion>
        <div className="navbar-header">
          {/* Toggle Button */}
          <Accordion.Toggle
            as={"button"}
            className="navbar-toggle"
            eventKey="navbar-collapse"
          >
            <img
              src="assets/images/icons/menu-warp.svg"
              alt="Toggler"
              style={{ height: "40px", margin: "30px" }}
            />
          </Accordion.Toggle>
        </div>
        <Accordion.Collapse
          eventKey="navbar-collapse"
          className="navbar-collapse clearfix"
        >
          <Menu singleMenu={singleMenu} />
        </Accordion.Collapse>
      </Accordion>
    </nav>
  );
};
export default Nav;
