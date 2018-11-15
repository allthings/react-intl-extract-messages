# react-intl-extract-messages

Extracts all `react-intl` related messages in typescript based projects.

## Install

```bash
yarn add @allthings/react-intl-extract-messages
```

## Usage

### API

#### extractMessages(tsconfigFile)

Returns an array of messages gathered by [`babel-plugin-react-intl`](https://github.com/yahoo/babel-plugin-react-intl).

##### tsconfigFile

Type: `string`

Can be absolute or relative path to the tsconfig file, all information how to build the project is taken from there.

```js
// <projectRoot>/bin/extract-messages.js:
import extractMessages from '@allthings/react-intl-extract-messages'

const messages = extractMessages('../tsconfig.json')

console.log(messages)

// [
//   {
//     id: 'authorized-clients-list.revoke',
//     description: 'Revoke',
//     defaultMessage: 'Revoke',
//   },
//   {
//     id: 'authorized-clients-list.terms-of-use',
//     description: 'Terms of use',
//     defaultMessage: 'Terms of use',
//   },
//   // ...
// ]
```

### CLI

```bash
react-intl-extract-messages --tsconfig tsconfig.json --out messages.json
```

If `--out` is omitted, the output will be written to stdout.

## How

Bascially it uses typescript to compile all the files to JS and then uses [`babel-plugin-react-intl`](https://github.com/yahoo/babel-plugin-react-intl) to extract the messages.

## Tests

Run tests with `yarn run test`.

This will extract messages from a fixture project and check it against a snapshot. 
