import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function AdminStats() {
  return (
    <>
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
    </>
)
}
