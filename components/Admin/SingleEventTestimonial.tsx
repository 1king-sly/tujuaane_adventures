"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Users, Image as ImageIcon, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useToast } from "@/hooks/use-toast";

interface Testimonial {
  id: string;
  user: {
    name: string;
  };
  content: string;
  rating: number;
}

export default function SingleEventTestimonial({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    toast({
      title: "Event Deleted",
      description: "The event has been successfully deleted.",
    });
  };

  const filteredTestimonials = testimonials?.filter((testimonial) =>
    testimonial.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Testimonials</h1>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search testimonial..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="space-y-4">
        {filteredTestimonials?.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardContent className="pt-6">
              <div className="flex items-center mb-2">
                <div className="flex">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="ml-2 font-semibold">
                  {testimonial.user.name}
                </span>
              </div>
              <p>{testimonial.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
