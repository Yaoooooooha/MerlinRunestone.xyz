import { useState, useEffect, use } from "react";
import Layout from "@/src/layout/Layout";
import { Nav, Tab } from "react-bootstrap";
import EventCountdown from "@/src/components/Countdown";
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
    const backgroundColor = noError ? "#aadac4aa" : "#7877cbaa";
    setMsgStyle({ backgroundColor });
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

  // 每次渲染時都要抓取下一個 mintId
  const [nextMintId, setNextMintId] = useState(11);
  const getNextMintId = async () => {
    try {
      const result = await runeContract.nextMintId();
      setNextMintId(result.toNumber());
      console.log("nextMintId:", result.toNumber());
      return result.toNumber();
    } catch (err) {
      console.error("Error fetching data from the smart contract:", err);
    }
  };
  useEffect(() => {
    getNextMintId();
  });
  console.log("nextMintId:", nextMintId);
  // 每次渲染時都要抓取 startPrice
  const [startPrice, setStartPrice] = useState(0.001);
  const getStartPrice = async () => {
    try {
      const result = await auctionContract.startPrice();
      setStartPrice(result.toNumber() / 10 ** 18);
      console.log("startPrice:", result.toNumber() / 10 ** 18);
      return result.toNumber() / 10 ** 18;
    } catch (err) {
      console.error("Error fetching data from the smart contract:", err);
    }
  };
  useEffect(() => {
    getStartPrice();
  });
  console.log("startPrice:", startPrice);
  // 初次渲染時都要抓取 auctionStartTime
  const [auctionStartTime, setAuctioStartTime] = useState(0);
  const getStartTime = async () => {
    try {
      const result = await auctionContract.auctionStartTime();
      setAuctioStartTime(result.toNumber());
      return result.toNumber();
    } catch (err) {
      console.error("Error fetching data from the smart contract:", err);
    }
  };
  useEffect(() => {
    getStartTime();
  }, []);
  console.log("auctionStartTime:", auctionStartTime);
  // 初次渲染時都要抓取 auctionDuration
  const [auctionDuration, setAuctionDuration] = useState(0);
  const getAuctionDuration = async () => {
    try {
      const result = await auctionContract.auctionDuration();
      setAuctionDuration(result.toNumber());
      return result.toNumber();
    } catch (err) {
      console.error("Error fetching data from the smart contract:", err);
    }
  };
  useEffect(() => {
    getAuctionDuration();
  }, []);
  console.log("auctionDuration:", auctionDuration);
  // 可以存在資料庫，Deafult 從資料庫抓，才不會重整就消失
  const [bidTaker, setBidTaker] = useState(null);
  const [soldPrice, setSoldPrice] = useState(null);
  const [soldTime, setSoldTime] = useState(null);
  const [isSold, setIsSold] = useState(false);
  const minimumStartPrice = 0.001;
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 确保代码在客户端执行
      const onBidTaken = async (bidTaker, price, event) => {
        bidTaker = bidTaker.toString();
        price = price.toNumber();
        console.log("Bid taken by", bidTaker, "for", price, "wei");
        console.log(event);
        setIsSold(true);
        setBidTaker(bidTaker.slice(0, 8) + "..." + bidTaker.slice(-6));
        setSoldPrice(price / 10 ** 18);

        const now = Date.now();
        const date = new Date(now);
        setSoldTime(
          `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${
            date.getUTCDate() +
            " " +
            date.getUTCHours() +
            " : " +
            (date.getUTCMinutes().toString().length === 1
              ? "0" + date.getUTCMinutes()
              : date.getUTCMinutes()) +
            " : " +
            (date.getUTCSeconds().toString().length === 1
              ? "0" + date.getUTCSeconds()
              : date.getUTCSeconds())
          } UTC`
        );

        if (price <= minimumStartPrice) {
          setStartPrice(minimumStartPrice);
        } else {
          setStartPrice(price * 2);
        }
      };

      auctionContract.on("BidTaken", onBidTaken);

      // 清除事件监听器
      return () => {
        auctionContract.off("BidTaken", onBidTaken);
      };
    }
  }, []);

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
  // 每間隔一段時間就重新抓取一次 currentPrice
  const [countdownEnd, setCountdownEnd] = useState(false);
  useEffect(() => {
    const refreshPrice = setInterval(() => {
      fetchCurrentPrice();
      console.log("Current price refreshed");
    }, 90000); // 1.5 分钟刷新一次
    return () => clearInterval(refreshPrice);
  }, []);

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
  }, []);

  console.log("auctionLive:", auctionLive, isWhitelisted);

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
            value: ethers.utils.parseEther(currentPrice.toString()),
          }); // Assuming mint function requires address and quantity
          console.log(`Estimated gas: ${gasEstimate.toString()}`);
          hasGasEstimate = true;
        } catch (e) {
          console.error("Error estimating gas:", e);
          if (
            e.message
              .toString()
              .includes("insufficient funds for intrinsic transaction cost")
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
          if (hasGasEstimate) {
            if (e.message.toString().includes("user rejected transaction")) {
              displayMsg(0, "Please approve the transaction in your wallet."); // Display error message}
            } else {
              displayMsg(0, e.message);
            }
          }
        }
      }
    }
  };

  const nftItem = {
    title: "RUNEROCK #" + nextMintId.toString(),
    image: "assets/images/bid/" + nextMintId.toString() + ".png",
    imageSold: "assets/images/bid/" + (nextMintId - 1).toString() + ".png",
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
                  eventKey="today-item"
                >
                  <div className="photo-frame">
                    <img
                      src="assets/images/bid/sold.jpg"
                      style={{
                        width: "100%",
                        height: "100%",
                        display: isSold ? "block" : "none",
                        position: "absolute",
                        zIndex: 3,
                        opacity: "0.9",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                      alt=""
                    />
                    <img
                      src={isSold ? nftItem.imageSold : nftItem.image}
                      alt="today-item"
                      className="rotate-img"
                    />
                  </div>
                </Tab.Pane>
              </Tab.Content>
              <Nav className="nav thumb-images rmb-20">
                {/* <Nav.Link
                  as="a"
                  href="#today-item"
                  eventKey="today-item"
                  className="thumb-item"
                  onClick={() => selectHandler("today-item")}
                >
                  In Auction
                </Nav.Link> */}
              </Nav>
            </div>
          </Tab.Container>
        </div>
        <div className="col-lg-6 bid-info">
          <div className="product-details-content wow fadeInRight delay-0-2s">
            <div className="section-title">
              <h2>{nftItem.title}</h2>
            </div>
            <div className="ratting-price mb-15">
              {isSold
                ? "Sold Price"
                : auctionLive
                ? "Now Price"
                : "Start Price"}
              <br />
              <span className="price">
                {isSold
                  ? soldPrice
                  : auctionLive
                  ? parseFloat(currentPrice.toFixed(5))
                  : startPrice}{" "}
                BTC
              </span>
            </div>
            <div className="ratting-price mb-15">
              {isSold ? "Owned By" : "Auction Status"}
              <br />
              <span className="price">
                {" "}
                {isSold ? bidTaker : auctionLive ? "In Progress" : "Preparing"}
              </span>
            </div>
            <div className="ratting-price mb-15">
              {isSold
                ? "Ended At  "
                : auctionLive
                ? "Ends In  "
                : "Starts In  "}
              <br />
              <span className="price">
                {isSold ? (
                  soldTime
                ) : (
                  <EventCountdown
                    startTime={(auctionStartTime + 10) * 1000} // Convert to milliseconds
                    endTime={(auctionStartTime + 10 + auctionDuration) * 1000}
                    setCountdownEnd={setCountdownEnd}
                    countdownEnd={countdownEnd}
                    auctionLive={auctionLive}
                  />
                )}
              </span>
            </div>
            {!isSold && (countdownEnd || auctionLive) && (
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
