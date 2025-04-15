import { jsx as _jsx } from "react/jsx-runtime";
import { fireEvent, render, screen } from '@testing-library/react';
import { Image } from './Image';
import { act } from 'react';
class MockImage {
    constructor() {
        this.onerror = null;
        this.src = '';
        setTimeout(() => {
            if (this.onerror)
                this.onerror();
        }, 0);
    }
}
describe('Image component', () => {
    const testImageUrl = 'test-image.jpg';
    const testAltText = 'Test image';
    beforeAll(() => {
        // @ts-ignore
        window.Image = MockImage;
    });
    it('рендерится с пропсами по умолчанию', () => {
        render(_jsx(Image, {}));
        const img = screen.getByAltText('');
        const container = img.parentElement;
        expect(img).toHaveAttribute('src', 'placeholder.png');
        expect(img).toHaveAttribute('alt', '');
        expect(img).toHaveAttribute('width', '256');
        expect(img).toHaveAttribute('height', '256');
        expect(img).toHaveClass('object-cover w-full h-full aspect-square');
        expect(container).toHaveClass('w-[320px] mx-auto border border-blue-300 bg-blue-200');
    });
    it('рендерится с кастомными пропсами', () => {
        render(_jsx(Image, { url: testImageUrl, alt: testAltText, width: "300", height: "200", containerClassName: "custom-container" }));
        const img = screen.getByAltText(testAltText);
        expect(img).toHaveAttribute('src', testImageUrl);
        expect(img).toHaveAttribute('alt', testAltText);
        expect(img).toHaveAttribute('width', '300');
        expect(img).toHaveAttribute('height', '200');
        expect(img.parentElement).toHaveClass('custom-container');
    });
    it('обрабатывается ошибка изображения, показывается placeholder', async () => {
        const originalImage = window.Image;
        act(() => {
            render(_jsx(Image, { url: "invalid-image.jpg", alt: testAltText }));
        });
        const img = screen.getByAltText(testAltText);
        act(() => {
            fireEvent.error(img);
        });
        expect(img).toHaveAttribute('src', 'placeholder.png');
        window.Image = originalImage;
    });
    it('применяются правильные классы для контейнеров', () => {
        const { container } = render(_jsx(Image, { containerClassName: "additional-class" }));
        const div = container.firstChild;
        expect(div).toHaveClass('w-[320px] mx-auto border border-blue-300 bg-blue-200 additional-class');
    });
    it('сохраняются пропорции для aspect-ratio свойства', () => {
        render(_jsx(Image, {}));
        const img = screen.getByAltText('');
        expect(img).toHaveClass('aspect-square');
    });
    it('обрабатываются различные размеры', () => {
        render(_jsx(Image, { width: "100%", height: "auto" }));
        const img = screen.getByAltText('');
        expect(img).toHaveAttribute('width', '100%');
        expect(img).toHaveAttribute('height', 'auto');
    });
    it('добавляются новые пропсы', () => {
        render(_jsx(Image, { "data-testid": "custom-image" }));
        expect(screen.getByTestId('custom-image')).toBeInTheDocument();
    });
});
