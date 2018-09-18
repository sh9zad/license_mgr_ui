export class Helpers {
  public static getURLSegments(pathname: string): string[] {
    return pathname.toString().split("/");
  }
}
