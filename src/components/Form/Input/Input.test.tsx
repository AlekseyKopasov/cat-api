import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from './Input'

describe('Input component', () => {
  const baseProps = {
    title: 'Test Input',
    type: 'checkbox',
  };

  it('корректно отображается с параметрами по умолчанию', () => {
    render(<Input {...baseProps} />);

    const input = screen.getByLabelText(baseProps.title);
    const label = screen.getByText(baseProps.title);

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'checkbox');
    expect(label).toBeInTheDocument();
  });

  it('применяется className', () => {
    const customClass = 'custom-class';
    render(<Input {...baseProps} className={customClass} />);

    const input = screen.getByLabelText(baseProps.title);
    expect(input).toHaveClass(customClass);
  });

  it('применяется wrapperClassName', () => {
    const wrapperClass = 'wrapper-class';
    render(<Input {...baseProps} wrapperClassName={wrapperClass} />);

    const label = screen.getByText(baseProps.title).parentElement;
    expect(label).toHaveClass(wrapperClass);
  });

  it('корректно передаются все входные реквизиты', () => {
    const testId = 'test-input';
    const onChange = jest.fn();

    render(
      <Input
        {...baseProps}
        data-testid={testId}
        checked={true}
        onChange={onChange}
        disabled={true}
      />
    );

    const input = screen.getByTestId(testId);
    expect(input).toBeChecked();
    expect(input).toBeDisabled();

    fireEvent.click(input);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('отображаются различные пропсы', () => {
    render(<Input {...baseProps} type="radio" />);
    expect(screen.getByLabelText(baseProps.title)).toHaveAttribute('type', 'radio');
  });

  it('обрабатыватся событие onClick', () => {
    const onClick = jest.fn();
    render(<Input {...baseProps} onClick={onClick} />);

    fireEvent.click(screen.getByLabelText(baseProps.title));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('обрабатываются свойства value и readOnly', () => {
    render(<Input {...baseProps} type="text" value="test value" readOnly />);
    const input = screen.getByLabelText(baseProps.title);
    expect(input).toHaveValue('test value');
    expect(input).toHaveAttribute('readonly');
  });
});
