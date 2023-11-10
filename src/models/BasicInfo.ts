import { InferSchemaType, Schema, model } from "mongoose";

const basicInfoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: String,
  specialization: String,
  educationLevel: String,
  birthday: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  about: String,
});

export type IBasicInfo = InferSchemaType<typeof basicInfoSchema>;

const BasicInfo = model<IBasicInfo>("BasicInfo", basicInfoSchema);

export default BasicInfo;
