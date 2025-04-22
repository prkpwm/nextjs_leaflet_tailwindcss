import { NextPage } from "next";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

type AuthProps = {
  language: string;
  onPageChange: (page: string) => void;
};

export type AuthMessages = {
  loginTitle: { TH: string; EN: string };
  registerTitle: { TH: string; EN: string };
  welcomeBack: { TH: string; EN: string };
  createAccount: { TH: string; EN: string };
  loginDescription: { TH: string; EN: string };
  registerDescription: { TH: string; EN: string };
  namePlaceholder: { TH: string; EN: string };
  emailPlaceholder: { TH: string; EN: string };
  passwordPlaceholder: { TH: string; EN: string };
  confirmPasswordPlaceholder: { TH: string; EN: string };
  loginButton: { TH: string; EN: string };
  registerButton: { TH: string; EN: string };
  noAccount: { TH: string; EN: string };
  registerLink: { TH: string; EN: string };
  haveAccount: { TH: string; EN: string };
  loginLink: { TH: string; EN: string };
  passwordMismatch: { TH: string; EN: string };
  loginSuccess: { TH: string; EN: string };
  registerSuccess: { TH: string; EN: string };
  authError: { TH: string; EN: string };
};


export const Auth: NextPage<AuthProps> = ({ language, onPageChange }) => {
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const authMessages:AuthMessages = {
    loginTitle: { TH: "เข้าสู่ระบบ", EN: "LOGIN" },
    registerTitle: { TH: "ลงทะเบียน", EN: "REGISTER" },
    welcomeBack: { TH: "ยินดีต้อนรับกลับ!", EN: "Welcome Back!" },
    createAccount: { TH: "สร้างบัญชีของคุณ", EN: "Create Your Account" },
    loginDescription: { TH: "เข้าสู่ระบบเพื่อเข้าถึงบัญชีของคุณ", EN: "Log in to access your account." },
    registerDescription: { TH: "ลงทะเบียนเพื่อสำรวจประสบการณ์ที่น่าทึ่ง", EN: "Sign up to explore amazing experiences." },
    namePlaceholder: { TH: "ชื่อ", EN: "Name" },
    emailPlaceholder: { TH: "อีเมล", EN: "Email" },
    passwordPlaceholder: { TH: "รหัสผ่าน", EN: "Password" },
    confirmPasswordPlaceholder: { TH: "ยืนยันรหัสผ่าน", EN: "Confirm Password" },
    loginButton: { TH: "เข้าสู่ระบบ", EN: "Login" },
    registerButton: { TH: "ลงทะเบียน", EN: "Register" },
    noAccount: { TH: "ไม่มีบัญชี?", EN: "Don't have an account?" },
    registerLink: { TH: "ลงทะเบียน", EN: "Register" },
    haveAccount: { TH: "มีบัญชีอยู่แล้ว?", EN: "Already have an account?" },
    loginLink: { TH: "เข้าสู่ระบบ", EN: "Login" },
    passwordMismatch: { TH: "รหัสผ่านไม่ตรงกัน", EN: "Passwords do not match" },
    loginSuccess: { TH: "เข้าสู่ระบบสำเร็จ!", EN: "Logged in successfully!" },
    registerSuccess: { TH: "ลงทะเบียนสำเร็จ!", EN: "Registration successful!" },
    authError: { TH: "เกิดข้อผิดพลาดในการตรวจสอบสิทธิ์", EN: "Authentication error" },
  }  
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    if (authMode === "register" && password !== confirmPassword) {
      setErrorMessage(authMessages.passwordMismatch[language]);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        authMode === "login" ? "http://localhost:4200/login" : "http://localhost:4200/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            authMode === "login" ? { email, password } : { name, email, password }
          ),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (authMode === "login") {
          setSuccessMessage(authMessages.loginSuccess[language]);
          // Simulate successful login and navigate to home
          setTimeout(() => {
            onPageChange('collectibles');
          }, 1500);
        } else if (authMode === "register") {
          setSuccessMessage(authMessages.registerSuccess[language]);
          setAuthMode("login");
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        }
      } else {
        setErrorMessage(data.message || authMessages.authError[language]);
        console.error("Authentication error:", data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setErrorMessage(authMessages.authError[language]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });



  return (
    <div className="flex justify-center md:flex-row flex-col mt-20 mb-10 mx-10">
      <form
        id="authForm"
        onSubmit={handleAuthSubmit}
        ref={ref}
        className={`flex flex-col items-start min-w-[300px] transition-all duration-[1500ms] ${
          inView ? "opacity-100" : "opacity-0"
        }`}
      >
        <h4 className="text-xs lg:text-sm mt-10 mb-5 font-heading w-full tracking-[10px] font-semibold">
          {authMode === "login" ? authMessages.loginTitle[language] : authMessages.registerTitle[language]}
        </h4>
        <h3 className="text-3xl lg:text-4xl mb-10 tracking-wide w-full capitalize font-extrabold">
          {authMode === "login" ? authMessages.welcomeBack[language] : authMessages.createAccount[language]}
        </h3>
        <p className="max-w-[400px]">
          {authMode === "login" ? authMessages.loginDescription[language] : authMessages.registerDescription[language]}
        </p>

        {authMode === "register" && (
          <input
            required
            type="text"
            placeholder={authMessages.namePlaceholder[language]}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 transition-all text-black shadow-md w-full rounded-2xl placeholder:italic focus:outline-none border-2 border-transparent hover:border-primary focus:border-primary bg-stone-100 my-4 mt-10"
          />
        )}
        <input
          required
          type="email"
          placeholder={authMessages.emailPlaceholder[language]}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 transition-all text-black shadow-md w-full rounded-2xl placeholder:italic focus:outline-none border-2 border-transparent hover:border-primary focus:border-primary bg-stone-100 my-4"
        />
        <input
          required
          type="password"
          placeholder={authMessages.passwordPlaceholder[language]}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 transition-all text-black shadow-md w-full rounded-2xl placeholder:italic focus:outline-none border-2 border-transparent hover:border-primary focus:border-primary bg-stone-100 my-4"
        />
        {authMode === "register" && (
          <input
            required
            type="password"
            placeholder={authMessages.confirmPasswordPlaceholder[language]}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-4 py-2 transition-all text-black shadow-md w-full rounded-2xl placeholder:italic focus:outline-none border-2 border-transparent hover:border-primary focus:border-primary bg-stone-100 my-4"
          />
        )}
        <button
          className="my-4 px-6 py-2 rounded-2xl bg-secondary hover:bg-secondaryLighter text-white font-medium"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Processing..."
            : authMode === "login"
            ? authMessages.loginButton[language]
            : authMessages.registerButton[language]}
        </button>
        <p className="mt-4">
          {authMode === "login" ? (
            <>
              {authMessages.noAccount[language]}{" "}
              <button
                type="button"
                onClick={() => setAuthMode("register")}
                className="text-primary font-medium"
              >
                {authMessages.registerLink[language]}
              </button>
            </>
          ) : (
            <>
              {authMessages.haveAccount[language]}{" "}
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className="text-primary font-medium"
              >
                {authMessages.loginLink[language]}
              </button>
            </>
          )}
        </p>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
      </form>
    </div>
  );
};

export default Auth;