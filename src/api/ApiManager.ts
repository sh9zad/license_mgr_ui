export class ApiManager {
  protected baseURL: string = "http://localhost:3030/";
  protected endpoint: string;

  protected getBaseURL(): string {
    return this.baseURL + this.endpoint;
  }
}
