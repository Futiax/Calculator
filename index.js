Bun.serve({
    port: 8182,
    async fetch(req) {
        const params = new URLSearchParams(req.url);

        const playerId = params.get("playerId");

        const path = new URL(req.url).pathname;

        var monHeader = new Headers();

        monHeader.append("authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjM2OTc2YmUyLTU1NGItOTc2Yi0yZGMzLWQxODFlNjc4NGMxMCIsImlhdCI6MTcyNDQ0MDEwMywiZXhwIjoxNzI0NDQzNzAzLCJzdWIiOiJkZXZlbG9wZXIvOTEwOTNkODUtNjZhNC02OGM3LTMzMDktMDhlNTYwMWQ1MzQ0Iiwic2NvcGVzIjpbImJyYXdsc3RhcnMiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL2Jyb256ZSIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI4Mi42NC4zNi41OS8zMiJdLCJ0eXBlIjoiY2xpZW50In0seyJvcmlnaW5zIjpbImRldmVsb3Blci5icmF3bHN0YXJzLmNvbSJdLCJ0eXBlIjoiY29ycyJ9XX0.mwbipcvj8ZeNxjAFaFHzKpsMeHRuhC7Nk7knAXU9IbqhQwL6-14b6mTyZ9V72LS1i9hNxsWR3N054GTxPPaqCQ")
        const raw = await fetch(`https://api.brawlstars.com/v1${path}`, {
            "headers": monHeader,
            "body": null,
            "method": "GET",
            "mode": "no-cors"
        });

        const playerInfo = await raw.text();

        console.log(`Answered to ${path} with ${playerInfo}`)

        return new Response(playerInfo);


    },
});