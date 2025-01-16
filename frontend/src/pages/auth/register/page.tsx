import RegisterForm from "@/components/auth/RegisterForm"
import AuthLayout from "@/pages/auth/Layout"

function RegisterPage() { return (<AuthLayout children={<RegisterForm />} />) }

export default RegisterPage