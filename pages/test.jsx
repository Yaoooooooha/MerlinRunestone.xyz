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
import {
  TEST_CONTRACT_ADDRESS,
  TEST_CONTRACT_ABI,
} from "@/src/config/runerockConfig";
import { useAccount } from "wagmi";
import { useEthersSigner } from "@/src/config/ethersSigner";
import { ethers } from "ethers";

const test = () => {
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
  const testContract = new ethers.Contract(
    TEST_CONTRACT_ADDRESS,
    TEST_CONTRACT_ABI,
    provider
  );

  const [account, setAccount] = useState(null);
  const [time, setTime] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 确保代码在客户端执行
      const onBidTaken = async (event, even123) => {
        console.log(
          "onBidTaken",
          event.toString(),
          even123.toString(),
          even123,
          event
        );
        // setAccount(address);
        // setTime(time);
      };
      testContract.on("SuperEvent", onBidTaken);

      // 清除事件监听器
      return () => {
        testContract.off("SuperEvent", onBidTaken);
      };
    }
  }, []);

  return (
    <div>
      <p>address: {account}</p>
      <p>tiem: {time}</p>
    </div>
  );
};
export default test;
