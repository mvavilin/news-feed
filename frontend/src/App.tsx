import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "@/pages/auth/login/Page"
import RegisterPage from "@/pages/auth/register/Page"
import HomePage from "@/pages/home/Page"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*  */}
        <Route path="/" element={<LoginPage />} />
        {/*  */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/*" element={<h1>Not Found</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App