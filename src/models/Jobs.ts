import mongoose, { InferSchemaType } from "mongoose";

const jobsSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
  },
  sphere: {
    type: Array,
    required: true,
  },
});

type IJobs = InferSchemaType<typeof jobsSchema>;

const Jobs = mongoose.model<IJobs>("Jobs", jobsSchema);

export default Jobs;
