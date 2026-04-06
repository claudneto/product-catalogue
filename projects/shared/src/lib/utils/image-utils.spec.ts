import { ImageUtils } from '@shared/utils/image-utils';

describe('ImageUtils', () => {
  it('should prefix relative image paths with the base URL', () => {
    expect(ImageUtils.resolveImageUrl('/images/product.png', 'https://cdn.example.com')).toBe(
      'https://cdn.example.com/images/product.png',
    );
  });

  it('should preserve absolute image URLs', () => {
    expect(
      ImageUtils.resolveImageUrl(
        'https://images.example.com/products/product.png',
        'https://cdn.example.com',
      ),
    ).toBe('https://images.example.com/products/product.png');
  });
});
