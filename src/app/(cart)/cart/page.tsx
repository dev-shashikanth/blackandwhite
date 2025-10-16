"use client";
import { useSession } from "next-auth/react";
import React from "react";

const page = () => {
  const { data: session, status } = useSession();

  console.log("session data in cart page", session, status);
  return <div>Card page</div>;
};

export default page;
