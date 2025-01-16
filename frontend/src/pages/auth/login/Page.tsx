import LoginForm from "@/components/auth/LoginForm"
import AuthLayout from "@/pages/auth/Layout"

function LoginPage() { return (<AuthLayout children={<LoginForm />} />) }

export default LoginPage