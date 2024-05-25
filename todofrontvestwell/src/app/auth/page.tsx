"use client";
import Image from "next/image";
import images from "../../../public/images";
import { useState } from "react";
import { SignUp } from "@/components/auth/signup/signUp";
import { SignIn } from "@/components/auth/signin/signIn";

const Auth = () => {
  const [hasAccount, setHasAccount] = useState(true);

  return (
    <section className="w-full h-[950px] flex justify-center">
      <div className="w-[1400px] pt-[60px] h-[900px] flex justify-center">
        <div className="w-1/2 flex justify-center">
          <Image
            src={hasAccount ? images.day : images.night}
            alt="signin"
            width={561}
            height={840}
            priority={true}
            className="rounded-lg w-auto h-auto"
          />
        </div>
        <div className="flex justify-center flex-col w-1/2 border-solid border-[1px] border-[#EBEBEB] h-full rounded-[16px] p-[50px]">
          {hasAccount ? <SignIn /> : <SignUp />}
          <div className="flex justify-between items-center">
            <hr className="w-[45%]" />
            <span className="text-[#7E7E7E]">or</span>
            <hr className="w-[45%]" />
          </div>
          <div className="flex justify-center">
            <p>
              {(hasAccount ? "Don't have " : "Have ") + "an account? "}
              <a
                onClick={() => setHasAccount((prev) => !prev)}
                className="text-sky-700"
              >
                {hasAccount ? "Sign up" : "Sign in"}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Auth;
