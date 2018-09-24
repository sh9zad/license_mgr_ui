import {
  IProductSection,
  ILicenseSection,
  IProductSectionNamed
} from "../models";

export function combineLicenseSection(
  productSections: IProductSection[],
  licenseSections: ILicenseSection[]
): IProductSectionNamed[] {
  const response: IProductSectionNamed[] = productSections.map(
    (productSection: IProductSection) => {
      const combined: IProductSectionNamed = {
        licenseSection: {},
        productSection
      };

      const licSec = licenseSections.find(
        x => x._id === productSection.license_section_id
      );

      if (licSec) {
        combined.licenseSection = licSec;
      }

      return combined;
    }
  );
  return response;
}
