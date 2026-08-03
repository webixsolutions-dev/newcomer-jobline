import AppRoutes from "./routes/AppRoutes"
import { AuthProvider } from "./dashboard/auth/AuthContext"

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
