import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import { Image } from '../../Image/Image'
import { API_CONFIG } from '../../../config'
import { FormContainer } from './Form.styled'

export const Form = () => {
  const [isEnabledChecked, setIsEnabledChecked] = useState(false)
  const [isAutoLoading, setIsAutoLoading] = useState(false)

  const abortControllerRef = useRef<AbortController | null>(null)

  const {
    data: catImageUrl,
    error,
    isLoading,
    refetch: fetchRandomCat,
  } = useQuery(
    'randomCat',
    async () => {
      abortControllerRef.current?.abort()
      abortControllerRef.current = new AbortController()

      const response = await fetch(API_CONFIG.CAT_API_URL, {
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) throw new Error('Failed to fetch image')

      const data = await response.json()

      return data[0]?.url || API_CONFIG.PLACEHOLDER_IMAGE
    },
    {
      enabled: false,
      initialData: API_CONFIG.PLACEHOLDER_IMAGE
    }
  )

  useEffect(() => {
    let intervalId: number

    if (isAutoLoading) {
      setIsEnabledChecked(false)
      intervalId = window.setInterval(() => {
        fetchRandomCat()
      }, API_CONFIG.REFRESH_INTERVAL)
    }

    return () => {
      clearInterval(intervalId)
      abortControllerRef.current?.abort()
    }
  }, [isAutoLoading, fetchRandomCat])


  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    fetchRandomCat()
  }

  const handleEnableCheckbox = (evt: ChangeEvent<HTMLInputElement>) => {
    const checked = evt.target.checked
    setIsEnabledChecked(checked)
  }

  const autoRefresh = (evt: ChangeEvent<HTMLInputElement>) => {
    const checked = evt.target.checked
    setIsAutoLoading(checked)
  }

  const isDisabled = !isEnabledChecked || isLoading;

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        title="Enabled"
        type="checkbox"
        checked={isEnabledChecked}
        onChange={handleEnableCheckbox}
      />
      <Input
        title="Auto-refresh every 5 seconds"
        type="checkbox"
        checked={isAutoLoading}
        onChange={autoRefresh}
      />
      <Button
        disabled={isDisabled}
        loading={isLoading}
        text={isLoading ? 'Loading...' : 'Get cat'}
        type="submit"
      />

      {error != null && (
        <p className="text-red-500">
          {error instanceof Error
            ? error.message
            : typeof error === 'string'
              ? error
              : JSON.stringify(error)}
        </p>
      )}

      <Image
        url={catImageUrl}
        alt="Random cat"
      />
    </FormContainer>
  )
}
