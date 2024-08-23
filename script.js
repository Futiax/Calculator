async function calculateGold() {
    const playerTag = document.getElementById('playerTag').value.replace('#', '');
    const resultElement = document.getElementById('result');

    try {
        const response = await fetch(`https://api.brawlstars.com/v1/players/%23${playerTag}`, {
            "headers": {
              "accept": "application/json",
              "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImM5ZjllZmUxLTY2MTAtZDAzYS1lYjU1LTdmNDI0M2VlMjBkNCIsImlhdCI6MTcyNDQzMTgwMywiZXhwIjoxNzI0NDM1NDAzLCJzdWIiOiJkZXZlbG9wZXIvOTEwOTNkODUtNjZhNC02OGM3LTMzMDktMDhlNTYwMWQ1MzQ0Iiwic2NvcGVzIjpbImJyYXdsc3RhcnMiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL2Jyb256ZSIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI4Mi42NC4zNi41OS8zMiJdLCJ0eXBlIjoiY2xpZW50In0seyJvcmlnaW5zIjpbImRldmVsb3Blci5icmF3bHN0YXJzLmNvbSJdLCJ0eXBlIjoiY29ycyJ9XX0.ktJOWwnA6VuAUUOHBvh4ZDCrv5hRid8Yfn68gEeEUMX91UboBr1pgstYu3NBEOZfkGqD-bGG4elDVIDTrJSuPw",
              "priority": "u=1, i",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-site"
            },
            "referrer": "https://developer.brawlstars.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
          });
        // Afficher la réponse brute dans la console pour le débogage
        const rawData = await response.text();
        console.log(rawData);

        if (!response.ok) {
            throw new Error(rawData);
        }

        const data = JSON.parse(rawData);
        const brawlers = data.brawlers;
        const or_costs = [0, 20, 35, 75, 140, 290, 480, 800, 1250, 1875, 2800];
        let totalGoldNeeded = 0;

        brawlers.forEach(brawler => {
            const level = brawler.power;
            const remainingLevels = 10 - level;

            // Coût pour les niveaux restants
            for (let i = level; i < 10; i++) {
                totalGoldNeeded += or_costs[i];
            }

            // Vérifier les gadgets
            const hasTwoGadgets = brawler.gadgets.length === 2;
            if (!hasTwoGadgets) {
                totalGoldNeeded += (2 - brawler.gadgets.length) * 1000;
            }

            // Vérifier les star powers
            const hasTwoStarPowers = brawler.starPowers.length === 2;
            if (!hasTwoStarPowers) {
                totalGoldNeeded += (2 - brawler.starPowers.length) * 2000;
            }
        });

        resultElement.textContent = `Vous avez besoin de ${totalGoldNeeded} or pour maximiser votre compte.`;

    } catch (error) {
        console.error('Erreur:', error);
        resultElement.textContent = `Erreur lors de la récupération des données : ${error.message}`;
        document.getElementById('responseData').textContent = error.message;
    }
}
