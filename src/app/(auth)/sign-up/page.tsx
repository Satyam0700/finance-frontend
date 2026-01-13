"use client";

import SignUpView from '@/modules/auth/views/sign-up-view'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Loader2Icon } from 'lucide-react';

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await authClient.getSession();
        
        if (session?.data) {
          router.push("/");
          return;
        }
      } catch (error) {
        console.error("Session check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  if (loading) {
   return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2Icon className="size-6 animate-spin text-primary" />{" "}
      </div>
    );
  }

  return (
    <div><SignUpView /></div>
  )
}

export default Page