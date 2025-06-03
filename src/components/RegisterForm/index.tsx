import { z } from "zod";
import "./index.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/authFetch";

interface RegisterFormProps {
  setRegisterSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegisterForm = ({ setRegisterSuccess }: RegisterFormProps) => {
  const RegisterScheme = z
    .object({
      email: z.string().email().nonempty(),
      name: z.string().min(2).nonempty(),
      surname: z.string().min(2).nonempty(),
      password: z
        .string()
        .min(8, "Пароль должен содержать не менее 8 символов")
        .nonempty(),
      confirmPassword: z
        .string()
        .min(8, "Пароль должен содержать не менее 8 символов")
        .nonempty(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Пароли не совпадают",
      path: ["confirmPassword"],
    });

  type RegisterForm = z.infer<typeof RegisterScheme>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: zodResolver(RegisterScheme) });

  const registerMutation = useMutation({
    mutationFn: ({ email, name, surname, password }: RegisterForm) =>
      registerUser({ email, name, surname, password }),
    onSuccess() {
      setRegisterSuccess(true);
    },
  });

  const errorFilter = (error: Error) => {
    if (JSON.parse(error.message).error === "User already exists") {
      return (
        <span className="register-form__error">
          Пользователь с таким email уже существует
        </span>
      );
    } else {
      if (error.message === "Not Found") {
        return <span className="register-form__error">Сервер не отвечает</span>;
      } else {
        return <span className="register-form__error">{error.message}</span>;
      }
    }
  };

  return (
    <form
      className="register-form"
      onSubmit={handleSubmit(({ email, name, surname, password }) => {
        registerMutation.mutate({
          email: email,
          password: password,
          name: name,
          surname: surname,
          confirmPassword: password,
        });
      })}
    >
      <label className="register-form__label">
        <input
          className={`register-form__input ${errors.email && `error`} `}
          type="text"
          placeholder="Электронная почта"
          {...register("email")}
        />
        <svg
          className={`register-form__svg ${errors.email && `error`} `}
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
      <label className="register-form__label">
        <input
          className={`register-form__input ${errors.name && `error`}`}
          type="text"
          placeholder="Имя"
          {...register("name")}
        />
        <svg
          className={`register-form__svg ${errors.name && `error`} `}
          width="16"
          height="22"
          viewBox="0 0 16 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 21.75C0 17.3317 3.58172 13.75 8 13.75C12.4183 13.75 16 17.3317 16 21.75H14C14 18.4363 11.3137 15.75 8 15.75C4.68629 15.75 2 18.4363 2 21.75H0ZM8 12.75C4.685 12.75 2 10.065 2 6.75C2 3.435 4.685 0.75 8 0.75C11.315 0.75 14 3.435 14 6.75C14 10.065 11.315 12.75 8 12.75ZM8 10.75C10.21 10.75 12 8.96 12 6.75C12 4.54 10.21 2.75 8 2.75C5.79 2.75 4 4.54 4 6.75C4 8.96 5.79 10.75 8 10.75Z"
            fill="black"
            fillOpacity="0.4"
          />
        </svg>
      </label>
      <label className="register-form__label">
        <input
          className={`register-form__input ${errors.surname && `error`}`}
          type="text"
          placeholder="Фамилия"
          {...register("surname")}
        />
        <svg
          className={`register-form__svg ${errors.surname && `error`}`}
          width="16"
          height="22"
          viewBox="0 0 16 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 21.75C0 17.3317 3.58172 13.75 8 13.75C12.4183 13.75 16 17.3317 16 21.75H14C14 18.4363 11.3137 15.75 8 15.75C4.68629 15.75 2 18.4363 2 21.75H0ZM8 12.75C4.685 12.75 2 10.065 2 6.75C2 3.435 4.685 0.75 8 0.75C11.315 0.75 14 3.435 14 6.75C14 10.065 11.315 12.75 8 12.75ZM8 10.75C10.21 10.75 12 8.96 12 6.75C12 4.54 10.21 2.75 8 2.75C5.79 2.75 4 4.54 4 6.75C4 8.96 5.79 10.75 8 10.75Z"
            fill="black"
            fillOpacity="0.4"
          />
        </svg>
      </label>
      <label className="register-form__label">
        <input
          className={`register-form__input ${errors.password && `error`}`}
          type="password"
          placeholder="Пароль"
          {...register("password")}
        />
        <svg
          className={`register-form__svg ${errors.password && `error`} `}
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
      <label className="register-form__label">
        <input
          className={`register-form__input ${
            errors.confirmPassword && `error`
          }`}
          type="password"
          placeholder="Подтвердите пароль"
          {...register("confirmPassword")}
        />
        <svg
          className={`register-form__svg ${errors.confirmPassword && `error`} `}
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
      {registerMutation.error && errorFilter(registerMutation.error)}
      {errors.confirmPassword && (
        <p className="register-form__error">{errors.confirmPassword.message}</p>
      )}
      <button
        className="register-form__btn"
        disabled={registerMutation.isPending}
      >
        Создать аккаунт
      </button>
    </form>
  );
};
