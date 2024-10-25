import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// This would typically come from an API or database
const events = [
  {
    id: 1,
    title: 'Mount Kenya Expedition',
    description: 'Conquer Africa\'s second-highest peak',
    date: '2023-08-15',
    price: 500,
    discount: 50,
    image: '/images/hero1.jpg',
    bookings: 15,
  },
  {
    id: 2,
    title: 'Masai Mara Safari',
    description: 'Witness the great wildebeest migration',
    date: '2023-09-01',
    price: 800,
    discount: 0,
    image: '/images/hero2.jpeg',
    bookings: 20,
  },
  {
    id: 3,
    title: 'Coastal Beach Retreat',
    description: 'Relax on the beautiful beaches of Diani',
    date: '2023-09-15',
    price: 300,
    discount: 30,
    image: '/images/hero3.jpeg',
    bookings: 10,
  },
]

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <Image src={event.image} alt={event.title} width={400} height={200} className="w-full h-48 object-cover" />
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2">{event.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  {event.discount > 0 ? (
                    <>
                      <span className="text-lg font-bold text-primary">${event.price - event.discount}</span>
                      <span className="ml-2 text-sm line-through text-muted-foreground">${event.price}</span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-primary">${event.price}</span>
                  )}
                </div>
                <Badge variant="secondary">{event.bookings} booked</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/events/${event.id}`}>Book Now</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}