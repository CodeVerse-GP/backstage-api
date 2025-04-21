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

# 🧭 `orphan` Command

The `orphan` command lets you list all orphaned entities in your Backstage catalog — these are entities not connected to any location, often leftovers or mistakes.

---

## 🔧 Usage

```bash
backstage-api orphan list --help

Usage: backstage-api orphan list [options]

List all orphan entities

Options:
  -p, --pretty          Pretty-print output in a table
  -l, --limit <number>  Limit the number of results returned
  -h, --help            display help for command
```
