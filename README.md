# Backstage API CLI

`backstage-api` is a command-line tool designed to simplify interactions with the Backstage API.

## Installation

```bash
npm install -g backstage-api
```

## Configuration

1. Add static token to your backend auth. More can be read [here](https://backstage.io/docs/auth/service-to-service-auth#static-tokens)

```yaml title="in e.g. app-config.production.yaml"
backend:
  auth:
    externalAccess:
      - type: static
        options:
          token: ${ADMIN_CURL_TOKEN}
          subject: admin-curl-access
```

2. To define url for your Backstage, set the BACKSTAGE_API_URL environment variable

```bash
export BACKSTAGE_API_URL="https://your-backstage-api-url.com/api"
```

3. To authenticate commands, set the BACKSTAGE_API_KEY

```bash
export BACKSTAGE_API_KEY="your-backstage-api-key"
```

## Backstage CLI manual

- [Available commands](./docs/manual.md)
- [Usage examples](./docs/examples.md)

## License

This project is licensed under the [MIT License](LICENSE).

## Support

- Report bugs or search for existing feature requests in our [issue tracker](https://github.com/CodeVerse-GP/backstage-api/issues).
