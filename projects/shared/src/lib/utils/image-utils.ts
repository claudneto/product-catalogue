export class ImageUtils {
  public static resolveImageUrl(value: string, baseUrl: string): string {
    return new URL(value, baseUrl).toString();
  }
}
