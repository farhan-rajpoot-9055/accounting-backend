import { Menu } from "lucide-react"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <button className="mr-4 lg:hidden">
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">OpenCode ERP</h1>
          </div>
        </div>
      </header>
      <div className="flex">
        <aside className="hidden lg:block w-64 border-r min-h-[calc(100vh-4rem)] p-4">
          <nav className="space-y-2">
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-accent">Dashboard</a>
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-accent">Sales</a>
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-accent">Purchases</a>
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-accent">Accounting</a>
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-accent">Inventory</a>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
