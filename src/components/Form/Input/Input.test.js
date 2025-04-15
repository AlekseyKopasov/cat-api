import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';
describe('Input component', () => {
    const baseProps = {
        title: 'Test Input',
        type: 'checkbox',
    };
    it('корректно отображается с параметрами по умолчанию', () => {
        render(_jsx(Input, { ...baseProps }));
        const input = screen.getByLabelText(baseProps.title);
        const label = screen.getByText(baseProps.title);
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'checkbox');
        expect(input).toHaveClass('w-6 h-6 border border-blue-300');
        expect(label).toBeInTheDocument();
    });
    it('применяется className', () => {
        const customClass = 'custom-class';
        render(_jsx(Input, { ...baseProps, className: customClass }));
        const input = screen.getByLabelText(baseProps.title);
        expect(input).toHaveClass(customClass);
        expect(input).toHaveClass('w-6 h-6 border border-blue-300');
    });
    it('применяется wrapperClassName', () => {
        const wrapperClass = 'wrapper-class';
        render(_jsx(Input, { ...baseProps, wrapperClassName: wrapperClass }));
        const label = screen.getByText(baseProps.title).parentElement;
        expect(label).toHaveClass(wrapperClass);
        expect(label).toHaveClass('flex gap-2 items-center text-xl font-sans cursor-pointer');
    });
    it('корректно передаются все входные реквизиты', () => {
        const testId = 'test-input';
        const onChange = jest.fn();
        render(_jsx(Input, { ...baseProps, "data-testid": testId, checked: true, onChange: onChange, disabled: true }));
        const input = screen.getByTestId(testId);
        expect(input).toBeChecked();
        expect(input).toBeDisabled();
        fireEvent.click(input);
        expect(onChange).toHaveBeenCalledTimes(1);
    });
    it('отображаются различные пропсы', () => {
        render(_jsx(Input, { ...baseProps, type: "radio" }));
        expect(screen.getByLabelText(baseProps.title)).toHaveAttribute('type', 'radio');
    });
    it('обрабатыватся событие onClick', () => {
        const onClick = jest.fn();
        render(_jsx(Input, { ...baseProps, onClick: onClick }));
        fireEvent.click(screen.getByLabelText(baseProps.title));
        expect(onClick).toHaveBeenCalledTimes(1);
    });
    it('обрабатываются свойства value и readOnly', () => {
        render(_jsx(Input, { ...baseProps, type: "text", value: "test value", readOnly: true }));
        const input = screen.getByLabelText(baseProps.title);
        expect(input).toHaveValue('test value');
        expect(input).toHaveAttribute('readonly');
    });
});
