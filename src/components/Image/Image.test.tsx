import { fireEvent, render, screen } from '@testing-library/react'
import { Image } from './Image'
import { act } from 'react';

class MockImage {
  onerror: (() => void) | null = null;
  src = '';
  constructor() {
    setTimeout(() => {
      if (this.onerror) this.onerror();
    }, 0);
  }
}

describe('Image component', () => {
  const testImageUrl = 'test-image.jpg';
  const testAltText = 'Test image';

  beforeAll(() => {
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    //@ts-ignore
    window.Image = MockImage;
  });

  it('рендерится с пропсами по умолчанию', () => {
    render(<Image />);

    const img = screen.getByAltText('');

    expect(img).toHaveAttribute('src', 'placeholder.png');
    expect(img).toHaveAttribute('alt', '');
    expect(img).toHaveAttribute('width', '256');
    expect(img).toHaveAttribute('height', '256');
  });

  it('рендерится с кастомными пропсами', () => {
    render(
      <Image
        url={testImageUrl}
        alt={testAltText}
        width="300"
        height="200"
      />
    );

    const img = screen.getByAltText(testAltText);

    expect(img).toHaveAttribute('src', testImageUrl);
    expect(img).toHaveAttribute('alt', testAltText);
    expect(img).toHaveAttribute('width', '300');
    expect(img).toHaveAttribute('height', '200');
  });

  it('обрабатывается ошибка изображения, показывается placeholder', async () => {
    const originalImage = window.Image;

    act(() => {
      render(<Image url="invalid-image.jpg" alt={testAltText} />);
    });

    const img = screen.getByAltText(testAltText);

    act(() => {
      fireEvent.error(img);
    });

    expect(img).toHaveAttribute('src', 'placeholder.png');

    window.Image = originalImage;
  });

  it('сохраняются пропорции для aspect-ratio свойства', () => {
    render(<Image />);
    const img = screen.getByAltText('');
    expect(img).toHaveClass('aspect-square');
  });

  it('обрабатываются различные размеры', () => {
    render(<Image width="100%" height="auto" />);
    const img = screen.getByAltText('');
    expect(img).toHaveAttribute('width', '100%');
    expect(img).toHaveAttribute('height', 'auto');
  });

  it('добавляются новые пропсы', () => {
    render(<Image data-testid="custom-image" />);
    const elements = screen.getAllByTestId('custom-image');
    expect(elements.length).toBeGreaterThan(0);
  });
});
