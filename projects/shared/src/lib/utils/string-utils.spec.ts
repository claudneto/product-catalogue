import { StringUtils } from '@shared/utils/string-utils';

describe('StringUtils', () => {
  it('should normalize nullable strings', () => {
    expect(StringUtils.normalizeNullableString('  value  ')).toBe('value');
    expect(StringUtils.normalizeNullableString('   ')).toBeNull();
    expect(StringUtils.normalizeNullableString(null)).toBeNull();
  });

  it('should normalize search text by trimming, lowercasing and removing accents', () => {
    expect(StringUtils.normalizeSearchText('  Fórmula Infantil  ')).toBe('formula infantil');
  });

  it('should replace CRLF with HTML line breaks in HTML content', () => {
    expect(StringUtils.normalizeHtmlString('<p>Line 1</p>\r\n<p>Line 2</p>\r\n')).toBe(
      '<p>Line 1</p><br /><p>Line 2</p><br />',
    );
  });

  it('should return an empty string when nullable HTML content is missing', () => {
    expect(StringUtils.normalizeHtmlString(null)).toBe('');
    expect(StringUtils.normalizeHtmlString(undefined)).toBe('');
    expect(StringUtils.normalizeHtmlString('')).toBe('');
  });

  it('should normalize nullable HTML strings', () => {
    expect(StringUtils.normalizeNullableHtmlString('  <p>Text</p>\r\n')).toBe('<p>Text</p><br />');
    expect(StringUtils.normalizeNullableHtmlString('   ')).toBeNull();
    expect(StringUtils.normalizeNullableHtmlString(null)).toBeNull();
  });
});
