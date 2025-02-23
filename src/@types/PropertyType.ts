import { AddressType } from "./AddressType";

export type PropertyType = {
  id: string;
  title: string;
  description?: string;
  price: number;
  condoFee?: number;
  area?: number;
  areaUnit?: string;
  bedrooms?: number;
  suites?: number;
  bathrooms?: number;
  parkingSpaces?: number;
  type: string;
  purpose: string;
  address: AddressType;
  photos?: string;
  status: string;
  advertiserId: string;
  views: number;
  favorites: number;
  createdAt: Date;
  updatedAt: Date;
};
