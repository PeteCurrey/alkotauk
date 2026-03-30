const http = require('http');

http.get('http://localhost:3000/machines', (res) => {
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      if (rawData.includes('Alkota 5355HNL')) {
        console.log('SUCCESS: Page rendered successfully with database machine data!');
        console.log('SUCCESS');
      } else if (rawData.includes('Cannot read properties of null')) {
        console.log('ERROR: The null map error is still present on the page.');
      } else {
        console.log('ERROR: Could not find database items. Showing first 200 chars:');
        console.log(rawData.slice(0, 200));
      }
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});
