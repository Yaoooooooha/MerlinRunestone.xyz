import DefaultFooter from "./DefaultFooter";

const Footer = ({ footer, dark }) => {
  switch (footer) {
    default:
      return <DefaultFooter dark={dark} />;
  }
};
export default Footer;
