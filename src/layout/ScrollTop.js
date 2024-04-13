import { useEffect } from "react";
import { scrollTopFun } from "../utils";

const ScrollTop = () => {
  useEffect(() => {
    scrollTopFun();
  }, []);
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button className="scroll-top scroll-to-target" onClick={() => scrollTop()}>
      <span className="fas fa-angle-double-up" style={{ color: "black" }} />
    </button>
  );
};
export default ScrollTop;
