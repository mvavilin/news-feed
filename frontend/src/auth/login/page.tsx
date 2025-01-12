import LoginForm from '@/components/auth/login-form'
import AuthLayout from '../layout'

function LoginPage() {
  return (
    <AuthLayout children={<LoginForm />} />
  )
}

export default LoginPage