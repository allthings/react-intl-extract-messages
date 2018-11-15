const childProcess = require('child_process')
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const tmp = require('tmp')
const babel = require('@babel/core')

const projectDir = path.dirname(process.argv[1])

function main(tsconfigFile) {
  const tsconfigFilePath = path.isAbsolute(tsconfigFile)
    ? tsconfigFile
    : path.join(projectDir, tsconfigFile)

  if (!fs.existsSync(tsconfigFilePath)) {
    console.log('Provide a valid tsconfig file.')
    process.exit(1)
  }

  // `unsafeCleanup` removes the folder recursively
  const tmpDir = tmp.dirSync({ unsafeCleanup: true })

  const typescriptBinary = path.join(
    // tsconfig dir indicates the root of the project
    path.dirname(tsconfigFilePath),
    'node_modules/.bin/tsc'
  )
  const args = [
    `--project ${tsconfigFilePath}`,
    `--outDir ${tmpDir.name}`,
    // babel-plugin-react-intl relies on imports
    `--module esnext`,
    `--sourceMap false`,
    '--declaration false',
  ].join(' ')

  // needs a spawned shell, so execFileSync doesn't work here
  childProcess.execSync(`${typescriptBinary} ${args}`)

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

  tmpDir.removeCallback()

  return messages
}

module.exports = main
