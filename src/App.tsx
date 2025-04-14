function App() {
  return (
    <>
      <div className='flex flex-col gap-12 items-center justify-center min-h-screen'>
        <form className='flex flex-col gap-4'>
          <label className='flex gap-2 items-baseline text-2xl font-sans'>
            <input className='w-6 h-6' type="checkbox" />
            <span>Enabled</span>
          </label>
          <label className='flex gap-2 items-baseline text-2xl font-sans'>
            <input className='w-6 h-6' type="checkbox" />
            <span>Auto-refrech every 5 second</span>
          </label>

          <button className="border border-blue-300 bg-blue-200 text-gray-900 text-2xl p-4 border-solid font-sans" type="submit">Get cat</button>
        </form>

        <div className='w-64 h-64 border border-blue-300 bg-blue-200'>
          <img className='object-cover max-w-full h-auto' src="https://placehold.co/256x256" width={256} height={256} alt="" />
        </div>
      </div>
    </>
  )
}

export default App
