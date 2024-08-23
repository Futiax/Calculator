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
        const lvlmax = document.getElementById("levelRange").value;
        const gamax = document.getElementById("gadgetRange").value;
        const spmax = document.getElementById("SPRange").value;
        const gemax = document.getElementById("gearsRange").value;
        brawlers.forEach(brawler => {
            const level = brawler.power;

            // Coût pour les niveaux restants
            for (let i = level; i < lvlmax; i++) {
                totalGoldNeeded += or_costs[i];
            }
            console.log(`${brawler.name} ${brawler.gears.length} équipement(s) et ${brawler.gadgets.length} gadget(s) et ${brawler.starPowers.length} pouvoir(s) star`)
            // Vérifier les équipements
            totalGoldNeeded += Math.max(0,(gemax - brawler.gears.length) * 1000);
            // Vérifier les gadgets
            totalGoldNeeded += (gamax - brawler.gadgets.length) * 1000;
            // Vérifier les star powers
            totalGoldNeeded += (spmax - brawler.starPowers.length) * 2000;
        });

        resultElement.textContent = `Vous avez besoin de ${totalGoldNeeded} or pour maximiser votre compte, sois environ ${Math.round(totalGoldNeeded/49.8069)} prix star`;

    } catch (error) {
        console.error('Erreur:', error);
        resultElement.textContent = `Erreur lors de la récupération des données : ${error.message}`;
        document.getElementById('responseData').textContent = error.message;
    }
}
