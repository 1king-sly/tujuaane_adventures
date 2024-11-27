"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Edit, Trash } from "lucide-react";



interface Bookings {
  id: string;
  user: {
    name: string;
    email: string;
  };
  people: number;
  totalCost: number;
}

export default function SingleEventBookings({
  bookings,
}: {
  bookings: Bookings[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();



  const handleDelete = async (id: string) => {
    toast({
      title: "Event Deleted",
      description: "The event has been successfully deleted.",
    });
  };

  const filteredBookings = bookings?.filter((booking) =>
    booking.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Bookings</h1>
        <Button asChild>
          <Link href="/admin/events/create">
            <Plus className="mr-2 h-4 w-4" /> Add A Booking
          </Link>
        </Button>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search bookings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>People</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBookings?.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.user.name}</TableCell>
              <TableCell>{booking.user.email}</TableCell>
              <TableCell>{booking.people}</TableCell>
              <TableCell>${booking.totalCost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
