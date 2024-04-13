import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only Support POST Request" });
  }

  const { twitterId, evmAddress } = req.body;
  try {
    const { rows: twitterRows } = await sql`
      SELECT * FROM users WHERE twitter_id = ${twitterId}
    `;
    const { rows: evmRows } = await sql`
      SELECT * FROM users WHERE evm_address = ${evmAddress}
    `;

    if (twitterRows.length > 0 || evmRows.length > 0) {
      return res
        .status(409)
        .json({ message: "Twitter ID or EVM Already Exist" });
    }

    await sql`
      INSERT INTO users (twitter_id, evm_address) VALUES (${twitterId}, ${evmAddress})
    `;
    res.status(200).json({ message: "Join Success!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}
