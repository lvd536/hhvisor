export default function MarketDiscoveryHeader() {
    return (
        <div className="w-full flex flex-col">
            <h1
                className="font-bold text-5xl mb-0 my-8"
                style={{ letterSpacing: "-0.05em" }}
            >
                Market Discovery
            </h1>
            <h2
                className="font-medium text-md text-muted-foreground"
                style={{ lineHeight: "156%" }}
            >
                Real-time labor market instrumentation and competitive position
                mapping.
            </h2>
        </div>
    );
}