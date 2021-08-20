import dotenv from 'dotenv';
dotenv.config();
import request from 'request';
import cheerio from 'cheerio';

import MHCrisis from '../lib/models/MH.js';

export function scrapeResources(URL) {
  request(URL, async (err, response, body) => {
    if (err) console.error(err);

    const $ = cheerio.load(body);

    const counties = $('p > strong > a').toArray();
    const numbers = $('p > strong').toArray();

    const mappedCounties = counties.map(place => {
      return place.children[0].data;
    });

    const mappedNumbers = numbers.map(number => {
      return number.children[1].data;
    });

    

    const data = mappedCounties.map((county, index) => {
      const result = {};
      result.county = county;
      result.info = mappedNumbers[index];
      return result;
    });

   
    //await MHCrisis.insert(data);
    Promise.all(
      data.map(async result => {
        return MHCrisis.insert(result);
      }) 
    );
    const table = await MHCrisis.getAll();
    console.log(table);
  });
  console.log(process.env.DATABASE_URL);
}
  
scrapeResources('https://namior.org/resources/community-resource-lists/county-mental-health-departments/');

// request('https://namior.org/resources/community-resource-lists/county-mental-health-departments/', (error, response, html) => {
//   if (!error && response.statusCode == 200) {
//     const $ = cheerio.load(html);

//     const theAnchors = $('p strong > a');
//     const thePhones = $('p strong');
//     const phoneString = thePhones.html();
//     const phonesArray = phoneString.split('</a>');

//     thePhones.toArray().forEach(item => console.log(item.children[1].data));
    
//     // console.log('-----------The Names-----------');
//     // console.log(theAnchors.html());
//     // console.log('-----------The Numbers-----------');
//     // console.log(thePhones.text());
//     // console.log('-----------The End-----------');
//   }
// });

// const URL = 'https://namior.org/resources/community-resource-lists/county-mental-health-departments/';

// console.log('hello world');
// const scrapeData = () => {

//   request(URL, (error, response, html) => {
//     const $ = cheerio.load(html);

//     const child = 'a';
//     const parent = 'strong';

//     $(child, parent).each(
//       () => {
//         const data = {};
//         data.county = this.attribs.child;
//         data.info = this.attribs.parent;
//         console.log(child);
//       }
//     );
//   });
// };

// console.log(scrapeData);
