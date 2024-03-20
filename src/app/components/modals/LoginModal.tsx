"use client";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

import { login } from "@/app/api/login";

const LoginModal = () => {
  const currentUser = localStorage.getItem("currentUser");

  if (currentUser && typeof currentUser === "string") {
    try {
      const user = JSON.parse(currentUser);
      console.log(user);
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  } else {
    console.log("No user is currently logged in");
  }

  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data.email, data.password);
    login(data.email, data.password);
  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" center />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <div
        className="
      text-neutral-500 text-center mt-4 font-light"
      >
        <p>
          First time using DreamShare?
          <span
            onClick={onToggle}
            className="
              text-rose-500
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            Create an account
          </span>
        </p>
      </div>
    </div>
  );

  async function login(email: string, password: string) {
    try {
      const response = await axios.post("http://localhost:5000/accounts", {
        email,
        password,
      });
      localStorage.clear();
      console.log("response login", response.data.data);
      const user = response.data.data[0][0];
      console.log("user", user);
      if (user === undefined) {
        localStorage.clear();
        console.log("login failed");
      } else {
        // Store the user data in localStorage
        localStorage.setItem("currentUser", JSON.stringify(user));
        console.log("Login success:", user);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
