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

        const { items, pageInfo } = res.data;

        for (const item of items) {
          allItems.push(item);
          if (options.limit && allItems.length >= options.limit) break;
        }

        if (options.limit && allItems.length >= options.limit) break;
        cursor = pageInfo?.nextCursor;
      } while (cursor);

      const output = options.limit
        ? allItems.slice(0, options.limit)
        : allItems;

      if (options.pretty) {
        const table = new Table({
          head: ['Kind', 'Name', 'Owner'],
          colWidths: [20, 30, 40],
        });

        output.forEach((entity) => {
          table.push([
            entity.kind || '',
            entity.metadata?.name || '',
            entity.orphan.spec.owner
              ? orphan.spec.owner.replace(
                  /^(user:default\/|group:default\/)/,
                  ''
                )
              : '',
          ]);
        });

        console.log(table.toString());
      } else {
        console.log(JSON.stringify(res.data, null, 2));
      }
    } catch (err) {
      console.error('Error fetching orphan entities:', err.message);
    }
  });

module.exports = orphan;
