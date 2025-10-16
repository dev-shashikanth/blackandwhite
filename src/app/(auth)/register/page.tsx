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
import { useToast } from "@/hooks/use-toast";
import { registerSchema } from "@/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const boomerangVariants = {
  initial: { x: -150, opacity: 0 },
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
    x: 150,
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};
const RegisterForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      phoneNumber: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/register", values); // Use fetch if preferred
      toast({
        variant: "default",
        description: response.data.message,
      });
      setIsSubmitting(false);
      router.push("/login");
      console.log(response);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast({
        variant: "destructive",
        description: errorMessage,
      });
      setIsSubmitting(false);
    }
  };
  return (
    <motion.div
      className="overflow-hidden w-full max-w-sm p-6 bg-white"
      variants={boomerangVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Form {...form}>
        <div className="flex justify-center">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/assets/icons/b&wicon.ico" />
            <AvatarFallback>Black&WhiteIcon</AvatarFallback>
          </Avatar>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="firstname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="lastname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input placeholder="phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="password"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isSubmitting ? (
            <Button size="sm" disabled>
              <Loader2Icon className="animate-spin" />
              Submitting
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              Create Account
            </Button>
          )}

          <Button
            type="button"
            className="block align-right"
            variant="link"
            onClick={() => router.push("/login")}
          >
            Already have an account? Click here to sign in
          </Button>
        </form>
      </Form>
    </motion.div>
  );
};

export default RegisterForm;
