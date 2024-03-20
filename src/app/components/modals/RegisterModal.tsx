"use client";

import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { register } from "@/app/api/register";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      axios
        .post("http://localhost:5000/accounts/create", {
          email: data.email,
          password: data.password,
          name: data.name,
          phonenumber: data.phonenumber,
          address: data.address,
        })
        .then(function (res) {
          console.log("Create new success!!!");
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    } catch (error) {
      console.error("An error occurred while trying to register:", error);
    }
    registerModal.onClose();
    setIsLoading(false);
  };

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to DreamShare"
        subtitle="Create an account"
        center
      />
      <Input
        id="email"
        label="* Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="* Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <div>Additional Information</div>
      <Input
        id="name"
        label="* Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="phonenumber"
        label="Phone Number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="address"
        label="Address"
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
      <div className="justify-center flex flex-row item-center gap-2">
        <div>Already have an account?</div>
        <div
          onClick={onToggle}
          className="
            text-rose-500
            cursor-pointer
            hover:underline
          "
        >
          Log in
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
