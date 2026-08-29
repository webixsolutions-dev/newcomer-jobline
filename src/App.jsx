import AppRoutes from "./routes/AppRoutes"
import { AuthProvider } from "./dashboard/auth/AuthContext"
import { SavedJobsProvider } from "./lib/SavedJobsContext"

function App() {
  return (
    <AuthProvider>
      <SavedJobsProvider>
        <AppRoutes />
      </SavedJobsProvider>
    </AuthProvider>
  )
}

export default App
