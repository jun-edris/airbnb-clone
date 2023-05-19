"use client";

import React from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
        toast.success("Registered Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <div>
        <Input
          register={register}
          id="email"
          label="Email"
          type="email"
          errors={errors}
          disabled={isLoading}
          required
        />
        {errors?.email?.type === "required" && (
          <small className="text-red-500 pl-4 capitalize">
            {errors?.email?.type}
          </small>
        )}
        {errors?.email?.message && (
          <small className="text-red-500 pl-4 capitalize">
            {errors?.email?.message?.toString()}
          </small>
        )}
      </div>
      <div>
        <Input
          register={register}
          id="name"
          label="Name"
          errors={errors}
          disabled={isLoading}
          required
        />
        {errors?.name?.type === "required" && (
          <small className="text-red-500 pl-4 capitalize">
            {errors?.name?.type}
          </small>
        )}
        {errors?.name?.message && (
          <small className="text-red-500 pl-4 capitalize">
            {errors?.name?.message?.toString()}
          </small>
        )}
      </div>
      <div>
        <Input
          register={register}
          id="password"
          label="Password"
          errors={errors}
          disabled={isLoading}
          required
          type="password"
        />
        {errors?.password?.type === "required" && (
          <small className="text-red-500 pl-4 capitalize">
            {errors?.password?.type}
          </small>
        )}

        {errors?.password?.message && (
          <small className="text-red-500 pl-4 capitalize">
            {errors?.password?.message?.toString()}
          </small>
        )}
      </div>
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
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className=" text-neutral-500 items-center mt-4 font-light">
        <div className="flex flex-row justify-center items-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={registerModal.onClose}
            className="text-neutral-800 cursor-pointer hover:underline font-semibold"
          >
            Log in
          </div>
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
