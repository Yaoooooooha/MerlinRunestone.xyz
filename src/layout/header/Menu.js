import Link from "next/link";

import { Fragment, useState } from "react";
const Menu = ({ singleMenu }) => {
  return (
    <Fragment>
      <SingleMenu singleMenu={singleMenu} />
    </Fragment>
  );
};
export default Menu;

const SingleMenu = ({ singleMenu }) => {
  return singleMenu === "bid-page" ? (
    <ul className="navigation onepage clearfix">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/bid-rule">Bid Rule</Link>
      </li>
      {/* <li>
        <Link href="#faq">FAQs</Link>
      </li>
      <li>
        <Link href="#how-to-get-runestone">How to Get Runestone?</Link>
      </li> */}
      {/* <li>
        <a href="#">More</a>
      </li> */}
    </ul>
  ) : (
    <ul
      className="navigation onepage clearfix"
      onClick={(e) => {
        document.querySelector(".navbar-collapse").classList.remove("show");
      }}
    >
      <li>
        <a href="#home">Home</a>
      </li>
      <li>
        <a href="#about">About</a>
      </li>
      <li>
        <a href="#faq">FAQs</a>
      </li>
      <li>
        <a href="#how-to-get-runestone">How to Get Runestone?</a>
      </li>
      {/* <li>
        <a href="#">More</a>
      </li> */}
    </ul>
  );
};
