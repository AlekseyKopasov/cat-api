import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../utils/test-utils';

import { Form } from './Form';


// Мокируем react-query
jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useQuery: jest.fn().mockReturnValue({
    data: null,
    isLoading: false,
    isError: false,
    error: null,
    refetch: jest.fn().mockResolvedValue({ data: [{ url: 'test-cat.jpg' }] })
  })
}));

describe('Form component', () => {
  it('renders form elements', () => {
    renderWithProviders(<Form />);
    expect(screen.getByLabelText('Enabled')).toBeInTheDocument();
    expect(screen.getByText('Get cat')).toBeInTheDocument();
  });

  it('shows loading state when submitting', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Form />);

    await user.click(screen.getByLabelText('Enabled'));
    await user.click(screen.getByText('Get cat'));

    // Проверяем состояние загрузки через изменение текста кнопки
    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent('Loading...');
    });
  });

  it('handles successful form submission', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Form />);

    await user.click(screen.getByLabelText('Enabled'));
    await user.click(screen.getByText('Get cat'));

    // Ждем завершения "загрузки"
    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent('Get cat');
    });
  });

  it('handles API error', async () => {
    // Мокируем ошибку
    jest.spyOn(require('react-query'), 'useQuery').mockReturnValueOnce({
      isError: true,
      error: new Error('API error'),
      refetch: jest.fn()
    });

    renderWithProviders(<Form />);

    // Проверяем отображение ошибки
    await waitFor(() => {
      expect(screen.getByText('API error')).toBeInTheDocument();
    });
  });
});
