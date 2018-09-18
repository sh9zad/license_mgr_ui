import { ApiManager } from "./ApiManager";
import axios from "axios";

export class LicenseApis extends ApiManager {
  protected endpoint = "license";

  public getLicenseInitInfo(moduleName?: string, id?: string) {
    const url: string =
      moduleName && id
        ? this.getBaseURL() + "/" + moduleName + "/" + id
        : this.getBaseURL();
    return axios
      .get(url)
      .then(res => JSON.parse(res.data))
      .catch(err => console.error(err));
  }
}
