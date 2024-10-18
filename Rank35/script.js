async function calculateGold() {
    const playerTag = document.getElementById('playerTag').value.replace('#', '');
    const resultElement = document.getElementById('result');
    try {
        const response = await fetch(`http://yux.freeboxos.fr:8182/players/%23${playerTag}`)
        // Afficher la réponse brute dans la console pour le débogage
        console.log(response);
        const data = await response.json();
        const brawlers = data.brawlers;
        const or_costs = [0, 20, 35, 75, 140, 290, 480, 800, 1250, 1875, 2800];
        let totalGoldNeeded = 0;
        let ga = 0
        let ge = 0
        let sp = 0
        const lvlmax = document.getElementById("levelSlider").value;
        const gamax = document.getElementById("gadgetsSlider").value;
        const spmax = document.getElementById("starPowersSlider").value;
        const gemax = document.getElementById("gearsSlider").value;
        brawlers.forEach(brawler => {
            const level = brawler.power;

            // Coût pour les niveaux restants
            for (let i = level; i < lvlmax; i++) {
                totalGoldNeeded += or_costs[i];
            }
            console.log(`${brawler.name} ${brawler.gears.length} équipement(s) et ${brawler.gadgets.length} gadget(s) et ${brawler.starPowers.length} pouvoir(s) star`)
            // Vérifier les équipements
            ge += Math.max(0,(gemax - brawler.gears.length))
            totalGoldNeeded += Math.max(0,(gemax - brawler.gears.length) * 1000);
            // Vérifier les gadgets
            ga += Math.max(0,(gamax - brawler.gadgets.length))
            totalGoldNeeded += Math.max(0,(gamax - brawler.gadgets.length) * 1000);
            // Vérifier les star powers
            totalGoldNeeded += Math.max(0,(spmax - brawler.starPowers.length) * 2000);
            sp += Math.max(0,(spmax - brawler.starPowers.length))
        });

        resultElement.textContent = `Vous avez besoin de ${totalGoldNeeded} or pour votre objectif, sois environ ${Math.round(totalGoldNeeded/49.8069)} prix star. Il vous manque dans ce cadre : ${ge} Gears   ${ga} Gadgets   ${sp} Star powers`;

    } catch (error) {
        console.error('Erreur:', error);
        resultElement.textContent = `Erreur lors de la récupération des données : ${error.message}`;
        document.getElementById('responseData').textContent = error.message;
    }
}
