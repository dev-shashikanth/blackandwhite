"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      toast({
        title: "",
        description: "Please login to access this page",
        variant: "destructive",
      });
      setTimeout(() => {
        router.replace("/login");
      }, 2000);
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return <>{children}</>;
}
