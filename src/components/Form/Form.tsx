import { FormEvent, useState } from 'react'
import { Button } from './Button'
import { Input } from './Input'
import { Image } from '../Image'

export const Form = () => {
  const [catImageUrl, setCatImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRandomCat = async (evt: FormEvent) => {
    evt.preventDefault()

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search')

      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      const data = await response.json()

      setCatImageUrl(data[0].url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error...');
      setCatImageUrl(null);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className='flex flex-col gap-4' onClick={fetchRandomCat}>
      <Input title="Enabled" type="checkbox" />
      <Input title="Auto-refrech every 5 second" type="checkbox" />
      <Button text={isLoading ? 'Loading...' : 'Get cat'} type="submit" />

      {error && <p className="text-red-500">{error}</p>}

      {catImageUrl && (
        <div className="mt-4">
          <Image
            url={catImageUrl}
            alt="Random cat"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      )}
    </form>
  )
}
