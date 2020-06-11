import { useState, useEffect } from 'react'

function useDebounce(value: any, delay = 300) {
  const [ debouncedValue, setDebouncedValue ] = useState(value)
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    // 清除副作用
    // 在下次 update 的时候执行
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}
export default useDebounce;