"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";

const boomerangVariants = {
  initial: { x: 150, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  exit: {
    x: -150,
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};
const LoginPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsSubmitting(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    console.log("sign in result", result);

    if (result?.error) {
      toast({
        title: "Login failed",
        description: "Incorrect email or password",
        variant: "destructive",
      });
      return; // Stops execution if login fails
    }

    toast({
      title: "Login successful",
      description: "Welcome back!",
      variant: "success",
    });

    setIsSubmitting(false);
    setTimeout(() => {
      router.push("/"); // Redirect after showing toast
    }, 1000);
  }

  return (
    <motion.div
      className="overflow-hidden w-full max-w-sm p-6 bg-white"
      variants={boomerangVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Form {...form}>
        <div className="flex flex-col items-center mb-6 space-y-6">
          <p className=" text-2xl">Login</p>
          {/* <Avatar className="h-16 w-16">
            <AvatarImage src="/assets/icons/b&wicon.ico" />
            <AvatarFallback>B&W</AvatarFallback>
          </Avatar> */}
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            {isSubmitting ? (
              <Button size="sm" disabled>
                <Loader2Icon className="animate-spin" />
                Submitting...
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
            <Button
              type="button"
              className="block align-right"
              variant="link"
              onClick={() => router.push("/forgot-password")}
            >
              forgot password?
            </Button>
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              className="block align-right"
              variant="link"
              onClick={() => router.push("/register")}
            >
              dont have an account? Click here to rigister
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default LoginPage;
