import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let ipAddress = req.headers["x-real-ip"] as string;

  const forwardedFor = req.headers["x-forwarded-for"] as string;
  if (!ipAddress && forwardedFor) {
    ipAddress = forwardedFor?.split(",").at(0) ?? "Unknown";
    console.log("IP Address: ", ipAddress);
  } else {
    console.log("IP Address not found");
  }

  res.status(200).json(ipAddress);
};

export default handler;
