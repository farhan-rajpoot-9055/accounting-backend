import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProviders } from './app/providers'
import { AppShell } from './components/layout/app-shell'
import { Button } from './components/ui/button'
import './index.css'
import './styles/design-tokens.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders>
      <AppShell>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-muted-foreground">Welcome to OpenCode ERP SaaS</p>
          <Button>Get Started</Button>
        </div>
      </AppShell>
    </AppProviders>
  </React.StrictMode>,
)
