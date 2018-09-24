export class Helpers {
  public static getURLSegments(pathname: string): string[] {
    return pathname.toString().split("/");
  }

  public static getURL(endpoint: string): string {
    return Helpers.baseURL + ":" + Helpers.port + "/" + endpoint;
  }

  private static baseURL: string = "http://localhost";
  private static port: number = 3030;
}
