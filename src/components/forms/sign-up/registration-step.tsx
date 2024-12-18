"use client";
import { useAuthContextHook } from "@/context/user-auth-context";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import TypeSelectionForm from "./type-selection-form";
import { Spinner } from "@/components/spinner";
import dynamic from "next/dynamic";

type Props = {};

const SpinnerWrapper = () => {
  return <Spinner />;
};

const DetailForm = dynamic(() => import("./account-details-form"), {
  ssr: false,
  loading: SpinnerWrapper,
});

const OTPForm = dynamic(() => import("./otp-form"), {
  ssr: false,
  loading: SpinnerWrapper,
});

const RegistrationFormStep = (props: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { currentStep } = useAuthContextHook();
  const [onOTP, setOnOTP] = useState<string>("");
  const [onUserType, setOnUserType] = useState<"owner" | "student">("owner");

  setValue("otp", onOTP);

  switch (currentStep) {
    case 1:
      return (
        <TypeSelectionForm
          register={register}
          userType={onUserType}
          setUserType={setOnUserType}
        />
      );
    case 2:
      return <DetailForm register={register} errors={errors} />;
    case 3:
      return <OTPForm onOTP={onOTP} setOnOTP={setOnOTP} />;
  }
  return <div></div>;
};

export default RegistrationFormStep;
