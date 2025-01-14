import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "@/pages/auth/login/page"
import RegisterPage from "@/pages/auth/register/page"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ! */}
        <Route path="/" element={<RegisterPage />} />

        <Route path="/home" element={<h1>Home</h1>} />
        <Route path="/*" element={<h1>Not Found</h1>} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App