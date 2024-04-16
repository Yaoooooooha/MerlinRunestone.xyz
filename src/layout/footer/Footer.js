import DefaultFooter from "./DefaultFooter";

const Footer = ({ footer, dark }) => {
  switch (footer) {
    case 0:
      return <DefaultFooter dark={dark} />;
    default:
      return <></>;
  }
};
export default Footer;
