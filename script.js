async function calculateGold() {
    const playerTag = document.getElementById('playerTag').value.replace('#', '');
    const resultElement = document.getElementById('result');

    try {
        const response = await fetch(`https://api.brawlstars.com/v1/players/${playerTag}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImViOWQ5Y2EzLTVhNzMtNDFhYi1iN2RhLTBmMmVkZTJiNTQzMSIsImlhdCI6MTcyNDQyODYyNiwic3ViIjoiZGV2ZWxvcGVyLzkxMDkzZDg1LTY2YTQtNjhjNy0zMzA5LTA4ZTU2MDFkNTM0NCIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiODIuNjQuMzYuNTkiLCI4OC4xNzUuMTg1LjE4NCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.9_1-sTULKSfD55k2_6uv-d9Hmnr9J40kwqbizVjjnNlTEm1j7GokVqMDDD3Z10dOHg0wJJS2KKViCPJv8iw21g`,
                'Content-Type': 'application/json'
            }
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
