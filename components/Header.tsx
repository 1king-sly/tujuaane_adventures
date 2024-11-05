"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Compass, Menu, Moon, Sun, User, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { Transition } from "@headlessui/react";

export default function Header() {
  const { data: session } = useSession();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;


  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAuthSubmit = async (event: any) => {
    event.preventDefault();
    const formData = {
      fullName: event.target.fullName?.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };
    const url = `${API_URL}/auth/${isLoginMode ? "login" : "signup"}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log(isLoginMode ? "Login successful" : "Sign up successful");
      const data = await response.json();
      if (isLoginMode) {
        localStorage.setItem("accessToken", data.access_token);
      }
      setIsLoginOpen(false);
    } else {
      console.error(`${isLoginMode ? "Login" : "Sign up"} failed:`, response);
    }
  };

  const navigation = [
    { name: "Events", href: "/events" },
    { name: "Services", href: "/services" },
    { name: "Partners", href: "/partners" },
    { name: "Gallery", href: "/gallery" },
  ];

  const NavLinks = () => (
    <>
      {navigation.map((item) => (
        <li key={item.name}>
          <Link href={item.href} className="hover:text-primary transition-colors">
            {item.name}
          </Link>
        </li>
      ))}
    </>
  )

  const AuthButtons = () => (
    <>
      {session ? (
        <>
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Button onClick={() => signOut()} variant="secondary">Sign Out</Button>
        </>
      ) : (
        <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary">Login / Sign Up</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleAuthSubmit} className="grid gap-4 py-4">
            {!isLoginMode && (
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" required />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="flex justify-between">
              <Button type="submit">{isLoginMode ? "Login" : "Sign Up"}</Button>
              <Button variant="outline" type="button" onClick={() => setIsLoginMode(!isLoginMode)}>
                {isLoginMode ? "Switch to Sign Up" : "Switch to Login"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      )}
    </>
  )

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
    <div className="container mx-auto px-4">
      <div className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Compass className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">Tujuane</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <NavLinks />
          </ul>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {isMounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          )}
          <AuthButtons />
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col h-full">
              <nav className="flex-1">
                <ul className="space-y-4 mt-8">
                  <NavLinks />
                </ul>
              </nav>
              <div className="flex flex-col space-y-4 mb-8">
                {isMounted && (
                  <Button
                    variant="ghost"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="justify-start"
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun className="h-5 w-5 mr-2" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="h-5 w-5 mr-2" />
                        Dark Mode
                      </>
                    )}
                  </Button>
                )}
                <AuthButtons />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
  );
}
