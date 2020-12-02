import dbConnect from "../../../utils/dbConnect";
import Favourite from "../../../models/Favourite";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  console.log("id", id);
  switch (method) {
    case "DELETE":
      try {
        Favourite.deleteOne({ fid: id }).then((deletedIem) => {
          res.status(200).json({ success: true, data: {} });
        });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
      break;
    default:
      return res.status(400).json({ success: false });
  }
};
