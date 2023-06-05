const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];

function isHabitable(planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
}

fs.createReadStream('./data/kepler-data.csv')
  .pipe(
    parse({
      comment: '#',
      columns: true,
    })
  )
  .on('data', (planet) => {
    if (isHabitable(planet)) {
      habitablePlanets.push(planet);
    }
  })
  .on('error', (error) => console.log(error))
  .on('end', () => {
    console.log(habitablePlanets.map((planet) => planet['kepler_name']));
    console.log(`Found ${habitablePlanets.length} habitable planets`);
    console.log('Done!');
  });
