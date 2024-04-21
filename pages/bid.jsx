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
  // 提示訊息
  const [msg, setMsg] = useState(null);
  const [msgStyle, setMsgStyle] = useState({});

  // 處理訊息的函數
  const displayMsg = (noError, message) => {
    const color = noError ? "rgba(0, 255, 0, 0.651)" : "rgba(255, 0, 0, 0.651)";
    setMsgStyle({ color });
    setMsg(message);
    setTimeout(() => {
      setMsg(null);
    }, 5000); // Error message disappears after 5 seconds
  };

  const { address } = useAccount();
  const signer = useEthersSigner(); // `useSigner` hook from wagmi to get the connected signer
  const merlinRPC = "https://testnet-rpc.merlinchain.io";
  const provider = new ethers.providers.JsonRpcProvider(merlinRPC);
  const auctionContract = new ethers.Contract(
    AUCTION_CONTRACT_ADDRESS,
    AUCTION_CONTRACT_ABI,
    provider
  );
  const runeContract = new ethers.Contract(
    RUNEROCK_CONTRACT_ADDRESS,
    RUNEROCK_CONTRACT_ABI,
    provider
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 确保代码在客户端执行
      const onBidTaken = async (bidTaker, price, event) => {
        console.log("Bid taken by", bidTaker, "for", price, "wei");
        const now = Date.now();
        const date = new Date(now);
        let nextStartTime = await getStartTime();
        let nextMintId = await getNextMintId();
        let startPrice = await getStartPrice();
        let auctionDuration = await getAuctionDuration();

        setItemList([
          {
            title: itemList[1].title,
            image: itemList[1].image,
            priceTitle: "Sold Price",
            price: price,
            ownerTitle: "Owned By",
            owner: bidTaker,
            remainTimeTitle: "Auction Ends At",
            remainTime: `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${
              date.getUTCDate() +
              " " +
              date.getUTCHours() +
              ":" +
              (date.getUTCMinutes().toString().length === 1
                ? "0" + date.getUTCMinutes()
                : date.getUTCMinutes())
            } UTC`,
            status: "Sold",
          },
          {
            title: itemList[2].title,
            image: itemList[2].image,
            priceTitle: "Now Price",
            price: startPrice,
            startTime: nextStartTime,
            remainTimeTitle: "Ends In",
            remainTime: "代訂",
            status: "In Progress",
          },
          {
            title: "RUNEROCK #" + nextMintId.toString(),
            image: "assets/images/bid/" + nextMintId.toString() + ".png",
            priceTitle: "Minimum Start Price",
            price: 0.001,
            startTime: nextStartTime + auctionDuration,
            remainTimeTitle: "Starts In",
            remainTime: "代訂",
            status: "Preparing",
          },
        ]);
      };

      auctionContract.on("BidTaken", onBidTaken);

      // 清除事件监听器
      return () => {
        auctionContract.off("BidTaken", onBidTaken);
      };
    }
  }, []);
  const getStartTime = async () => {
    try {
      const result = await auctionContract.auctionStartTime();
      return result.toNumber();
    } catch (err) {
      console.error("Error fetching data from the smart contract:", err);
    }
  };
  const getNextMintId = async () => {
    try {
      const result = await runeContract.nextMintId();
      console.log("nextMintId:", result.toNumber());
      return result.toNumber();
    } catch (err) {
      console.error("Error fetching data from the smart contract:", err);
    }
  };
  const getStartPrice = async () => {
    try {
      const result = await runeContract.startPrice();
      console.log("startPrice:", result.toNumber());
      return result.toNumber();
    } catch (err) {
      console.error("Error fetching data from the smart contract:", err);
    }
  };
  const getAuctionDuration = async () => {
    try {
      const result = await auctionContract.auctionDuration();
      console.log("auctionDuration:", result.toNumber());
      return result.toNumber();
    } catch (err) {
      console.error("Error fetching data from the smart contract:", err);
    }
  };

  const [currentPrice, setCurrentPrice] = useState(0.001); // 默认状态
  const getCurrentPrice = async () => {
    try {
      const result = await auctionContract.getCurrentPrice();
      return result.toNumber(); // 返回当前价格
    } catch (err) {
      console.error("Error fetching data from the smart contract:", err);
    }
  };
  const fetchCurrentPrice = async () => {
    const price = await getCurrentPrice();
    setCurrentPrice(price / 10 ** 18); // 返回当前价格
  };
  useEffect(() => {
    fetchCurrentPrice();
  });

  const [itemList, setItemList] = useState([
    {
      title: "",
      image: "",
      priceTitle: "Sold Price",
      price: "",
      ownerTitle: "Owned By",
      owner: "",
      remainTimeTitle: "Auction Ends At",
      remainTime: "",
      status: "Sold",
    },
    {
      title: "RUNEROCK #11",
      image: "assets/images/bid/11.png",
      priceTitle: "Now Price",
      price: currentPrice,
      startTime: 1713808800,
      remainTimeTitle: "Ends In",
      remainTime: "代訂",
      status: "In Progress",
    },

    {
      title: "RUNEROCK #12",
      image: "assets/images/bid/12.png",
      priceTitle: "Minimum Start Price",
      price: 0.001,
      startTime: 1713895200,
      remainTimeTitle: "Starts In",
      remainTime: "代訂",
      status: "Preparing",
    },
  ]);

  const yesterdayItem = itemList[0];
  const todayItem = itemList[1];
  const tommorowItem = itemList[2];

  const [selectedItem, setSelectedItem] = useState(todayItem);
  const [auctionStatus, setAuctionStatus] = useState("Preparing"); // 默认状态
  const selectHandler = (item) => {
    if (item === "yesterday-item") {
      setSelectedItem(yesterdayItem);
    } else if (item === "today-item") {
      setSelectedItem(todayItem);
    } else if (item === "tommorow-item") {
      setSelectedItem(tommorowItem);
    }
  };
  // 用來處理 selectItem 的 auctionStatus
  useEffect(() => {
    const fetchAuctionStatus = async () => {
      if (selectedItem.status === "Sold") {
        setAuctionStatus(selectedItem.owner);
      } else if (selectedItem.status === "Preparing") {
        setAuctionStatus("Preparing");
      } else {
        // 异步检查拍卖是否进行中
        const isLive = await checkAuctionIsLive();
        setAuctionStatus(isLive ? "In Progress" : "Preparing");
      }
    };

    fetchAuctionStatus();
  }, [selectedItem]); // 当 selectedItem 更改时重新执行

  const checkIsPrivateSale = async () => {
    try {
      const result = await auctionContract.isPrivateSale(); // 替換為你的函數名稱
      return result;
    } catch (err) {
      console.error("Error fetching data from the smart contract:", err);
    }
  };
  const [isWhitelisted, setIsWhitelisted] = useState(true); // Assume initially whitelisted
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
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        setIsWhitelisted(data.whitelistStatus);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
  };
  useEffect(() => {
    // 定义一个异步函数内部执行异步操作
    const checkAndVerify = async () => {
      // 如果是 PrivateSale 就要确认用户是否是白名单
      if (await checkIsPrivateSale()) {
        verifyWhitelist();
      }
    };
    // 调用异步函数
    checkAndVerify();
  }, [address]);

  const [auctionLive, setAuctionLive] = useState(false); // 默认状态
  const checkAuctionIsLive = async () => {
    try {
      const result = await auctionContract.auctionIsLive();
      return result;
    } catch (err) {
      console.error("Error fetching data from the smart contract:", err);
    }
  };
  const fetchAuctionLive = async () => {
    const isLive = await checkAuctionIsLive();
    setAuctionLive(isLive);
  };
  useEffect(() => {
    fetchAuctionLive();
  });

  console.log(auctionLive, isWhitelisted);

  const takeBid = async () => {
    fetchAuctionLive(); // 刷新 auctionLive 状态
    if (auctionLive) {
      fetchCurrentPrice(); // 刷新 currentPrice 状态
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
            value: ethers.utils.parseEther(currentPrice.toString()),
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
              {selectedItem.priceTitle}
              <br />
              <span className="price">{selectedItem.price} BTC</span>
            </div>
            <div className="ratting-price mb-15">
              {selectedItem.status === "Sold"
                ? selectedItem.ownerTitle
                : "Auction Status"}
              <br />
              <span className="price">{auctionStatus}</span>
            </div>
            <div className="ratting-price mb-15">
              {selectedItem.remainTimeTitle}
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
                  disabled={!auctionLive || !isWhitelisted}
                >
                  <p
                    style={
                      isWhitelisted ? { margin: "0" } : { display: "none" }
                    }
                  >
                    Take the Bid
                  </p>
                  <p
                    style={
                      isWhitelisted ? { display: "none" } : { margin: "0" }
                    }
                  >
                    NOT WHITELISTED
                  </p>
                  <i
                    className="fa-solid fa-gavel"
                    style={
                      isWhitelisted
                        ? { transform: "rotate(0deg)" }
                        : { display: "none" }
                    }
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
