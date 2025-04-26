# Available commands

## 📘 `facet` Command

The `facet` command lets you query entity facet values from your Backstage instance. Facets are properties like `kind`, `metadata.namespace`, `metadata.tags`or `spec.lifecycle`.

---

### 🔧 Usage

```bash
$ backstage-api facet get --help

Usage: backstage-api facet get [options]

Get values for a specific facet (e.g. kind, spec.lifecycle, metadata.tags, metadata.namespace)

Options:
  -f, --facet <facet>  Get all entity facets
  -p, --pretty         Pretty-print the output in table format
  -h, --help           display help for command
```

### ✅ Supported Facet Keys

- kind
- metadata.namespace
- metadata.tags
- spec.lifecycle

---

## 🧭 `orphan` Command

The `orphan` command lets you list all orphaned entities in your Backstage catalog — these are entities not connected to any location, often leftovers or mistakes.

---

### 🔧 Usage

```bash
backstage-api orphan list --help

Usage: backstage-api orphan list [options]

List all orphan entities

Options:
  -p, --pretty          Pretty-print output in a table
  -l, --limit <number>  Limit the number of results returned
  -h, --help            display help for command
```

---

## 📚 `catalog` Command

The `catalog` command provides utilities for interacting with the Backstage catalog, allowing you to refresh entities and register new components through locations.

---

### 🔄 `catalog refresh` Command

The `refresh` subcommand allows you to trigger a refresh of an entity in the Backstage catalog.

#### 🔧 Usage

```bash
$ backstage-api catalog refresh --help

Usage: backstage-api catalog refresh [options]

Refresh an entity in the Backstage catalog

Options:
  -e, --entity-ref <entityRef>  Entity reference in the format kind:namespace/name
  -h, --help                    display help for command
```
---

### 🔍 `catalog get-by-name` Command

The `get-by-name` subcommand allows you to retrieve detailed information about a specific entity using its kind, namespace, and name.

#### 🔧 Usage

```bash
$ backstage-api catalog get-by-name --help

Usage: backstage-api catalog get-by-name [options]

Get an entity by name from the Backstage catalog

Options:
  -k, --kind <kind>              Entity kind (e.g., Component, API, System)
  -n, --name <name>              Entity name
  -s, --namespace <namespace>    Entity namespace (e.g., default)
  -p, --pretty                   Pretty-print the output in table format
  -h, --help                     display help for command
```
---

### 🌍 `catalog create-location` Command

The `create-location` subcommand registers a new component location in the Backstage catalog, allowing Backstage to discover and import components from external sources.

#### 🔧 Usage

```bash
$ backstage-api catalog create-location --help

Usage: backstage-api catalog create-location [options]

Create a location to import a component into the Backstage catalog

Options:
  -t, --target <target>  Target URL of the component to import
  -h, --help             display help for command
```

#### ✅ Notes

- The `--target` parameter should be a URL pointing to a catalog-info.yaml file.
