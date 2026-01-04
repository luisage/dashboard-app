'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function Search() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
  placeholder="Filtrar por nombre..."
  onChange={(e) => handleSearch(e.target.value)}
  defaultValue={searchParams.get('query')?.toString()}
  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
/>
    </div>
  )
}