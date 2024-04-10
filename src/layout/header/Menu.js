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
    <ul className="navigation onepage clearfix">
      <li>
        <a href="#home">Home</a>
      </li>
      <li>
        <a href="#about">About</a>
      </li>
      <li>
        <a href="#services">FQA</a>
      </li>
      <li>
        <a href="#pricing">How to Get Runestone?</a>
      </li>
      <li>
        <a href="#news">Discover More</a>
      </li>
    </ul>
  );
};
