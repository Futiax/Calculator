async function calculateTrophies() {
    const playerTag = document.getElementById('playerTag').value.replace('#', '');
    const resultElement = document.getElementById('result');
    try {
        const response = await fetch(`http://yux.freeboxos.fr:8182/players/%23${playerTag}`)
        // Afficher la réponse brute dans la console pour le débogage
        console.log(response);
        let dateend = new Date("2024-10-28T09:00:00").getTime();
        actualdate = new Date.now().getTime();
        let diff = Math.floor((dateend - actualdate)/1000);
        const data = await response.json();
        const brawlers = data.brawlers;
        let maxtrophies = [];
        let neededbrawlers = 10;
        let neededtrophies = 0;
        brawlers.forEach(brawler => {
            maxtrophies.push(brawler.trophies);
            if (brawler.rank = 35) {
                neededbrawlers--;
            }
        });
        maxtrophies.sort((a, b) => b - a);
        for (let i = 0; i < neededbrawlers; i++) {
            neededtrophies += 1250-trophies[i];
        }
        resultElement.textContent = `Vous avez besoin de ${neededtrophies} trophées pour votrea avoir 10 rank 35, sois environ ${neededtrophies/diff} trophées/sec. Il vous manque dans ce cadre : ${ge} Gears   ${ga} Gadgets   ${sp} Star powers`;

    } catch (error) {
        console.error('Erreur:', error);
        resultElement.textContent = `Erreur lors de la récupération des données : ${error.message}`;
        document.getElementById('responseData').textContent = error.message;
    }
}
