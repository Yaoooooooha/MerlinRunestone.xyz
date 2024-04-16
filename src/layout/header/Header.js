import { stickyNav } from "@/src/utils";
import { useEffect } from "react";
import DefaultHeader from "./DefaultHeader";
import ConnectWalletHeader from "./ConnectWalletHeader";

const Header = ({ header, singleMenu, dark }) => {
  useEffect(() => {
    stickyNav();
  }, []);

  switch (header) {
    case 0:
      return <DefaultHeader singleMenu={singleMenu} dark={dark} />;
    case 1:
      return <ConnectWalletHeader singleMenu={"bid-page"} dark={dark} />;
    default:
      return <></>;
  }
};
export default Header;
