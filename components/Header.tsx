"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Compass } from 'lucide-react'

export default function Header() {
  const { data: session } = useSession()
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  return (
    <header className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Compass className="h-8 w-8" />
          <span className="text-2xl font-bold">Tujuane</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
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
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input id="email" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                          Password
                        </Label>
                        <Input id="password" type="password" className="col-span-3" />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button onClick={() => signIn()}>Login</Button>
                      <Button variant="outline">Sign Up</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}