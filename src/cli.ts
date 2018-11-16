#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

import minimist from 'minimist'

const argv = minimist(process.argv.slice(2))
const extractMessages = require('./index')

if (argv.help || !argv.tsconfig) {
  console.log(
    'Usage: message-extractor --tsconfig tsconfig.json [--out file.json]'
  )
  process.exit(argv.tsconfig ? 0 : 1)
}

const tsconfigFilePath = path.join(process.cwd(), argv.tsconfig)

const messages = JSON.stringify(extractMessages(tsconfigFilePath), null, 2)

if (!argv.out) {
  console.log(messages)
} else {
  fs.writeFileSync(path.join(process.cwd(), argv.out), messages, 'utf-8')
}
