import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';
describe('Button component', () => {
    it('отображается кнопка с текстом', () => {
        render(_jsx(Button, { text: "Click me" }));
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });
    it('показывается состояние загрузки', () => {
        render(_jsx(Button, { text: "Submit", loading: true }));
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
    it('кнопка отключена, когда disabled: true', () => {
        render(_jsx(Button, { text: "Submit", disabled: true }));
        expect(screen.getByRole('button')).toBeDisabled();
    });
});
