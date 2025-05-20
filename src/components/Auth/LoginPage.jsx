import Header from "../Header";
import Footer from "../Footer";
import Login from "./Login";
import LoginBenefits from "./LoginBenefits";

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="bg-[#212123] min-h-screen text-white font-inter">
        <Login /> 
        <LoginBenefits />
      </main>
      <Footer />
    </>
  );
}