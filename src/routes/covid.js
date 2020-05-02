const router = require('express').Router();

const fectch = () => {
    return new Promise( (reject, resolve) => {
        try {
            var reqs = unirest("GET", "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php");
            reqs.headers({
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "fb567843edmshcfcb2d41286a8b3p1ea704jsn35342300bb54"
            });
            reqs.end( ress => {
                if (ress.error) throw new Error(ress.error);
                const api = ress.body;
                reject(api);
            });
        } catch (error) {
            resolve(error)
        }
    })
}

router.get('/', async (req, res) => {
    const data = await JSON.parse( await fectch() )
    
    const quitarNull = data.countries_stat.filter(j => j.tests_per_1m_population !== '0' && j.total_cases_per_1m_population !== '0')

    const division = []

    quitarNull.forEach(element => {
       const dataTop10 = {
            pais: element.country_name,
            pruebas: parseFloat(element.tests_per_1m_population) / parseFloat(element.total_cases_per_1m_population),
       }

       division.push(dataTop10)
    });

    const top10 = await division.sort((a,b)=> {
        return b.pruebas-a.pruebas
    }).slice(0,10)

    console.log(top10)
    res.render('layouts/list', {});
});

module.exports = router;