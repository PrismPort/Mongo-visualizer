export function ChartLandscapeDiv({ children }) {
  return (
    <div className='aspect-[7/4] rounded-lg border-2 border-black p-12'>
      {children}
    </div>
  )
}
export function ChartPortraitDiv({ children }) {
  return (
    <div className='aspect-[3/4] rounded-lg border-2 border-black p-12'>
      {children}
    </div>
  )
}
