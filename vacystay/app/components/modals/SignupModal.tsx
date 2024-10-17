"use client";
import Modal from "./Modals";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSignupModal from "@/app/hooks/useSingupModal";
import CustomButtons from "../forms/CustomButtons";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";
const SignupModal = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const signupModal = useSignupModal();
  // const [showModal, setShowModal] = useState();

  const submitSignup = async () => {
    const formData = {
      email: email,
      password1: password1,
      password2: password2,
    };
    const response = await apiService.postWithoutToken("/api/auth/register/",(formData));
    if (response.access) {
      //handellogin 
      handleLogin(response.user.pk,response.access,response.refresh)
      signupModal.close();
      router.push("/");
    } else {
      const tmpErrors: string[] = Object.values(response).map((error: any) => {
        return error;
      });

      setErrors(tmpErrors)
    }
  };
  const content = (
    <>
      <form className="space-y-4" onSubmit={submitSignup}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email address"
          className="w-full px-4 h-[54px] border border-gray-100 rounded-xl"
        />
        <input
          onChange={(e) => setPassword1(e.target.value)}
          type="password"
          placeholder="password"
          className="w-full px-4 h-[54px] border border-gray-100 rounded-xl"
        />
        <input
          onChange={(e) => setPassword2(e.target.value)}
          type="password"
          placeholder="repeat password"
          className="w-full px-4 h-[54px] border border-gray-100 rounded-xl"
        />
        {errors.map((error, index) => {
          return (
            <div
              key={`error_${index}`}
              className="p-5 bg-airbnb text-white rounded-xl opacity-80"
            >
              Error: {error}
            </div>
          );
        })}

        <CustomButtons
          label="submit"
          onClick={submitSignup}
        />
      </form>
    </>
  );
  return (
    <Modal
      isOpen={signupModal.isOpen}
      close={signupModal.close}
      label="Signup"
      content={content}
    />
  );
};
export default SignupModal;
