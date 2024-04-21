import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: "Only POST requests are supported." });
  }

  try {
    const { evmAddress } = req.body;

    // 檢查是否存在相同的 EVM 地址
    const { rows: existingUsers } = await sql`
      SELECT * FROM users WHERE evm_address = ${evmAddress}
    `;

    if (existingUsers.length > 0) {
      return res.status(200).json({
        whitelistStatus: true,
        message: "Wallet Address is whitelisted.",
      });
    } else {
      return res.status(404).json({
        whitelistStatus: false,
        message: "Wallet Address is not whitelisted.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
