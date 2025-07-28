import { Schema, model, models, Document, Types } from "mongoose";

interface ILocation {
  street?: string;
  city?: string;
  state?: string;
  zipcode?: string;
}

interface IRates {
  nightly?: number;
  weekly?: number;
  monthly?: number;
}

interface ISellerInfo {
  name?: string;
  email?: string;
  phone?: string;
}

export interface IProperty extends Document {
  owner: Types.ObjectId;
  name: string;
  type: string;
  description?: string;
  location?: ILocation;
  beds: number;
  baths: number;
  square_feet: number;
  amenities?: string[];
  rates?: IRates;
  seller_info?: ISellerInfo;
  images?: string[];
  is_featured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema = new Schema<IProperty>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipcode: { type: String },
    },
    beds: {
      type: Number,
      required: true,
    },
    baths: {
      type: Number,
      required: true,
    },
    square_feet: {
      type: Number,
      required: true,
    },
    amenities: [
      {
        type: String,
      },
    ],
    rates: {
      nightly: { type: Number },
      weekly: { type: Number },
      monthly: { type: Number },
    },
    seller_info: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
    },
    images: [
      {
        type: String,
      },
    ],
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Property =
  models.Property || model<IProperty>("Property", PropertySchema);

export default Property;
