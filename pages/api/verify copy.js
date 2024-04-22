import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: "Only POST requests are supported." });
  }

  const { twitterId, evmAddress } = req.body;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress; // Get the client's IP address

  try {
    // 檢查是否存在相同的 Twitter ID 或 EVM 地址
    const { rows: existingUsers } = await sql`
      SELECT * FROM users WHERE twitter_id = ${twitterId} OR evm_address = ${evmAddress}
    `;

    if (existingUsers.length > 0) {
      return res
        .status(409)
        .json({ message: "Twitter ID or EVM Address already exists." });
    }

    // 檢查這個 IP 是否在過去 24 小時內已經提交過
    const { rows: ipRows } = await sql`
      SELECT * FROM users WHERE ip_address = ${ip} AND created_at > now() - interval '24 hours'
    `;

    if (ipRows.length > 0) {
      return res
        .status(409)
        .json({ message: "Operation too Frequent, Try Again Tomorrow." });
    }

    // 插入新用戶資訊到資料庫
    await sql`
      INSERT INTO users (twitter_id, evm_address, ip_address, created_at)
      VALUES (${twitterId}, ${evmAddress}, ${ip}, now())
    `;

    res.status(200).json({ message: "Join successful!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
