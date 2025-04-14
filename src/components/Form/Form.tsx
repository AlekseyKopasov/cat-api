import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Button } from './Button'
import { Input } from './Input'
import { Image } from '../Image'

export const Form = () => {
  const [catImageUrl, setCatImageUrl] = useState<string>('placeholder.png')
  const [isLoading, setIsLoading] = useState(false)
  const [isAutoLoading, setIsAutoLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [isEnabledChecked, setIsEnabledChecked] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let intervalId: number

    if (isAutoLoading) {
      setIsDisabled(true)
      setIsEnabledChecked(false)
      intervalId = window.setInterval(() => {
        fetchRandomCat()
      }, 5000)
    } else {
      setIsDisabled(!isEnabledChecked)
    }

    return () => {
      clearInterval(intervalId)
      // if (!isAutoLoading) {
      //   setIsDisabled(!isEnabledChecked)
      // }
    }
  }, [isAutoLoading, isEnabledChecked])

  const fetchRandomCat = async (evt?: FormEvent) => {
    evt?.preventDefault()

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search')

      if (!response.ok) {
        throw new Error('Failed to fetch image')
      }

      const data = await response.json()
      setCatImageUrl(data[0].url || 'placeholder.png')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error...')
      setCatImageUrl('placeholder.png')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEnableCheckbox = (evt: ChangeEvent<HTMLInputElement>) => {
    const checked = evt.target.checked
    setIsEnabledChecked(checked)
    // setIsDisabled(!checked)

    // Если включаем автозагрузку, снимаем отметку с чекбокса Enabled
    // if (isAutoLoading) {
    //   setIsEnabledChecked(false)
    //   setIsDisabled(true)
    // }
  }

  const autoRefresh = (evt: ChangeEvent<HTMLInputElement>) => {
    const checked = evt.target.checked
    setIsAutoLoading(checked)

    // При включении автозагрузки снимаем отметку с чекбокса Enabled
    if (checked) {
      setIsEnabledChecked(false)
      setIsDisabled(true)
    } else {
      setIsDisabled(!isEnabledChecked)
    }
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={fetchRandomCat}>
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
        disabled={isDisabled || isLoading}
        text={isLoading ? 'Loading...' : 'Get cat'}
        type="submit"
      />

      {error && <p className="text-red-500">{error}</p>}

      <Image
        url={catImageUrl}
        alt="Random cat"
        className="mt-8"
      />
    </form>
  )
}
