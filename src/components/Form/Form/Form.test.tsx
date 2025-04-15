import { render, screen, waitFor, fireEvent, cleanup } from '@testing-library/react'
import { Form } from './Form'
import { useQuery } from 'react-query'
import { API_CONFIG } from '../../../config'

jest.mock('react-query')
jest.mock('../../Image/Image', () => ({
  Image: ({ url, alt }: { url: string; alt: string }) => (
    <img src={url} alt={alt} data-testid="cat-image" />
  )
}))

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ url: 'test-cat.jpg' }]),
  })
) as jest.Mock

const mockUseQuery = useQuery as jest.Mock

describe('Form component', () => {
  const mockFetchRandomCat = jest.fn()
  let abortControllerMock: { abort: jest.Mock; signal: AbortSignal }

  beforeEach(() => {
    jest.clearAllMocks()

    abortControllerMock = {
      abort: jest.fn(),
      signal: {
        aborted: false,
        onabort: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      } as unknown as AbortSignal
    }

    global.AbortController = jest.fn(() => abortControllerMock) as jest.Mock

    mockUseQuery.mockReturnValue({
      data: API_CONFIG.PLACEHOLDER_IMAGE,
      error: null,
      isLoading: false,
      isFetching: false,
      refetch: mockFetchRandomCat,
    })
  })

  afterEach(() => {
    cleanup()
    jest.useRealTimers()
  })

  it('корректно отображается начальное состояние', () => {
    render(<Form />)

    expect(screen.getByLabelText('Enabled')).toBeInTheDocument()
    expect(screen.getByLabelText('Auto-refresh every 5 seconds')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /get cat/i })).toBeInTheDocument()
    expect(screen.getByTestId('cat-image')).toHaveAttribute('src', API_CONFIG.PLACEHOLDER_IMAGE)
    expect(screen.getByRole('button', { name: /get cat/i })).toBeDisabled()
  })

  it('кнопка включается, когда включен чекбокс', () => {
    render(<Form />)

    const button = screen.getByRole('button', { name: /get cat/i })
    const enableCheckbox = screen.getByLabelText('Enabled')

    expect(button).toBeDisabled()
    fireEvent.click(enableCheckbox)
    expect(button).not.toBeDisabled()
  })

  it('при отправке формы вызывается fetchRandomCat', async () => {
    render(<Form />)

    fireEvent.click(screen.getByLabelText('Enabled'))
    fireEvent.click(screen.getByRole('button', { name: /get cat/i }))

    await waitFor(() => {
      expect(mockFetchRandomCat).toHaveBeenCalledTimes(1)
    })
  })

  it('показывается состояние загрузки при получении данных', () => {
    mockUseQuery.mockReturnValue({
      data: API_CONFIG.PLACEHOLDER_IMAGE,
      error: null,
      isLoading: true,
      isFetching: true,
      refetch: mockFetchRandomCat,
    })

    render(<Form />)

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent(/loading/i)
    expect(button).toBeDisabled()
  })

  it('отображается сообщение об ошибке', () => {
    const errorMessage = 'Failed to fetch image'
    mockUseQuery.mockReturnValue({
      data: API_CONFIG.PLACEHOLDER_IMAGE,
      error: new Error(errorMessage),
      isLoading: false,
      refetch: mockFetchRandomCat,
    })

    render(<Form />)

    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('запускается автоматическое обновление', async () => {
    jest.useFakeTimers()
    render(<Form />)

    fireEvent.click(screen.getByLabelText('Enabled'))
    fireEvent.click(screen.getByLabelText('Auto-refresh every 5 seconds'))

    jest.advanceTimersByTime(API_CONFIG.REFRESH_INTERVAL)

    await waitFor(() => {
      expect(mockFetchRandomCat).toHaveBeenCalledTimes(1)
    })
  })

  it('отменяется предыдущий запрос при поступлении нового', async () => {
    mockUseQuery.mockImplementation((_, fn) => {
      const result = fn()
      return {
        data: result,
        error: null,
        isLoading: false,
        refetch: mockFetchRandomCat,
      }
    })

    render(<Form />)

    fireEvent.click(screen.getByLabelText('Enabled'))
    fireEvent.click(screen.getByRole('button', { name: /get cat/i }))

    await waitFor(() => {
      expect(abortControllerMock.abort).toHaveBeenCalled()
    })
  })

  it('таймеры очищаются при размонтировании', () => {
    jest.useFakeTimers()
    const { unmount } = render(<Form />)

    fireEvent.click(screen.getByLabelText('Enabled'))
    fireEvent.click(screen.getByLabelText('Auto-refresh every 5 seconds'))

    unmount()

    expect(jest.getTimerCount()).toBe(0)
  })

  it('прерывает активный запрос при размонтировании', async () => {
    mockUseQuery.mockImplementation((_, queryFn) => {
      queryFn()
      return {
        data: API_CONFIG.PLACEHOLDER_IMAGE,
        error: null,
        isLoading: false,
        isFetching: true,
        refetch: mockFetchRandomCat,
      }
    })

    const { unmount } = render(<Form />)

    // время на создание AbortController
    await new Promise(resolve => setTimeout(resolve, 0))

    unmount()

    expect(abortControllerMock.abort).toHaveBeenCalled()
  })
})
