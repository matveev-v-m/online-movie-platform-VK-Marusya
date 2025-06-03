import "./index.scss";

interface RegisterSuccessFormProps {
  setFormType: React.Dispatch<React.SetStateAction<string>>;
  setRegisterSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegisterSuccessForm = ({
  setFormType,
  setRegisterSuccess,
}: RegisterSuccessFormProps) => {
  const handleBtnLogin = () => {
    setFormType("login");
    setRegisterSuccess(false);
  };

  return (
    <div className="register-success">
      <h3 className="register-success__title">Регистрация завершена</h3>
      <p className="register-success__text">
        Используйте вашу электронную почту для входа
      </p>
      <button className="register-success__btn" onClick={handleBtnLogin}>
        Войти
      </button>
    </div>
  );
};
