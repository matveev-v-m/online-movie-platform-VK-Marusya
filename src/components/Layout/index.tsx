import { Outlet } from "react-router-dom";
import { Footer, Header, AuthModal } from "..";

export const Layout = () => {
  return (
    <>
      <AuthModal />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
