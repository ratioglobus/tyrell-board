import { Link } from "react-router-dom";
import { AuthLayout } from "./auth-layout";
import { ROUTES } from "@/shared/model/routes";
import { LoginForm } from "./login-form";
// import { rqClient } from "@/shared/api/instance";

function LoginPage() {
  // const loginMutation = rqClient.useMutation("post", "/auth/login");
  // loginMutation.mutate()
  return (
    <AuthLayout
      title="Вход в систему"
      description="Введите ваш email и пароль для входа в систему"
      footerText={
        <>Нет аккаунта? <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link></>
      }
      form={<LoginForm />}
    >
    </AuthLayout>
  )
}

export const Component = LoginPage;