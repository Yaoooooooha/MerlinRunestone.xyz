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
    price: "Highest Bid",
    owner: "Bid By",
    startTime: "4/20 00:00 UTC",
    remainTime: "Auction Ends In",
    status: "In Progress",
  };
  const yesterdayItem = {
    title: "RUNEROCK #0",
    image: "assets/images/bid/yesterday-item.jpeg",
    price: "Sold Price",
    owner: "Owned By",
    startTime: "4/19 00:00 UTC",
    remainTime: "Auction Ends At",
    status: "Sold",
  };
  const tommorowItem = {
    title: "RUNEROCK #2",
    image: "assets/images/bid/tommorow-item.jpeg",
    price: "Start Price",
    owner: "Owned By",
    startTime: "4/21 00:00 UTC",
    remainTime: "Auction Start In",
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
      <section className="product-details rel z-1">
        <div className="container container-1290">
          <div className="row  gap-70">
            <div className="col-lg-6 bid-image">
              <Tab.Container defaultActiveKey={"today-item"}>
                <div className="product-details-images rmb-55 wow fadeInLeft delay-0-2s">
                  <Tab.Content className="tab-content preview-images">
                    <Tab.Pane
                      className="tab-pane fade preview-item"
                      eventKey="yesterday-tiem"
                    >
                      <img src={selectedItem.image} alt="yesterday-tiem" />
                    </Tab.Pane>
                    <Tab.Pane
                      className="tab-pane fade preview-item"
                      eventKey="today-item"
                    >
                      <img src={selectedItem.image} alt="today-item" />
                    </Tab.Pane>
                    <Tab.Pane
                      className="tab-pane fade preview-item"
                      eventKey="tommorow-item"
                    >
                      <img src={selectedItem.image} alt="tommorow-item" />
                    </Tab.Pane>
                  </Tab.Content>
                  <Nav className="nav thumb-images rmb-20">
                    <Nav.Link
                      as="a"
                      href="#yesterday-tiem"
                      eventKey="yesterday-tiem"
                      className="thumb-item"
                      onClick={() => selectHandler("yesterday-item")}
                    >
                      Last Sold
                    </Nav.Link>
                    <Nav.Link
                      as="a"
                      href="#today-item"
                      eventKey="today-item"
                      className="thumb-item"
                      onClick={() => selectHandler("today-item")}
                    >
                      In Auction
                    </Nav.Link>
                    <Nav.Link
                      as="a"
                      href="#tommorow-item"
                      eventKey="tommorow-item"
                      className="thumb-item"
                      onClick={() => selectHandler("tommorow-item")}
                    >
                      Next Item
                    </Nav.Link>
                  </Nav>
                </div>
              </Tab.Container>
            </div>
            <div className="col-lg-6 bid-info">
              <div className="product-details-content wow fadeInRight delay-0-2s">
                <div className="section-title">
                  <h2>{selectedItem.title}</h2>
                </div>
                <div className="ratting-price mb-15">
                  {selectedItem.price}
                  <br />
                  <span className="price">0.2 BTC</span>
                </div>
                <div className="ratting-price mb-15">
                  {selectedItem.owner}
                  <br />
                  <span className="price">0x0</span>
                </div>
                <div className="ratting-price mb-15">
                  {selectedItem.remainTime}
                  <br />
                  <span className="price">1 hr</span>
                </div>
                <form action="#" className="add-to-cart pt-35">
                  <input
                    type="number"
                    min={1}
                    max={20}
                    onchange="if(parseInt(this.value,10)<10)this.value='0'+this.value;"
                    required
                  />
                  <button type="submit" className="theme-btn style-two">
                    Place Your Bids <i className="far fa-arrow-right" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Product Details End */}
      {/* Related Products Area start */}
      {/* <section className="related-products pt-90 rpt-50 pb-100 rpb-70 rel z-1">
        <div className="container container-1290">
          <div className="product-title mb-55 text-center wow fadeInUp delay-0-2s">
            <h3>Related Products</h3>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="product-item wow fadeInUp delay-0-2s">
                <div className="image">
                  <img
                    src="assets/images/products/product1.jpg"
                    alt="Product"
                  />
                </div>
                <div className="content">
                  <a className="category" href="#">
                    Product Design
                  </a>
                  <h5>
                    <Link legacyBehavior href="/product-details">
                      Creative Web Page Design
                    </Link>
                  </h5>
                  <div className="ratting-price">
                    <div className="ratting">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <span className="price">$593</span>
                    </div>
                  </div>
                  <a href="#" className="theme-btn style-two">
                    Add to Cart <i className="far fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product-item wow fadeInUp delay-0-4s">
                <div className="image">
                  <img
                    src="assets/images/products/product2.jpg"
                    alt="Product"
                  />
                </div>
                <div className="content">
                  <a className="category" href="#">
                    Product Design
                  </a>
                  <h5>
                    <Link legacyBehavior href="/product-details">
                      Task Management Dashboard
                    </Link>
                  </h5>
                  <div className="ratting-price">
                    <div className="ratting">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <span className="price">$640</span>
                    </div>
                  </div>
                  <a href="#" className="theme-btn style-two">
                    Add to Cart <i className="far fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="product-item wow fadeInUp delay-0-6s">
                <div className="image">
                  <img
                    src="assets/images/products/product3.jpg"
                    alt="Product"
                  />
                </div>
                <div className="content">
                  <a className="category" href="#">
                    Product Design
                  </a>
                  <h5>
                    <Link legacyBehavior href="/product-details">
                      3D Illustration Design
                    </Link>
                  </h5>
                  <div className="ratting-price">
                    <div className="ratting">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <span className="price">$986</span>
                    </div>
                  </div>
                  <a href="#" className="theme-btn style-two">
                    Add to Cart <i className="far fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* Related Products Area end */}
      {/* footer area start */}
    </Layout>
  );
};
export default ProductDetails;
