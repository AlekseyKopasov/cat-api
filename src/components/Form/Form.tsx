import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Button } from './Button'
import { Input } from './Input'
import { Image } from '../Image'

export const Form = () => {
  const [catImageUrl, setCatImageUrl] = useState<string>('placeholder.png')
  const [isLoading, setIsLoading] = useState(false)
  const [isAutoLoading, setIsAutoLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let intervalId: number

    if (isAutoLoading) {
      setIsDisabled(true)
      intervalId = window.setInterval(() => {
        fetchRandomCat()
      }, 5000)
    }

    return () => {
      clearInterval(intervalId)
      setIsDisabled(false)
    }
  }, [isAutoLoading])

  const fetchRandomCat = async (evt?: FormEvent) => {
    evt?.preventDefault()

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search')

      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      const data = await response.json()

      setCatImageUrl(data[0].url || 'placeholder.png')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error...');
      setCatImageUrl('placeholder.png');
    } finally {
      setIsLoading(false)
    }
  }

  const unlockLoad = () => {
    setIsDisabled(prev => !prev)
  }

  const autoRefresh = (evt: ChangeEvent<HTMLInputElement>) => {
    setIsAutoLoading(evt.target.checked)
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={fetchRandomCat}>
      <Input title="Enabled" type="checkbox" onClick={unlockLoad} />
      <Input title="Auto-refresh every 5 seconds" type="checkbox" onChange={autoRefresh} />
      <Button disabled={isDisabled} text={isLoading ? 'Loading...' : 'Get cat'} type="submit" />

      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-4">
        <Image
          url={catImageUrl}
          alt="Random cat"
          className="max-w-full h-auto rounded-lg shadow-lg"
        />
      </div>

    </form>
  )
}
