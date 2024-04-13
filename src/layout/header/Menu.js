import Link from "next/link";

import { Fragment, useState } from "react";
const Menu = () => {
  return (
    <Fragment>
      <SingleMenu />
    </Fragment>
  );
};
export default Menu;

const SingleMenu = () => {
  return (
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
