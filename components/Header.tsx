"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Compass, Menu, X } from "lucide-react"; // Importing icons
import { Transition } from '@headlessui/react'; // Optional for smooth transitions

export default function Header() {
  const { data: session } = useSession();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const handleAuthSubmit = async (event:any) => {
    event.preventDefault();

    // Create a FormData object from the form element
    const formData = {
      fullName: event.target.fullName?.value,
      password: event.target.password.value,
      email: event.target.email.value,
    };

    const loginData = new FormData(event.target)

    if (isLoginMode) {
      // Handle login
      const response = await fetch(`http://127.0.0.1:8000/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(formData) 
      }
        )

      if (response.ok) {
        console.log("Login successful:");
         const resp  = await response.json()

         localStorage.setItem("accessToken", resp.access_token);

        } else {
        console.error("Login up failed:",  response);
        console.log(loginData)
      }
      setIsLoginOpen(false);
    } else {
      // Handle sign up
      const response = await fetch(`http://127.0.0.1:8000/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          formData
      )
      }
        )

      if (response.ok) {
        console.log("Sign up successful:", await response.json());
      } else {
        console.error("Sign up failed:",  response);
      }
      setIsLoginOpen(false);
    }
  };

  return (
    <header className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Compass className="h-8 w-8" />
          <span className="text-2xl font-bold">Tujuane</span>
        </Link>
        <button 
          className="md:hidden" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // Toggle mobile menu
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <nav className={`md:flex space-x-4 ${isMobileMenuOpen ? "block" : "hidden"} md:block`}>
          <ul className={`flex flex-col md:flex-row space-x-0 md:space-x-4`}>
            <li><Link href="/events">Events</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/partners">Partners</Link></li>
            {session ? (
              <>
                <li><Link href="/profile">Profile</Link></li>
                <li><Button onClick={() => signOut()}>Sign Out</Button></li>
              </>
            ) : (
              <li>
                <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                  <DialogTrigger asChild>
                    <Button variant="secondary">Login / Sign Up</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleAuthSubmit} className="grid gap-4 py-4">
                      {!isLoginMode && (
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="fullName" className="text-right">
                            Full Name
                          </Label>
                          <Input id="fullName" name="fullName" className="col-span-3" required />
                        </div>
                      )}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input id="email" name="email" className="col-span-3" required />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                          Password
                        </Label>
                        <Input id="password" name="password" type="password" className="col-span-3" required />
                      </div>
                      <div className="flex justify-between">
                        <Button type="submit">{isLoginMode ? "Login" : "Sign Up"}</Button>
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => setIsLoginMode(!isLoginMode)}
                        >
                          {isLoginMode ? "Switch to Sign Up" : "Switch to Login"}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <Transition
        show={isMobileMenuOpen}
        enter="transition-transform transform duration-200"
        enterFrom="translate-y-[-100%]"
        enterTo="translate-y-0"
        leave="transition-transform transform duration-200"
        leaveFrom="translate-y-0"
        leaveTo="translate-y-[-100%]"
      >
        <div className="md:hidden bg-white rounded-lg shadow-md p-4">
          <ul className="flex flex-col space-y-2">
            <li><Link href="/events">Events</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/partners">Partners</Link></li>
          </ul>
        </div>
      </Transition>
    </header>
  );
}
