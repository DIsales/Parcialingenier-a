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
    res.render('layouts/list', {});
});

module.exports = router;