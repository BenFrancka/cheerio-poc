export { scrapeData };

import request from 'request-promise';
import cheerio from 'cheerio';
//import MHCrisis from './lib/models/MH.js';


const scrapeData = async () => {
  const URL = 'https://namior.org/resources/community-resource-lists/county-mental-health-departments/';

  const response = await request(URL);

  const $ = cheerio.load(response);

  const county = $('p > strong > a').text().trim();
  

  const data = {
    county: mappedCounties.forEach(item => data.push(item)),
    info: mappedNumbers.forEach(item => data.push(item)) 
  };

  console.log(data);



};




