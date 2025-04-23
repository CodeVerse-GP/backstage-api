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

[
  {
    "metadata": {
      "namespace": "default",
      "annotations": {
        "backstage.io/managed-by-location": "url:xxxxxx",
        "backstage.io/managed-by-origin-location": "url:xxxxxx",
        "backstage.io/view-url": "xxxxxx",
        "backstage.io/edit-url": "xxxxxx",
        "backstage.io/source-location": "url:xxxxxx",
        "backstage.io/orphan": "true"
      },
      "name": "qwerty",
      "uid": "xxxxxx-xxxx-xxxx-xxxx-xxxxxx",
      "etag": "xxxxxx"
    },
    "apiVersion": "backstage.io/v1alpha1",
    "kind": "Component",
    "spec": {
      "type": "service",
      "owner": "user:guest",
      "lifecycle": "experimental"
    },
    "relations": [
      {
        "type": "ownedBy",
        "targetRef": "user:default/guest"
      }
    ]
  }
]
```

```bash
$ backstage-api orphan list --pretty

+-------------+--------+-------------+
| Kind        | Name   | Owner       |
+-------------+--------+-------------+
| Component   | qwerty | user:guest  |
+-------------+--------+-------------+
```

---
