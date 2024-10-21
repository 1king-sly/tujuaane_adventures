import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Mock partner data (replace with actual data fetching)
const partners = [
  { id: 1, name: 'Kenya Wildlife Service', logo: '/images/partner1.png' },
  { id: 2, name: 'Serena Hotels', logo: '/images/partner2.png' },
  { id: 3, name: 'Kenya Airways', logo: '/images/partner3.png' },
  { id: 4, name: 'Safaricom', logo: '/images/partner4.png' },
]

export default function PartnersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Partners</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {partners.map((partner) => (
          <Card key={partner.id}>
            <CardHeader>
              <Image src={partner.logo} alt={partner.name} width={200} height={100} className="mx-auto" />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-center">{partner.name}</CardTitle>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <Link href={`/partners/${partner.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}