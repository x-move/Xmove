export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground gap-4">
      <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      <div className="text-center">
        <h2 className="text-xl font-bold text-primary">X-Move</h2>
        <p className="text-sm text-muted-foreground">Preparing your experience...</p>
      </div>
    </div>
  )
}