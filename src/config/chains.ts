import { type Chain } from "viem";

export const merlinChain: Chain = {
  id: 4200,
  name: "Merlin Chain",
  nativeCurrency: {
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc.merlinchain.io"] },
  },
  blockExplorers: {
    default: {
      name: "Merlin Explorer",
      url: "https://explorer.merlinchain.io",
    },
  },
} as const satisfies Chain;

export const merlinChainTestnet: Chain = {
  id: 686868,
  name: "Merlin Chain Testnet",
  nativeCurrency: {
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://testnet-rpc.merlinchain.io"] },
  },
  blockExplorers: {
    default: {
      name: "Merlin Testnet Explorer",
      url: "https://testnet-scan.merlinchain.io",
    },
  },
} as const satisfies Chain;
