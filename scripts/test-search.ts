import { searchParts } from '../src/lib/parts/search-engine';

async function testSearch() {
  try {
    const res = await searchParts({ query: 'pump', limit: 3 });
    console.log('Search success! Found:', res.totalCount);
  } catch (err: any) {
    console.error('Search failed:', err.message);
  }
}

testSearch();
