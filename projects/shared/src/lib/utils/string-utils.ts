export class StringUtils {
  public static normalizeNullableString(value: string | null): string | null {
    const normalizedValue = value?.trim();
    return normalizedValue ? normalizedValue : null;
  }

  public static normalizeHtmlString(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    return value.replace(/\r\n/g, '<br />').trim();
  }

  public static normalizeNullableHtmlString(value: string | null): string | null {
    const normalizedValue = value ? this.normalizeHtmlString(value) : null;
    return normalizedValue ? normalizedValue : null;
  }
}
