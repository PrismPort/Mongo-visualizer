function ChartLandscapeDiv({ children }) {
  return (
    <div className='aspect-[7/4] rounded-lg border-2 border-black border-solid p-2'>
      {children}
    </div>
  )
}

function ChartPortraitDiv({ children }) {
  return (
    <div className='aspect-[3/4] rounded-lg border-2 border-black border-solid p-2'>
      {children}
    </div>
  )
}

function ChartPortraitDivRed({ children }) {
  return (
    <div className='aspect-[3/4] rounded-lg border-black border-solid border-2 bg-red-500 p-2'>
      {children}
    </div>
  )
}

export { ChartLandscapeDiv, ChartPortraitDiv, ChartPortraitDivRed };
