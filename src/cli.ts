#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

import minimist from 'minimist'

const argv = minimist(process.argv.slice(2))
const { extractMessages } = require('./index')

if (argv.help || !argv.tsconfig) {
  console.log(
    'Usage: react-intl-extract-messages --tsconfig tsconfig.json [--out file.json] [--options-file babel-plugin-intl-options.json]',
  )
  process.exit(argv.tsconfig ? 0 : 1)
}

const options = argv['options-file']
  ? JSON.parse(
      fs.readFileSync(path.join(process.cwd(), argv['options-file']), 'utf-8'),
    )
  : undefined

const tsconfigFilePath = path.join(process.cwd(), argv.tsconfig)

const messages = JSON.stringify(
  extractMessages(tsconfigFilePath, options),
  null,
  2,
)

if (!argv.out) {
  console.log(messages)
} else {
  fs.writeFileSync(path.join(process.cwd(), argv.out), messages, 'utf-8')
}
