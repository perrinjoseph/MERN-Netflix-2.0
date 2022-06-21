const mongoose = require("mongoose");

const fileSchema = {
  fieldname: { type: mongoose.Schema.Types.String, required: true },
  originalname: { type: mongoose.Schema.Types.String, required: true },
  encoding: { type: mongoose.Schema.Types.String, required: true },
  mimetype: { type: mongoose.Schema.Types.String, required: true },
  id: { type: mongoose.Schema.Types.ObjectId, required: true },
  filename: { type: mongoose.Schema.Types.String, required: true },
  metadata: { type: mongoose.Schema.Types.Mixed },
  bucketName: { type: mongoose.Schema.Types.String, required: true },
  chunkSize: { type: mongoose.Schema.Types.Number, required: true },
  size: { type: mongoose.Schema.Types.Number },
  uploadDate: { type: mongoose.Schema.Types.Date, required: true },
  contentType: { type: mongoose.Schema.Types.String, required: true },
};

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnailImage: fileSchema,
    bannerImage: fileSchema,
    titleImage: fileSchema,
    video: { type: mongoose.Schema.Types.String, required: false },
    trailer: { type: mongoose.Schema.Types.String, required: false },
    year: { type: String },
    limit: { type: Number },
    genre: { type: String, required: true },
    isSeries: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const movieModel = mongoose.model("Movie", movieSchema);
module.exports = movieModel;
