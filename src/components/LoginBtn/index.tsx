import { useDispatch } from "react-redux";
import { modalLoginState } from "../../store/slices";
import "./index.scss";

export const LoginBtn = () => {
  const dispatch = useDispatch();

  const handleLoginBtn = () => {
    dispatch(modalLoginState());
  };

  return (
    <>
      <button className="login-btn" onClick={handleLoginBtn}>
        Войти
      </button>
      <button className="login-btn-mobile" onClick={handleLoginBtn}>
        <svg
          width="16"
          height="21"
          viewBox="0 0 16 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 21C0 16.5817 3.58172 13 8 13C12.4183 13 16 16.5817 16 21H14C14 17.6863 11.3137 15 8 15C4.68629 15 2 17.6863 2 21H0ZM8 12C4.685 12 2 9.315 2 6C2 2.685 4.685 0 8 0C11.315 0 14 2.685 14 6C14 9.315 11.315 12 8 12ZM8 10C10.21 10 12 8.21 12 6C12 3.79 10.21 2 8 2C5.79 2 4 3.79 4 6C4 8.21 5.79 10 8 10Z"
            fill="white"
          />
        </svg>
      </button>
    </>
  );
};
