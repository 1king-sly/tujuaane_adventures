import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

export default function Home() {
  const heroImages = [
    '/images/hero1.jpg',
    '/images/hero2.jpeg',
    '/images/hero3.jpeg',
    '/images/hero4.jpeg',
    '/images/hero5.jpeg',
  ]

  const services = [
    { title: 'Hiking', description: 'Explore breathtaking trails' },
    { title: 'Mountain Climbing', description: 'Conquer majestic peaks' },
    { title: 'Camping', description: 'Immerse in nature' },
    { title: 'Team Building', description: 'Strengthen bonds through adventure' },
    { title: 'Road Trips', description: 'Discover hidden gems' },
    { title: 'Park Adventures', description: 'Wildlife encounters' },
  ]

  const upcomingEvents = [
    { title: 'Mount Kenya Expedition', date: '2023-08-15', image: '/images/hero1.jpg' },
    { title: 'Masai Mara Safari', date: '2023-09-01', image: '/images/hero2.jpeg' },
    { title: 'Coastal Beach Retreat', date: '2023-09-15', image: '/images/hero3.jpeg' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16">
        <Carousel>
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[60vh]">
                  <Image src={image} alt={`Hero image ${index + 1}`} layout="fill"  className='object-cover' />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover East Africa</h1>
                      <p className="text-xl md:text-2xl mb-8">Unforgettable adventures await</p>
                      <Button size="lg" asChild>
                        <Link href="/events">Explore Events</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingEvents.map((event, index) => (
            <Card key={index}>
              <Image src={event.image} alt={event.title} width={400} height={200} className="rounded-t-lg  object-cover  " />
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>{event.date}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild>
                  <Link href={`/events/${index + 1}`}>Book Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Add more sections for testimonials and partners here */}
    </div>
  )
}