import { z } from "zod";
import "./index.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/authFetch";
import { queryClient } from "../../api/queryClient";
import { modalLoginState } from "../../store/slices";
import { useDispatch } from "react-redux";

export const LoginForm = () => {
  const LoginScheme = z.object({
    email: z.string().nonempty(),
    password: z.string().nonempty(),
  });

  type LoginForm = z.infer<typeof LoginScheme>;

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginScheme),
  });

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: LoginForm) => login(email, password),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      dispatch(modalLoginState());
    },
  });

  const errorFilter = (error: Error) => {
    if (error.message === `{"result":false}`) {
      return (
        <span className="login-form__error">неверный логин или пароль</span>
      );
    } else {
      if (error.message === "Not Found") {
        return <span className="login-form__error">Сервер не отвечает</span>;
      } else {
        return <span className="login-form__error">{error.message}</span>;
      }
    }
  };

  return (
    <form
      className="login-form"
      onSubmit={handleSubmit(({ email, password }) =>
        loginMutation.mutate({ email: email, password: password })
      )}
    >
      <label className="login-form__label">
        <input
          type="text"
          className={`login-form__input ${errors.email && `error`} ${
            loginMutation.error && `error`
          }`}
          placeholder="Электронная почта"
          {...register("email")}
        />
        <svg
          className={`login-form__svg ${errors.email && `error`} ${
            loginMutation.error && `error`
          } `}
          width="22"
          height="18"
          viewBox="0 0 22 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 0C21.5523 0 22 0.44772 22 1V17.0066C22 17.5552 21.5447 18 21.0082 18H2.9918C2.44405 18 2 17.5551 2 17.0066V16H20V4.3L12 11.5L2 2.5V1C2 0.44772 2.44772 0 3 0H21ZM8 12V14H0V12H8ZM5 7V9H0V7H5ZM19.5659 2H4.43414L12 8.8093L19.5659 2Z"
            fill="black"
            fillOpacity="0.4"
          />
        </svg>
      </label>
      <label className="login-form__label">
        <input
          type="password"
          className={`login-form__input ${errors.password && `error`} ${
            loginMutation.error && `error`
          }`}
          placeholder="Пароль"
          {...register("password")}
        />
        <svg
          className={`login-form__svg ${errors.password && `error`} ${
            loginMutation.error && `error`
          } `}
          width="22"
          height="13"
          viewBox="0 0 22 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.917 7.75C11.441 10.5877 8.973 12.75 6 12.75C2.68629 12.75 0 10.0637 0 6.75C0 3.43629 2.68629 0.75 6 0.75C8.973 0.75 11.441 2.91229 11.917 5.75H22V7.75H20V11.75H18V7.75H16V11.75H14V7.75H11.917ZM6 10.75C8.20914 10.75 10 8.9591 10 6.75C10 4.54086 8.20914 2.75 6 2.75C3.79086 2.75 2 4.54086 2 6.75C2 8.9591 3.79086 10.75 6 10.75Z"
            fill="black"
            fillOpacity="0.4"
          />
        </svg>
      </label>
      {loginMutation.error && errorFilter(loginMutation.error)}
      <button className="login-form__btn" disabled={loginMutation.isPending}>
        Войти
      </button>
    </form>
  );
};
