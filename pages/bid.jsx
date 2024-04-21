import { useState, useEffect } from "react";
import Layout from "@/src/layout/Layout";
import { Nav, Tab } from "react-bootstrap";
import {
  RUNEROCK_CONTRACT_ADDRESS,
  RUNEROCK_CONTRACT_ABI,
} from "@/src/config/runerockConfig";
import {
  AUCTION_CONTRACT_ADDRESS,
  AUCTION_CONTRACT_ABI,
} from "@/src/config/runerockAuctionConfig";
import { useAccount } from "wagmi";
import { useEthersSigner } from "@/src/config/ethersSigner";
import { ethers } from "ethers";

const ProductDetails = () => {
  const { address } = useAccount();
  const signer = useEthersSigner(); // `useSigner` hook from wagmi to get the connected signer
  // 提示訊息
  const [msg, setMsg] = useState(null);
  const [msgStyle, setMsgStyle] = useState({});
  const [isWhitelisted, setIsWhitelisted] = useState(true); // Assume initially whitelisted

  useEffect(() => {
    const verifyWhitelist = async () => {
      if (address) {
        try {
          const response = await fetch("/api/verifyWhitelist", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              evmAddress: address.toLowerCase(),
            }),
          });

          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          const data = await response.json();
          // setIsWhitelisted(response); // Update whitelisted state based on backend response
          console.log("Whitelisted:", response);
          console.log("data:", data);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      }
    };
    verifyWhitelist();
  }, [address]);

  // 處理訊息的函數
  const displayMsg = (noError, message) => {
    const color = noError ? "rgba(0, 255, 0, 0.651)" : "rgba(255, 0, 0, 0.651)";
    setMsgStyle({ color });
    setMsg(message);
    setTimeout(() => {
      setMsg(null);
    }, 5000); // Error message disappears after 5 seconds
  };

  const todayItem = {
    title: "RUNEROCK #1",
    image: "assets/images/bid/today-item.jpeg",
    price: "Now Price",
    startTime: "4/20 00:00 UTC",
    remainTime: "Ends In",
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
    startTime: "4/21 00:00 UTC",
    remainTime: "Start In",
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

  // Inside your Next.js component
  const currentBid = 0; // Replace with the current bid amount from the contract
  // Inside your Next.js component
  const [enteredBid, setEnteredBid] = useState(0);

  useEffect(() => {
    // Fetch and set the initial bid price, e.g., from an API
    const initialBidPrice = fetchInitialBidPrice(); // Replace with your fetch logic
    setEnteredBid(initialBidPrice);
  }, []);

  // const handleBidChange = (event) => {
  //   // 給用戶一些時間更改
  //   setTimeout(() => {
  //     const newBid = parseFloat(event.target.value);
  //     if (!checkBidValid(newBid)) {
  //       event.target.value = (currentBid + 0.0005).toFixed(4); // 輸入無效，恢復預設值
  //     }
  //   }, 5000);
  // };

  // const checkBidValid = (bidValue) => {
  //   if (bidValue < currentBid + 0.0005) {
  //     displayMsg(0, "Must be at least 0.0005 BTC higher");
  //     return false;
  //   } else {
  //     setEnteredBid(bidValue); // Update the current bid amount in the component state
  //     return true;
  //   }
  // };

  // Function to fetch the initial bid price
  const fetchInitialBidPrice = () => {
    // Fetch the initial bid price, e.g., from an API
    return 0.0005;
  };

  const takeBid = async () => {
    if (signer && address) {
      const contract = new ethers.Contract(
        AUCTION_CONTRACT_ADDRESS,
        AUCTION_CONTRACT_ABI,
        signer
      );

      let gasEstimate;
      let hasGasEstimate;
      try {
        gasEstimate = await contract.estimateGas.takeBid({
          value: ethers.utils.parseEther("0.001"),
        }); // Assuming mint function requires address and quantity
        console.log(`Estimated gas: ${gasEstimate.toString()}`);
        hasGasEstimate = true;
      } catch (e) {
        console.error("Error estimating gas:", e);
        if (
          e.message ===
          'insufficient funds for intrinsic transaction cost [ See: https://links.ethers.org/v5-errors-INSUFFICIENT_FUNDS ] (error={"code":-32000,"message":"insufficient funds for gas * price + value"}, method="estimateGas", transaction={"from":"0xe8c954E7f2e060618d9734D438670246e0dBEB2E","to":"0xdDA7f85Bf98b64933C58F4D4Df9E3C78686e6071","value":{"type":"BigNumber","hex":"0x048c27395000"},"data":"0xd204c45e000000000000000000000000e8c954e7f2e060618d9734d438670246e0dbeb2e000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000076170692f61706900000000000000000000000000000000000000000000000000","accessList":null}, code=INSUFFICIENT_FUNDS, version=providers/5.7.2)'
        ) {
          displayMsg(
            0,
            "Insufficient funds. Please add more funds to your wallet."
          ); // Display error message}
        } else {
          displayMsg(0, e.message); // Display error message}
        }
      }

      try {
        const txResponse = await contract.takeBid({
          value: ethers.utils.parseEther("0.001"),
          gasLimit: Math.floor(
            parseInt(ethers.utils.hexlify(gasEstimate), 16) * 1.2
          ),
          // gasPrice:
          //   ethers.utils.parseUnits(ethers.utils.hexlify(gasEstimate), "gwei") *
          //   1.5,
          // value: ethers.utils.parseEther("0.000005"),
        }); // Assuming mint function requires address and quantity
        await txResponse.wait(); // Wait for transaction to be mined
        console.log("Minting successful");
        displayMsg(1, "Minting successful");
      } catch (e) {
        console.error("Error minting token:", e);
        // 如果在 estimateGas 中出現錯誤訊息，則不會進入到這裡，因此需要額外處理
        hasGasEstimate && displayMsg(0, e.message);
      }
    }
  };

  return (
    <Layout header={1} singleMenu footer={1} dark>
      {/* Product Details Start */}
      <section className="product-details rel z-1">
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
              {selectedItem.status === "Sold"
                ? selectedItem.owner
                : "Auction Status"}
              <br />
              <span className="price">0x0</span>
            </div>
            <div className="ratting-price mb-15">
              {selectedItem.remainTime}
              <br />
              <span className="price">1 hr</span>
            </div>
            {selectedItem.status === "In Progress" && (
              <form action="#" className="add-to-cart pt-35">
                {/* <div className="bid-input">
                  <input
                    type="number"
                    step="0.0005"
                    min="0"
                    onChange={handleBidChange}
                    defaultValue={enteredBid}
                  />
                  <span className="btc-unit">BTC</span>
                </div> */}
                <button
                  type="button"
                  className="theme-btn style-two"
                  onClick={takeBid}
                  // disabled={true}
                >
                  Take the Bid{" "}
                  <i
                    className="fa-solid fa-gavel"
                    style={{ transform: "rotate(0deg)" }}
                  />
                </button>
                {msg && (
                  <div className="msg-popup" style={msgStyle}>
                    {" "}
                    {/* Display error message in a popup */}
                    <p style={{ margin: "0", width: "100%" }}>{msg}</p>
                  </div>
                )}
              </form>
            )}
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
      {msg && (
        <div className="msg-popup" style={msgStyle}>
          {" "}
          {/* Display error message in a popup */}
          <p style={{ margin: "10px 20px", width: "100%" }}>{msg}</p>
        </div>
      )}
    </Layout>
  );
};
export default ProductDetails;
