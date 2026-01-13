"use client";

import { buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { ArrowRight, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: boolean;
}

const Home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await authClient.getSession();

        if (!session?.data) {
          router.push("/sign-in");
          return;
        }

        setUser(session.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Session check failed:", error);
        router.push("/sign-in");
      }
    };

    checkSession();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2Icon className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="px-4 py-8 ">
      <h1 className="font-semibold text-2xl">
        Welcome <span className="text-blue-500">{user?.name}!</span>{" "}
      </h1>
      <div className="flex items-center flex-col justify-center text-center mt-40">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-sm font-semibold to-gray-700">Personal Finance</p>
        </div>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Manage your <span className="text-blue-600">Spending</span> in
          seconds.
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg text-base">
          AI Receipt Extraction: Users can upload images of receipts; the app uses Gemini 1.5 Flash to parse unstructured images into structured JSON data (amount, category, date).
        </p>
        
        <Link
          className={buttonVariants({
            size: "lg",
            className: "mt-5",
          })}
          href={"/transaction"}
          target="_blank"
        >
          Get started <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
