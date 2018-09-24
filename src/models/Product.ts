import { ILicenseSection } from "./LicenseSection";

export interface IProduct {
  _id?: string;
  name?: string;
  code?: string;
  salt?: string;
  created_date?: Date;
}

export interface IProductSection {
  _id?: string;
  product_id?: string;
  license_section_id?: string;
  created_date?: Date;
}

export interface IProductDetails {
  product: IProduct;
  productSections: IProductSection[];
  licenseSections: ILicenseSection[];
}
