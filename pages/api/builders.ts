import type { NextApiRequest, NextApiResponse } from "next";
import openSourceBuildersData from "../../data/builders.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).json(openSourceBuildersData);
  } catch (err) {
    console.error(err); 
    res.status(500).json({
      success: false,
      message: "Failed to fetch builders data",
    });
  }
}
