"use client"

import { useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useToast } from '@/components/ui/use-toast'

// Mock event data (replace with actual data fetching)
const event = {
  id: 1,
  title: 'Mount Kenya Expedition',
  description: 'Conquer Africa\'s second-highest peak',
  date: '2023-08-15',
  price: 500,
  image: '/images/hero5.jpeg',
}

export default function EventBookingPage() {
  const { id } = useParams()
  const [people, setPeople] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('mpesa')
  const { toast } = useToast()

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to process the booking
    toast({
      title: "Booking Confirmed!",
      
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image src={event.image} alt={event.title} width={600} height={400} className="rounded-lg" />
          <h1 className="text-3xl font-bold mt-4">{event.title}</h1>
          <p className="text-lg mt-2">{event.description}</p>
          <p className="text-lg font-semibold mt-2">Date: {event.date}</p>
          <p className="text-lg font-semibold">Price: ${event.price} per person</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Book Your Spot</h2>
          <form onSubmit={handleBooking} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" required />
            </div>
            <div>
              <Label htmlFor="people">Number of People</Label>
              <Input
                id="people"
                type="number"
                min="1"
                value={people}
                onChange={(e) => setPeople(parseInt(e.target.value))}
                required
              />
            </div>
            <div>
              <Label>Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mpesa" id="mpesa" />
                  <Label htmlFor="mpesa">M-Pesa</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="kcb" id="kcb" />
                  <Label htmlFor="kcb">KCB</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <p className="text-lg font-semibold">Total Amount: ${event.price * people}</p>
            </div>
            <Button type="submit" className="w-full">Confirm Booking</Button>
          </form>
        </div>
      </div>
    </div>
  )
}