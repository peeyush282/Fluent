const moongoose = require("mongoose");

const FavouriteSchema = new moongoose.Schema({
  fid: { type: Number, required: true },
});

module.exports =
  moongoose.models.Favourite || moongoose.model("Favourite", FavouriteSchema);
