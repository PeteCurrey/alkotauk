const https = require('https');
https.get('https://alkota.com/products/water-treatment-and-recovery-systems/water-treatment-systems/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const imgMatches = data.match(/<img[^>]+src="([^">]+)"/g);
    if(imgMatches) {
        imgMatches.forEach(img => console.log(img));
    }
  });
}).on('error', err => console.log('Error: ', err.message));
