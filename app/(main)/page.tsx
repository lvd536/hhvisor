"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MarketDiscovery from "@/components/MarketDiscovery";
import Analytics from "@/components/Analytics";
import Saved from "@/components/Saved";

export default function Home() {
    return (
        <Tabs defaultValue="home" className="flex flex-col items-center">
            <TabsList
                variant="line"
                className="w-full grid grid-cols-2 md:grid-cols-3 md:px-10 min-h-10 nav-shadow container mx-auto bg-background z-99"
            >
                <p className="font-black text-xl w-fit">HH Visor</p>
                <div className="flex gap-2">
                    <TabsTrigger value="home">Home</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="saved">Saved</TabsTrigger>
                </div>
            </TabsList>
            <TabsContent value="analytics" className="w-full">
                <Analytics />
            </TabsContent>
            <TabsContent value="home" className="w-full container">
                <MarketDiscovery />
            </TabsContent>
            <TabsContent value="saved" className="w-full container">
                <Saved />
            </TabsContent>
        </Tabs>
    );
}
