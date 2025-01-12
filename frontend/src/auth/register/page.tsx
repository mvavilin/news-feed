import RegisterForm from '@/components/auth/register-form';
import AuthLayout from '../layout';

function RegisterPage() {
  return (
    <AuthLayout children={<RegisterForm />} />
  )
}

export default RegisterPage