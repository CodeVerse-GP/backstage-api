const { Command } = require('commander');
const apiClient = require('../apiClient');
const Table = require('cli-table3');

const catalog = new Command('catalog');

catalog
  .command('refresh')
  .description('Refresh an entity in the Backstage catalog')
  .requiredOption('-e, --entity-ref <entityRef>', 'Entity reference in the format kind:namespace/name')
  .action(async (options) => {
    try {
      const { entityRef } = options;
      
      console.log(`🔄 Refreshing entity: ${entityRef}...`);
      
      const res = await apiClient.post('/catalog/refresh', {
        entityRef,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (res.status >= 200 && res.status < 300) {
        console.log('✅ Entity refresh request submitted successfully!');
        
        if (res.data) {
          console.log('\nResponse details:');
          console.log(JSON.stringify(res.data, null, 2));
        }
      } else {
        console.error(`❌ Request failed with status: ${res.status}`);
      }
    } catch (err) {
      console.error('💥 Error refreshing entity:', err.message);
      if (err.response) {
        console.error(`Status: ${err.response.status}`);
        console.error('Details:', JSON.stringify(err.response.data, null, 2));
      }
      process.exit(1);
    }
  });

// Get entity by name subcommand
catalog
  .command('get-by-name')
  .description('Get an entity by name from the Backstage catalog')
  .requiredOption('-k, --kind <kind>', 'Entity kind (e.g., Component, API, System)')
  .requiredOption('-n, --name <name>', 'Entity name')
  .requiredOption('-s, --namespace <namespace>', 'Entity namespace (e.g., default)')
  .option('-p, --pretty', 'Pretty-print the output in table format')
  .action(async (options) => {
    try {
      const { kind, name, namespace } = options;
      
      if (options.pretty) {
        console.log(`🔍 Looking up entity: ${kind}:${namespace}/${name}...`);
      }
      
      const res = await apiClient.get(`/catalog/entities/by-name/${encodeURIComponent(kind)}/${encodeURIComponent(namespace)}/${encodeURIComponent(name)}`, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (res.status >= 200 && res.status < 300) {
        if (options.pretty) {
          console.log('✅ Entity found!');
          
          const entity = res.data;
          
          console.log('\n📋 Entity Details:\n');
          
          const infoTable = new Table();
          
          infoTable.push(
            { 'Kind': entity.kind || 'N/A' },
            { 'Name': entity.metadata?.name || 'N/A' },
            { 'Namespace': entity.metadata?.namespace || 'N/A' },
            { 'Title': entity.metadata?.title || 'N/A' },
            { 'Description': entity.metadata?.description || 'N/A' },
            { 'Owner': entity.spec?.owner || 'N/A' },
            { 'Type': entity.spec?.type || 'N/A' },
            { 'Lifecycle': entity.spec?.lifecycle || 'N/A' }
          );
          
          console.log(infoTable.toString());
          
          // Show annotations if present
          if (entity.metadata?.annotations && Object.keys(entity.metadata.annotations).length > 0) {
            console.log('\n📝 Annotations:');
            const annotationsTable = new Table({
              head: ['Key', 'Value'],
              colWidths: [40, 50],
            });
            
            Object.entries(entity.metadata.annotations).forEach(([key, value]) => {
              annotationsTable.push([key, value]);
            });
            
            console.log(annotationsTable.toString());
          }
          
          // Show relations if present
          if (entity.relations && entity.relations.length > 0) {
            console.log('\n🔄 Relations:');
            const relationsTable = new Table({
              head: ['Type', 'Target'],
              colWidths: [20, 60],
            });
            
            entity.relations.forEach((relation) => {
              relationsTable.push([relation.type, relation.targetRef]);
            });
            
            console.log(relationsTable.toString());
          }
        } else {
          console.log(JSON.stringify(res.data, null, 2));
        }
      } else {
        if (options.pretty) {
          console.error(`❌ Request failed with status: ${res.status}`);
        } else {
          console.log(JSON.stringify({
            error: true,
            status: res.status,
            message: `Request failed with status: ${res.status}`
          }, null, 2));
        }
      }
    } catch (err) {
      if (options.pretty) {
        console.error('💥 Error fetching entity:', err.message);
        if (err.response) {
          console.error(`Status: ${err.response.status}`);
          console.error('Details:', JSON.stringify(err.response.data, null, 2));
        }
      } else {
        console.log(JSON.stringify({
          error: true,
          message: err.message,
          status: err.response?.status,
          details: err.response?.data
        }, null, 2));
      }
      process.exit(1);
    }
  });

// Create location subcommand
catalog
  .command('create-location')
  .description('Create a location to import a component into the Backstage catalog')
  .requiredOption('-t, --target <target>', 'Target URL of the component to import')
  .action(async (options) => {
    try {
      const { target } = options;
      const type = 'url';
      
      console.log(`📝 Creating location for target: ${target}...`);
      
      const res = await apiClient.post('/catalog/locations', {
        target,
        type
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (res.status >= 200 && res.status < 300) {
        console.log('✅ Location created successfully!');
        
        if (res.data) {
          console.log('\nLocation details:');
          console.log(JSON.stringify(res.data, null, 2));
        }
      } else {
        console.error(`❌ Request failed with status: ${res.status}`);
      }
    } catch (err) {
      console.error('💥 Error creating location:', err.message);
      if (err.response) {
        console.error(`Status: ${err.response.status}`);
        console.error('Details:', JSON.stringify(err.response.data, null, 2));
      }
      process.exit(1);
    }
  });

module.exports = catalog;
