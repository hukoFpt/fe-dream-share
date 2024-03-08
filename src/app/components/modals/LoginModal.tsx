"use client";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

import { login } from '@/app/api/login';

const LoginModal = () => {
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

    try {
      console.log(data.email, data.password);
      const response = await fetch(
        `https://65cd13f5dd519126b8401401.mockapi.io/signin`
      );

      if (!response.ok) {
        console.log("Login failed");
        return;
      }

      const users = await response.json();

      const user = users.find(
        (user: any) => user.email === data.email && user.password === data.password
      );

      if (user) {
        console.log("Login successful");
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log(user);
        window.location.reload();
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("An error occurred while trying to login:", error);
    }
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
      console.log(email, password);
      const response = await fetch(
        `https://65cd13f5dd519126b8401401.mockapi.io/signin`
      );

      if (!response.ok) {
        console.log("Login failed");
        return;
      }

      const users = await response.json();

      const user = users.find(
        (user: any) => user.email === email && user.password === password
      );

      if (user) {
        console.log("Login successful");
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log(user);
        window.location.reload();
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("An error occurred while trying to login:", error);
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
