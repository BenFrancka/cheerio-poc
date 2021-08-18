import request from 'request';
import cheerio from 'cheerio';

request('https://namior.org/resources/community-resource-lists/county-mental-health-departments/', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    const theAnchors = $('p strong > a');
    const thePhones = $('p strong');
    const phoneString = thePhones.html();
    const phonesArray = phoneString.split('</a>');

    thePhones.toArray().forEach(item => console.log(item.children[1].data));
    
    // console.log('-----------The Names-----------');
    // console.log(theAnchors.html());
    // console.log('-----------The Numbers-----------');
    // console.log(thePhones.text());
    // console.log('-----------The End-----------');
  }
});
