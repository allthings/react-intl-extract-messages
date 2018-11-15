# react-intl-extract-messages

Extracts all `react-intl` related messages in typescript based projects.

## Install

```bash
yarn add @allthings/react-intl-extract-messages
```

## Usage

This package provides a binary:

```bash
react-intl-extract-messages --tsconfig tsconfig.json --out messages.json
```

If `--out` is omitted, the output will be written to stdout.

-----

Produces something like:

```json
[
  {
    "id": "authorized-clients-list.revoke",
    "description": "Revoke",
    "defaultMessage": "Revoke"
  },
  {
    "id": "authorized-clients-list.terms-of-use",
    "description": "Terms of use",
    "defaultMessage": "Terms of use"
  },
  // ...  
]
```

## How

Bascially it uses typescript to compile all the files to JS and then uses [`babel-plugin-react-intl`](https://github.com/yahoo/babel-plugin-react-intl) to extract the messages.

## @todo

Tests
