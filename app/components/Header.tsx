export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
      <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Dashboard / General</h2>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">JD</div>
      </div>
    </header>
  )
}