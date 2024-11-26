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

// Mock data (replace with API calls)
const partners = [
  { id: 1, name: 'Kenya Wildlife Service', email: 'info@kws.ke', events: 5 },
  { id: 2, name: 'Serena Hotels', email: 'contact@serena.com', events: 3 },
]

export default function AdminPartnersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  const handleDelete = async (id: number) => {
    // Add API call to delete partner
    toast({
      title: "Partner Deleted",
      description: "The partner has been successfully deleted.",
    })
  }

  const filteredPartners = partners.filter(partner => 
    partner.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Partners</h1>
        <Button asChild>
          <Link href="/admin/partners/create">
            <Plus className="mr-2 h-4 w-4" /> Add New Partner
          </Link>
        </Button>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search partners..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Events</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPartners.map((partner) => (
            <TableRow key={partner.id}>
              <TableCell>{partner.name}</TableCell>
              <TableCell>{partner.email}</TableCell>
              <TableCell>{partner.events}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/partners/${partner.id}`}>
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
                        <DialogTitle>Delete Partner</DialogTitle>
                      </DialogHeader>
                      <p>Are you sure you want to delete this partner? This action cannot be undone.</p>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Cancel</Button>
                        <Button variant="destructive" onClick={() => handleDelete(partner.id)}>Delete</Button>
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