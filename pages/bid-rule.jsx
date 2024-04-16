import { useState } from "react";
import Layout from "@/src/layout/Layout";
import Link from "next/link";
import { Nav, Tab } from "react-bootstrap";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/src/config/config";
import { useAccount } from "wagmi";

const ProductDetails = () => {
  const { address } = useAccount();

  const todayItem = {
    title: "RUNEROCK #1",
    image: "assets/images/bid/today-item.jpeg",
    category: {
      theme: "Classic",
      style: "Pixel",
      charater: "None",
    },
    price: "Highest Bid：",
    status: "In Progress",
  };
  const yesterdayItem = {
    title: "RUNEROCK #0",
    image: "assets/images/bid/yesterday-item.jpeg",
    category: {
      theme: "Classic",
      style: "Pixel",
      charater: "Owl",
    },
    price: "Sold Price：",
    status: "Sold",
  };
  const tommorowItem = {
    title: "RUNEROCK #2",
    image: "assets/images/bid/tommorow-item.jpeg",
    category: {
      theme: "Classic",
      style: "Pixel",
      charater: "Merlin",
    },
    price: "Start Price：",
    status: "Preparing",
  };

  const [selectedItem, setSelectedItem] = useState(todayItem);
  const selectHandler = (item) => {
    if (item === "yesterday-item") {
      setSelectedItem(yesterdayItem);
    } else if (item === "today-item") {
      setSelectedItem(todayItem);
    } else if (item === "tommorow-item") {
      setSelectedItem(tommorowItem);
    }
  };

  return (
    <Layout header={1} singleMenu footer={1} dark>
      {/* Product Details Start */}
      <section className="product-details pt-130 rpt-100 rel z-1">
        <div className="container container-1290">
          <Tab.Container defaultActiveKey={"details"}>
            <Nav className="nav product-information-tab mt-80 mb-25 wow fadeInUp delay-0-2s">
              <li>
                <Nav.Link as="a" eventKey="details" href="#details">
                  Description <i className="far fa-arrow-right" />
                </Nav.Link>
              </li>
              <li>
                <Nav.Link as="a" eventKey="information" href="#information">
                  Reviews <i className="far fa-arrow-right" />
                </Nav.Link>
              </li>
            </Nav>
            <Tab.Content className="tab-content pb-30 wow fadeInUp delay-0-2s">
              <Tab.Pane className="tab-pane fade" eventKey="details">
                <p>
                  Must explain to you how all this mistaken idea of denouncing
                  pleasure and praising pain was born and I will give you a
                  complete account of the system, and expound the actual
                  teachings of the great explorer of the truth, the
                  master-builder of human happiness. No one rejects, dislikes,
                  or avoids pleasure itself, because it is pleasure, but because
                  those who do not know how to pursue pleasure rationally
                  encounter consequences that are extremely painful. Nor again
                  is there anyone who loves or pursues or desires to obtain pain
                  of itself, because it is pain, but because occasionally
                </p>
                <br />
                <h4>Additional information</h4>
                <p>
                  Circumstances occur in which toil and pain can procure him
                  some great pleasure. To take a trivial example, which of us
                  ever undertakes laborious physical exercise, except to obtain
                  some advantage from it? But who has any right to find fault
                  with a man who chooses
                </p>
                <ul className="list-style-three pt-10">
                  <li>Graphic Design</li>
                  <li>3D Illustrations Design</li>
                  <li>Dashboard Design</li>
                </ul>
              </Tab.Pane>
              <Tab.Pane className="tab-pane fade" eventKey="information">
                <p>
                  Now wherever you are, wherever you are, you can easily monitor
                  your CCTV videos through your mobile, tab, laptop or PC. With
                  the wireless camera, you can view the camera from your mobile
                  or computer to the right-left 0 to 360-degree video. Cover the
                  flower room with a camera.
                </p>
                <ul className="list-style-two my-15">
                  <li>Wide Angle and Long Length</li>
                  <li>Smart zooming point</li>
                  <li>HD quality video output.</li>
                  <li>Smart Alarming System</li>
                </ul>
                <p>
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                  amet, consectetur, adipisci velit, sed quia non numquam
                </p>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </section>
    </Layout>
  );
};
export default ProductDetails;
