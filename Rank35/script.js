async function calculateTrophies() {
    const playerTag = document.getElementById('playerTag').value.replace('#', '');
    const decimals = Math.pow(10,document.getElementById('Decimals').value);
    const resultElement = document.getElementById('result');
    try {
        const response = await fetch(`http://yux.freeboxos.fr:8182/players/%23${playerTag}`)
        // Afficher la réponse brute dans la console pour le débogage
        console.log(response);
        let dateend = new Date("2024-10-28T09:00:00").getTime();
        actualdate = Date.now();
        let diff = Math.floor((dateend - actualdate)/1000);
        const data = await response.json();
        const brawlers = data.brawlers;
        let trophies = [];
        let neededbrawlers = 10;
        let neededtrophies = 0;
        brawlers.forEach(brawler => {
            trophies.push(brawler.trophies);
            if (brawler.rank == 35) {
                neededbrawlers--;
            }
        });
        trophies.sort((a, b) => b - a);
        for (let i = 0; i < neededbrawlers; i++) {
            neededtrophies += 1250-trophies[i];
        }
        console.log(neededtrophies);
        console.log(diff);
        console.log(decimals)
        resultElement.textContent = `Vous avez besoin de ${neededtrophies} trophées sois : \n${Math.round(neededtrophies*decimals/diff)/decimals} trophées/sec \n${Math.round(neededtrophies*60*decimals/diff)/decimals} tr/min \n${Math.round(neededtrophies*3600*decimals/diff)/decimals} tr/h \n${Math.round(neededtrophies*86400*decimals/diff)/decimals} tr/days.`;

    } catch (error) {
        console.error('Erreur:', error);
        resultElement.textContent = `Erreur lors de la récupération des données : ${error.message}`;
        document.getElementById('responseData').textContent = error.message;
    }
}
