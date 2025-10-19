'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, initiateEmailSignIn } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('misssabasiddiqui@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await initiateEmailSignIn(auth, email, password);
      // The onAuthStateChanged listener in AppLayout will handle the redirect
      toast({
        title: "Login Successful",
        description: "Redirecting to your dashboard...",
      });
      // Small delay to allow auth state to propagate
      setTimeout(() => router.push('/'), 1000); 
    } catch (error: any) {
      console.error("Sign in error", error);
      toast({
        title: 'Login Failed',
        description: error.message || "An unexpected error occurred.",
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
       <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-900/80 via-purple-900/80 to-gray-900/80 animate-[gradient-x_15s_ease_infinite] z-0"></div>
       <div className="absolute inset-0 z-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

      <Card className="w-full max-w-md z-20 glass-card">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
             <Logo />
          </div>
          <CardTitle className="text-2xl">Welcome to AlgoPulse</CardTitle>
          <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm">
          <p>
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
