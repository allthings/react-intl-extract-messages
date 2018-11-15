#!/usr/bin/env node
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const tmp = require('tmp')
const babel = require('@babel/core')
const argv = require('minimist')(process.argv.slice(2))

if (argv.help || !argv.tsconfig) {
  console.log('Usage: message-extractor --tsconfig file.json [--out file.json]')
  process.exit(argv.tsconfig ? 0 : 1)
}

// `unsafeCleanup` removes the folder recursively
const tmpDir = tmp.dirSync({ unsafeCleanup: true })

const args = [
  `--project ${argv.tsconfig}`,
  `--outDir ${tmpDir.name}`,
  // babel-plugin-react-intl relies on imports
  `--module esnext`,
  `--sourceMap false`,
  '--declaration false',
].join(' ')

// needs a spawned shell, so execFileSync doesn't work here
execSync(`node_modules/.bin/tsc ${args}`)

const files = glob.sync(path.join(tmpDir.name, '**/*.js'))
const babelCompileOptions = {
  plugins: [
    require('@babel/plugin-syntax-dynamic-import'),
    require('babel-plugin-react-intl'),
  ],
}
const messages = files.reduce((allMessages, fileName) => {
  const result = babel.transformFileSync(fileName, babelCompileOptions)
  const { messages } = result.metadata['react-intl']

  return [...allMessages, ...messages]
}, [])

const messagesJSON = JSON.stringify(messages, null, 2)

if (!argv.out) {
  console.log(messagesJSON)
} else {
  fs.writeFileSync(path.join(process.cwd(), argv.out), messagesJSON, 'utf-8')
}

tmpDir.removeCallback()
