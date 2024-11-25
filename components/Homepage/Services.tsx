import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'


const services = [
    { title: 'Hiking', description: 'Explore breathtaking trails' },
    { title: 'Mountain Climbing', description: 'Conquer majestic peaks' },
    { title: 'Camping', description: 'Immerse in nature' },
    { title: 'Team Building', description: 'Strengthen bonds through adventure' },
    { title: 'Road Trips', description: 'Discover hidden gems' },
    { title: 'Park Adventures', description: 'Wildlife encounters' },
  ]


export default function Services() {

  return (
    <>
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
    
    </>
)
}
