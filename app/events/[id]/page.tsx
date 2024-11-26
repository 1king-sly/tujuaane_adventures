"use client"

import { useState,useEffect } from 'react'
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

interface Event{
  id:string,
  name:string,
  date:string,
  pricePerPerson:number,
  logo:string,
  bookings:number,
  description:string
}

export default function EventBookingPage({params}:{params:{id:string}}) {
  const [people, setPeople] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('mpesa')
  const { toast } = useToast()
  const [event,setEvent] = useState<Event>()

  const API_URL = process.env.NEXT_PUBLIC_API_URL;


  useEffect(()=>{

    const fetchEvents =async()=>{
      const response =await fetch(`${API_URL}/events/${params.id}`, {
        method: "GET",
        headers: {
          'Content-Type':"application/json"
        },
    
      })

      const data = await response.json()
      console.log(data)

      if(response.ok){
        setEvent(data)
      }

    
    }

    fetchEvents()

 
  }, [API_URL, params.id])

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to process the booking
    toast({
      title: "Booking Confirmed!",
      
    })
  }

  return (
    event ? (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <Image src={event.logo} alt={event.name} width={600} height={400} className="rounded-lg" />
                    <h1 className="text-3xl font-bold mt-4">{event.name}</h1>
                    <p className="text-lg mt-2">{event.description}</p>
                    <p className="text-lg font-semibold mt-2">Date: {new Date(event.date).toLocaleDateString()}</p>
                    <p className="text-lg font-semibold">Price: KES. {event.pricePerPerson} per person</p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">Book Your Spot</h2>
                    <form onSubmit={handleBooking} className="space-y-4">
                        {/* <div>
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
                        </div> */}
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
                            <p className="text-lg font-semibold">Total Amount: KES. {event.pricePerPerson * people}</p>
                        </div>
                        <Button type="submit" className="w-full">Confirm Booking</Button>
                    </form>
                </div>
            </div>
        </div>
    ) : (
        <p>Loading event details...</p>
    )
);
    
 
  
}