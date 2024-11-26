"use client"

import { useState,useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { Search, Plus, Edit, Trash } from 'lucide-react'



interface Event{
    id:string
    name:string,
    date:string
    location:string
    logo:string
    discount:number
    pricePerPerson:number
    description:string
    bookings:number
    newPrice:number
    maxAttendees:number
  }


export default function AdminEventsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  const [events,setEvents] = useState<Event[]>([])

  const API_URL = process.env.NEXT_PUBLIC_API_URL;




  useEffect(() => {

    const fetchEvents =async()=>{
      const response =await fetch(`${API_URL}/events/`, {
        method: "GET",
        headers: {
          'Content-Type':"application/json"
        },
    
      })

      const data = await response.json()


      if(response.ok){
        setEvents(data)
      }

    
    }

    fetchEvents()

 
  }, [API_URL]);

  const handleDelete = async (id: string) => {
    toast({
      title: "Event Deleted",
      description: "The event has been successfully deleted.",
    })
  }

  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Events</h1>
        <Button asChild>
          <Link href="/admin/events/create">
            <Plus className="mr-2 h-4 w-4" /> Add New Event
          </Link>
        </Button>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Bookings</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEvents.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.name}</TableCell>
              <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
              <TableCell>KES. {event.newPrice || event.pricePerPerson}</TableCell>
              <TableCell>{event.bookings}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/events/${event.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete Event</DialogTitle>
                      </DialogHeader>
                      <p>Are you sure you want to delete this event? This action cannot be undone.</p>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Cancel</Button>
                        <Button variant="destructive" onClick={() => handleDelete(event.id)}>Delete</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}