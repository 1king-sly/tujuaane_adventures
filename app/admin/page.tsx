"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'

export default function AdminPage() {
  const [eventTitle, setEventTitle] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventPrice, setEventPrice] = useState('')
  const [eventDiscount, setEventDiscount] = useState('')
  const [partnerName, setPartnerName] = useState('')
  const [partnerEmail, setPartnerEmail] = useState('')
  const { toast } = useToast()

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to create the event
    toast({
      title: "Event Created",
    })
  }

  const handleCreatePartner = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to create the partner
    toast({
      title: "Partner Created",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <Tabs defaultValue="stats">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="create">Create</TabsTrigger>
        </TabsList>
        <TabsContent value="stats">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">1,234</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">567</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">$12,345</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="events">
          <h2 className="text-2xl font-bold mb-4">Manage Events</h2>
          {/* Add event management UI here */}
        </TabsContent>
        <TabsContent value="partners">
          <h2 className="text-2xl font-bold mb-4">Manage Partners</h2>
          {/* Add partner management UI here */}
        </TabsContent>
        <TabsContent value="create">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Create Event</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateEvent} className="space-y-4">
                  <div>
                    <Label htmlFor="eventTitle">Event Title</Label>
                    <Input
                      id="eventTitle"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventDescription">Description</Label>
                    <Textarea
                      id="eventDescription"
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventDate">Date</Label>
                    <Input
                      id="eventDate"
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventPrice">Price</Label>
                    <Input
                      id="eventPrice"
                      type="number"
                      value={eventPrice}
                      onChange={(e) => setEventPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventDiscount">Discount (optional)</Label>
                    <Input
                      id="eventDiscount"
                      type="number"
                      value={eventDiscount}
                      onChange={(e) => setEventDiscount(e.target.value)}
                    />
                  </div>
                  <Button type="submit">Create Event</Button>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Create Partner</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreatePartner} className="space-y-4">
                  <div>
                    <Label htmlFor="partnerName">Partner Name</Label>
                    <Input
                      id="partnerName"
                      value={partnerName}
                      onChange={(e) => setPartnerName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="partnerEmail">Partner Email</Label>
                    <Input
                      id="partnerEmail"
                      type="email"
                      value={partnerEmail}
                      onChange={(e) => setPartnerEmail(e.target.value)}
                      required
                    /></div>
                  <Button type="submit">Create Partner</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}