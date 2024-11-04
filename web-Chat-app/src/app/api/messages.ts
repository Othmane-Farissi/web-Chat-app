import type { NextApiRequest, NextApiResponse } from "next";

let messages = [{ channelId: "1", content: "Welcome to the General channel!" }];

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { channelId } = req.query;
    res.status(200).json(messages.filter((msg) => msg.channelId === channelId));
  } else if (req.method === "POST") {
    const { channelId, content } = req.body;
    const newMessage = { channelId, content };
    messages.push(newMessage);
    res.status(201).json(newMessage);
  } else {
    res.status(405).end();
  }
};
