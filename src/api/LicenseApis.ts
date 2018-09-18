import { ApiManager } from "./ApiManager";
import * as axios from "axios";

export class LicenseApis extends ApiManager {
  protected endpoint = "license";

  public getLicenseInitInfo(moduleName?: string, id?: string) {
    const url: string =
      moduleName && id
        ? this.getBaseURL() + "/" + moduleName + "/" + id
        : this.getBaseURL();
    return axios.default.get(url)
  }
}
