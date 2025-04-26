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

## 📚 `catalog` Command

### 🔄 `catalog refresh` Command

```bash
$ backstage-api catalog refresh --entity-ref component:default/my-service

🔄 Refreshing entity: component:default/my-service...
✅ Entity refresh request submitted successfully!
```

### 🔍 `catalog get-by-name` Command

```bash
$ backstage-api catalog get-by-name --kind Component --name my-service --namespace default

🔍 Looking up entity: Component:default/my-service...
✅ Entity found!

Entity details:
{
  "metadata": {
    "namespace": "default",
    "annotations": {
      "backstage.io/managed-by-location": "url:https://github.com/example/repo/blob/master/catalog-info.yaml",
      "backstage.io/managed-by-origin-location": "url:https://github.com/example/repo/blob/master/catalog-info.yaml",
      "backstage.io/view-url": "https://github.com/example/repo/blob/master/catalog-info.yaml",
      "backstage.io/edit-url": "https://github.com/example/repo/edit/master/catalog-info.yaml"
    },
    "name": "my-service",
    "uid": "12345-abcde-67890-fghij",
    "etag": "abc123def456"
  },
  "apiVersion": "backstage.io/v1alpha1",
  "kind": "Component",
  "spec": {
    "type": "service",
    "lifecycle": "production",
    "owner": "team:engineering"
  },
  "relations": [
    {
      "type": "ownedBy",
      "targetRef": "group:default/engineering"
    }
  ]
}
```

```bash
$ backstage-api catalog get-by-name --kind Component --name my-service --namespace default --pretty

🔍 Looking up entity: Component:default/my-service...
✅ Entity found!

📋 Entity Details:

┌────────────┬─────────────────┐
│ Kind       │ Component       │
├────────────┼─────────────────┤
│ Name       │ my-service      │
├────────────┼─────────────────┤
│ Namespace  │ default         │
├────────────┼─────────────────┤
│ Title      │ N/A             │
├────────────┼─────────────────┤
│ Description│ N/A             │
├────────────┼─────────────────┤
│ Owner      │ team:engineering│
├────────────┼─────────────────┤
│ Type       │ service         │
├────────────┼─────────────────┤
│ Lifecycle  │ production      │
└────────────┴─────────────────┘

📝 Annotations:
┌───────────────────────────────────────────┬──────────────────────────────────────────────────────────────────┐
│ Key                                       │ Value                                                            │
├───────────────────────────────────────────┼──────────────────────────────────────────────────────────────────┤
│ backstage.io/managed-by-location          │ url:https://github.com/example/repo/blob/master/catalog-info.yaml│
├───────────────────────────────────────────┼──────────────────────────────────────────────────────────────────┤
│ backstage.io/managed-by-origin-location   │ url:https://github.com/example/repo/blob/master/catalog-info.yaml│
├───────────────────────────────────────────┼──────────────────────────────────────────────────────────────────┤
│ backstage.io/view-url                     │ https://github.com/example/repo/blob/master/catalog-info.yaml    │
├───────────────────────────────────────────┼──────────────────────────────────────────────────────────────────┤
│ backstage.io/edit-url                     │ https://github.com/example/repo/edit/master/catalog-info.yaml    │
└───────────────────────────────────────────┴──────────────────────────────────────────────────────────────────┘

🔄 Relations:
┌──────────┬──────────────────────────┐
│ Type     │ Target                   │
├──────────┼──────────────────────────┤
│ ownedBy  │ group:default/engineering│
└──────────┴──────────────────────────┘
```

### 🌍 `catalog create-location` Command

```bash
$ backstage-api catalog create-location --target https://github.com/org/repo/blob/master/catalog-info.yaml

📝 Creating location for target: https://github.com/org/repo/blob/master/catalog-info.yaml...
✅ Location created successfully!
```
