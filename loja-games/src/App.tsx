import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ModalProvider } from "./context/modal";

export default function App() {
  return (
    <ModalProvider>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <main className="grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ModalProvider>
  );
}
