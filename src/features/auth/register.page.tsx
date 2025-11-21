import { Link } from "react-router-dom";
import { AuthLayout } from "./auth-layout";
import { ROUTES } from "@/shared/model/routes";
import { RegisterForm } from "./register-form";

function RegisterPage() {
  return (
    <AuthLayout
      title="Регистрация"
      description="Введите ваш email и пароль для регистрации в системе"
      footerText={
        <>Есть аккаунт? <Link to={ROUTES.LOGIN}>Войти</Link></>
      }
      form={<RegisterForm />}
    >
    </AuthLayout>
  )
}

export const Component = RegisterPage;