import dbConnect from "../../../utils/dbConnect";
import Favourite from "../../../models/Favourite";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      Favourite.find({})
        .then((allitems) => {
          res.status(200).json({ success: true, data: allitems });
        })
        .catch((err) => {
          res.send(err);
        });

      break;

    case "POST":
      Favourite.find({ fid: req.body.id })
        .then((fac) => {
          if (fac.length > 0) {
            res.status(200).json({
              success: true,
              data: { message: "item already exist" },
            });
          } else {
            const favouriteItem = new Favourite();
            favouriteItem.fid = req.body.id;
            favouriteItem.save();
            res.status(200).json({ success: true });
          }
        })
        .catch((err) => {
          res.status(400).json({ success: err });
        });

      break;

    default:
      return res.status(400).json({ success: false });
  }
};
