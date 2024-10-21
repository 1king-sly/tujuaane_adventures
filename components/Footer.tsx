import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About Tujuane</h3>
          <p>Discover the beauty of Kenya and East Africa with our unforgettable adventures.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/events">Events</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/partners">Partners</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p>123 Adventure Street</p>
          <p>Nairobi, Kenya</p>
          <p>Phone: +254 123 456 789</p>
          <p>Email: info@tujuane.com</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-primary hover:text-primary-foreground"><Facebook /></a>
            <a href="#" className="text-primary hover:text-primary-foreground"><Instagram /></a>
            <a href="#" className="text-primary hover:text-primary-foreground"><Twitter /></a>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 text-center">
        <p>&copy; 2023 Tujuane Adventures. All rights reserved.</p>
      </div>
    </footer>
  )
}