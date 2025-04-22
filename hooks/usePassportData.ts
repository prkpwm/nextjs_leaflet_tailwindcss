import { useState, useEffect } from 'react'

const usePassportData = () => {
  const [passport, setPassport] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/passport.json')
        if (!response.ok) throw new Error('Failed to fetch data')
        const data = await response.json()
        setPassport(data.passport)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { passport, loading, error }
}

export default usePassportData