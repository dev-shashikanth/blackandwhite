import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    // <div className="flex w-full h-screen">
    //   {/* Left Side: Image */}
    //   <div
    //     className="w-1/2 hidden md:block bg-cover bg-center"
    //     style={{
    //       backgroundImage: "url(/assets/images/blackandwhite.jpeg)",
    //     }}
    //   ></div>

    //   {/* Right Side: Form */}
    //   <div className="md:w-1/2 flex items-center justify-center bg-white p-6">
    //     <div className="w-full max-w-md p-8 bg-white">{children}</div>
    //   </div>
    // </div>
    <div className="flex w-full h-screen items-center justify-center bg-black">
      <div className="flex h-screen items-center justify-center bg-white p-6">
        <div className="w-full max-w-md p-8 bg-white">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
