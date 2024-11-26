"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { Search, Plus, Edit, Trash } from 'lucide-react'

const events = [
  { id: 1, title: 'Mount Kenya Expedition', date: '2023-08-15', price: 500, bookings: 15 },
  { id: 2, title: 'Masai Mara Safari', date: '2023-09-01', price: 800, bookings: 20 },
]

export default function AdminEventsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  const handleDelete = async (id: number) => {
    // Add API call to delete event
    toast({
      title: "Event Deleted",
      description: "The event has been successfully deleted.",
    })
  }

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
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
              <TableCell>{event.title}</TableCell>
              <TableCell>{event.date}</TableCell>
              <TableCell>${event.price}</TableCell>
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