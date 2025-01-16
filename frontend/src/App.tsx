import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "@/pages/auth/login/Page"
import RegisterPage from "@/pages/auth/register/Page"
import HomePage from "@/pages/home/Page"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*  */}
        <Route path="/" element={<RegisterPage />} />
        {/*  */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/*" element={<h1>Not Found</h1>} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App