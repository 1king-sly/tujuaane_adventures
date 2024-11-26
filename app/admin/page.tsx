"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminStats from "@/components/Admin/AdminStats";
import AdminEvents from "@/components/Admin/AdminEvents";
import AdminPartners from "@/components/Admin/AdminPartners";
import AdminCreate from "@/components/Admin/AdminCreate";

export default function AdminPage() {


  return (
    <div className="container mx-auto px-4 py-2">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <Tabs defaultValue="stats">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="create">Create</TabsTrigger>
        </TabsList>
        <TabsContent value="stats">
          <AdminStats/>
        </TabsContent>
        <TabsContent value="events">
          <AdminEvents/>
        </TabsContent>
        <TabsContent value="partners">
          <AdminPartners/>
        </TabsContent>
        <TabsContent value="create">
        <AdminCreate/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
