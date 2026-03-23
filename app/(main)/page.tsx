"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import MarketDiscovery from "@/components/MarketDiscovery";

export default function Home() {
    return (
        <Tabs
            defaultValue="home"
            className="flex flex-col items-center container mx-auto"
        >
            <TabsList
                variant="line"
                className="w-full grid grid-cols-2 md:grid-cols-3 md:px-10 min-h-10 mb-2 nav-shadow"
            >
                <p className="font-black text-xl w-fit">HH Visor</p>
                <div className="flex gap-2">
                    <TabsTrigger value="home">Home</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="saved">Saved</TabsTrigger>
                </div>
            </TabsList>
            <TabsContent value="analytics">
                <Card>
                    <CardHeader>
                        <CardTitle>Analytics</CardTitle>
                        <CardDescription>
                            Track performance and user engagement metrics.
                            Monitor trends and identify growth opportunities.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        Page views are up 25% compared to last month.
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="home" className="w-full container">
                <MarketDiscovery />
            </TabsContent>
            <TabsContent value="saved">
                <Card>
                    <CardHeader>
                        <CardTitle>Saved</CardTitle>
                        <CardDescription>
                            Manage your account preferences and options.
                            Customize your experience to fit your needs.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        Configure notifications, security, and themes.
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
