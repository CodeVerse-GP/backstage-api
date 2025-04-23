const { Command } = require('commander');
const apiClient = require('../apiClient');
const Table = require('cli-table3');

const orphan = new Command('orphan');

orphan.description('Manage orphan entities in the Backstage catalog');

orphan
  .command('list')
  .description('List all orphan entities')
  .option('-p, --pretty', 'Pretty-print output in a table')
  .option(
    '-l, --limit <number>',
    'Limit the number of results returned',
    parseInt
  )
  .action(async (options) => {
    try {
      const allItems = [];
      let cursor = undefined;
      const limit = options.limit || Number.MAX_SAFE_INTEGER;

      do {
        const res = await apiClient.get('/catalog/entities/by-query', {
          params: {
            filter: 'metadata.annotations.backstage.io/orphan=true',
            ...(cursor && { cursor }),
          },
          headers: {
            Accept: 'application/json',
          },
        });

        const { items = [], pageInfo } = res.data;
        
        const remainingCapacity = limit - allItems.length;
        const itemsToAdd = items.slice(0, remainingCapacity);
        allItems.push(...itemsToAdd);
        
        if (allItems.length >= limit) {
          break;
        }
        
        cursor = pageInfo?.nextCursor;
      } while (cursor);

      if (options.pretty) {
        const table = new Table({
          head: ['Kind', 'Name', 'Owner'],
          colWidths: [20, 30, 40],
        });

        allItems.forEach((entity) => {
          table.push([
            entity.kind || '',
            entity.metadata?.name || '',
            entity.spec?.owner || '',
          ]);
        });

        console.log(table.toString());
        console.log(`\nTotal orphan entities: ${allItems.length}`);
      } else {
        console.log(JSON.stringify(allItems, null, 2));
      }
    } catch (err) {
      console.error('Error fetching orphan entities:', err.message);
      process.exit(1);
    }
  });

module.exports = orphan;
