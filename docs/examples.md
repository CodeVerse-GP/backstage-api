# 🧪 Examples

## 📘 `facet` Command

```bash
$ backstage-api facet get --facet spec.lifecycle

{
  "facets": {
    "spec.lifecycle": [
      {
        "value": "production",
        "count": 8
      },
      {
        "value": "development",
        "count": 5
      }
    ]
  }
}
```

```bash
$ backstage-api facet get --facet spec.lifecycle --pretty

+-------------+-------+
| Value       | Count |
+-------------+-------+
| production  | 8     |
| development | 5     |
+-------------+-------+
```

---

## 🧭 `orphan` Command

```bash
backstage-api orphan list
```
