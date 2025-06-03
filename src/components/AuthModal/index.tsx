import { useEffect, useRef, useState } from "react";
import "./index.scss";
import { useDispatch } from "react-redux";
import { modalLoginState } from "../../store/slices";
import { useModalState } from "../../api/selectors";
import { LoginForm, RegisterForm, RegisterSuccessForm } from "..";

export const AuthModal = () => {
  const [formType, setFormType] = useState("login");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const modal = useModalState();
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleChangeForm = () => {
    if (formType === "register") {
      setFormType("login");
    } else {
      setFormType("register");
    }
  };

  const handleCloseBtn = () => {
    dispatch(modalLoginState());
    setRegisterSuccess(false);
    setFormType("login");
  };

  const handleClickOutside = (event: Event) => {
    if (
      modalRef.current &&
      event.target instanceof Node &&
      !modalRef.current.contains(event.target)
    ) {
      handleCloseBtn();
    }
  };

  useEffect(() => {
    if (modal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modal]);

  if (modal) {
    return (
      <div className="modal-bg">
        <div className="auth-modal" ref={modalRef}>
          <button className="auth-modal__close-btn" onClick={handleCloseBtn}>
            <svg
              width="20"
              height="19"
              viewBox="0 0 20 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.5859 9.25L0.792969 1.45706L2.20718 0.0428467L10.0001 7.8357L17.793 0.0428467L19.2072 1.45706L11.4143 9.25L19.2072 17.0428L17.793 18.4571L10.0001 10.6642L2.20718 18.4571L0.792969 17.0428L8.5859 9.25Z"
                fill="black"
              />
            </svg>
          </button>
          <img className="auth-modal__logo" src="/auth-logo.svg" alt="" />

          {registerSuccess ? (
            <RegisterSuccessForm
              setFormType={setFormType}
              setRegisterSuccess={setRegisterSuccess}
            />
          ) : formType === "login" ? (
            <LoginForm />
          ) : (
            <RegisterForm setRegisterSuccess={setRegisterSuccess} />
          )}

          {!registerSuccess && (
            <button className="auth-modal__form-btn" onClick={handleChangeForm}>
              {formType === "register" ? "У меня есть пароль" : "Регистрация"}
            </button>
          )}
        </div>
      </div>
    );
  } else {
    <></>;
  }
};
