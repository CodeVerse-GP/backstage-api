const { Command } = require('commander');
const apiClient = require('../apiClient');
const Table = require('cli-table3');

const facet = new Command('facet');

facet.description('Work with entity facets from the Backstage catalog');

facet
  .command('get')
  .description(
    'Get values for a specific facet (e.g. kind, spec.lifecycle, metadata.tags, metadata.namespace)'
  )
  .requiredOption('-f, --facet <facet>', 'Get all entity facets')
  .option('-p, --pretty', 'Pretty-print the output in table format')
  .action(async (options) => {
    try {
      const res = await apiClient.get('/catalog/entity-facets', {
        params: { facet: options.facet },
        headers: { Accept: 'application/json' },
      });

      const facets = res.data.facets;
      const facetKey = options.facet;

      if (!facets || !facets[facetKey]) {
        console.error(`Facet "${facetKey}" not found in response.`);
        return;
      }

      if (options.pretty) {
        const table = new Table({
          head: ['Value', 'Count'],
          colWidths: [30, 10],
        });

        facets[facetKey].forEach(({ value, count }) => {
          table.push([value, count]);
        });

        console.log(table.toString());
      } else {
        console.log(JSON.stringify(res.data, null, 2));
      }
    } catch (err) {
      console.error('Error fetching facet values:', err.message);
    }
  });

module.exports = facet;
