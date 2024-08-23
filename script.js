async function calculateGold() {
    const playerTag = document.getElementById('playerTag').value.replace('#', '');
    const resultElement = document.getElementById('result');
    try {
        const response = await fetch(`http://82.64.36.59:8182/players/%23${playerTag}`)
        // Afficher la réponse brute dans la console pour le débogage
        console.log(response);
        const data = await response.json();
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
