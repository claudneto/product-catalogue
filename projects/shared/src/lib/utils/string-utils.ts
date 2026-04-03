export class StringUtils {
  public static normalizeNullableString(value: string | null): string | null {
    const normalizedValue = value?.trim();
    return normalizedValue ? normalizedValue : null;
  }
}
