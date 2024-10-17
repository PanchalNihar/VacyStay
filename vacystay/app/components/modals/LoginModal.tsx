"use client";
import Modal from "./Modals";
import { useState } from "react";
import { useRouter } from "next/navigation";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";
import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButtons from "../forms/CustomButtons";

const LoginModal = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const loginModal = useLoginModal();
  // const [showModal, setShowModal] = useState(false);

  const submitLogin = async () => {
    const formdata = {
      email: email,
      password: password
    };
    
    try {
      const response = await apiService.postWithoutToken("/api/auth/login/", (formdata));

      if (response.access) {
        // Handle login
        handleLogin(response.user.pk, response.access, response.refresh);
        loginModal.close();
        router.push("/");
      } else {
        // Ensure response.errors is an array
        setErrors(Array.isArray(response.errors) ? response.errors : []);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrors(["An unexpected error occurred."]);
    }
  };

  const content = (
    <>
      <form onSubmit={(e) => { e.preventDefault(); submitLogin(); }} className="space-y-4">
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email address"
          className="w-full px-4 h-[54px] border border-gray-100 rounded-xl"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          className="w-full px-4 h-[54px] border border-gray-100 rounded-xl"
        />
        {errors.length > 0 && errors.map((error, index) => (
          <div
            key={`error_${index}`}
            className="p-5 bg-airbnb text-white rounded-xl opacity-80"
          >
            Error: {error}
          </div>
        ))}
        <CustomButtons label="submit" onClick={submitLogin} />
      </form>
    </>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      close={loginModal.close}
      label="login"
      content={content}
    />
  );
};

export default LoginModal;
