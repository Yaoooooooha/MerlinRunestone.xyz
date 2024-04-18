import { useState } from "react";
import Layout from "@/src/layout/Layout";
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
  const [activeRule, setActiveRule] = useState(null);
  const selectHandler = (item) => {
    if (item === "yesterday-item") {
      setSelectedItem(yesterdayItem);
    } else if (item === "today-item") {
      setSelectedItem(todayItem);
    } else if (item === "tommorow-item") {
      setSelectedItem(tommorowItem);
    }
  };

  const toggleRule = (index) => {
    setActiveRule(index === activeRule ? null : index);
  };

  const handleRuleClick = (index) => {
    if (index === activeRule) {
      setActiveRule(null);
    } else {
      setActiveRule(index);
    }
  };

  return (
    <Layout header={1} singleMenu footer={1} dark>
      {/* Product Details Start */}
      <section className=" bid-rule pt-130 rpt-100 rel z-1">
        <div className="container container-1290">
          <h2>AUCTION RULE</h2>
          <h4>Things You Should Know before Auction</h4>
          <ul className="pt-10">
            <li>
              <span
                className="rule-title"
                onClick={() => handleRuleClick(0)}
                style={{ color: "#8939fa" }}
              >
                {" "}
                One Rock a Day{" "}
                <i
                  className="fa-solid fa-gavel"
                  style={{ transform: "rotate(0deg)" }}
                />
              </span>{" "}
              {activeRule === 0 && (
                <p>
                  We auction just one RUNEROCK each day, crafted by Merlin
                  himself.
                </p>
              )}
            </li>
            <li>
              <span
                className="rule-title"
                onClick={() => handleRuleClick(1)}
                style={{ color: "#8533f9" }}
              >
                {" "}
                Start High, End Low{" "}
                <i
                  className="fa-solid fa-gavel"
                  style={{ transform: "rotate(0deg)" }}
                />
              </span>{" "}
              {activeRule === 1 && (
                <p>
                  Bids start at double yesterday’s price and drop until they hit
                  zero.
                </p>
              )}
            </li>
            <li>
              <span
                className="rule-title"
                onClick={() => handleRuleClick(2)}
                style={{ color: "#8229fd" }}
              >
                {" "}
                Minimum Start Price{" "}
                <i
                  className="fa-solid fa-gavel"
                  style={{ transform: "rotate(0deg)" }}
                />
              </span>{" "}
              {activeRule === 2 && (
                <p>
                  If a RUNEROCK sells for less than 0.0005 BTC, the next day’s
                  bidding starts at 0.001 BTC.
                </p>
              )}
            </li>
            <li>
              <span
                className="rule-title"
                onClick={() => handleRuleClick(3)}
                style={{ color: "#7a1bfe" }}
              >
                {" "}
                Exclusive for Whitelist{" "}
                <i
                  className="fa-solid fa-gavel"
                  style={{ transform: "rotate(0deg)" }}
                />
              </span>{" "}
              {activeRule === 3 && (
                <p>
                  Anyone can buy a RUNEROCK in the first 12 hours. After that,
                  only whitelist members (OGs and RUNEROCK holders) get the
                  chance.
                </p>
              )}
            </li>
            <li>
              <span
                className="rule-title"
                onClick={() => handleRuleClick(4)}
                style={{ color: "#7317fd" }}
              >
                {" "}
                Merlin’s Choice{" "}
                <i
                  className="fa-solid fa-gavel"
                  style={{ transform: "rotate(0deg)" }}
                />
              </span>{" "}
              {activeRule === 4 && (
                <p>
                  Not everyone can owned a RUNEROCK. You've got to be picked by
                  Merlin.
                </p>
              )}
            </li>
            <li>
              <span
                className="rule-title"
                onClick={() => handleRuleClick(5)}
                style={{ color: "#6c03ff" }}
              >
                {" "}
                Win and Become Favored{" "}
                <i
                  className="fa-solid fa-gavel"
                  style={{ transform: "rotate(0deg)" }}
                />
              </span>{" "}
              {activeRule === 5 && (
                <p>
                  Win a bid and you're in with Merlin, earning perks better than
                  OG.
                </p>
              )}
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
};
export default ProductDetails;
