import type { NextApiRequest, NextApiResponse } from "next";

const channels = [
  { id: "1", name: "General" },
  { id: "2", name: "Support" },
];

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    res.status(200).json(channels);
  } else {
    res.status(405).end();
  }
};
