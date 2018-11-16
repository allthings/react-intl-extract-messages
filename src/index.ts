import childProcess from 'child_process'
import fs from 'fs'
import path from 'path'

import glob from 'glob'
import tmp from 'tmp'
import {
  transformFileSync,
  BabelFileMetadata,
  BabelFileResult,
} from '@babel/core'

const projectDir = path.dirname(process.argv[1])

interface IntlMessage {
  id: string
  defaultMessage: string
  description?: string
}

interface BabelMetadataReactIntl extends BabelFileMetadata {
  'react-intl': {
    messages: IntlMessage[]
  }
}

interface BabelFileResultReactIntl extends BabelFileResult {
  metadata: BabelMetadataReactIntl
}

export function extractMessages(tsconfigFile: string) {
  const tsconfigFilePath = path.isAbsolute(tsconfigFile)
    ? tsconfigFile
    : path.join(projectDir, tsconfigFile)

  if (!fs.existsSync(tsconfigFilePath)) {
    throw new Error('Provide a valid tsconfig file.')
  }

  // `unsafeCleanup` removes the folder recursively
  const tmpDir = tmp.dirSync({ unsafeCleanup: true })

  const typescriptBinary = path.join(
    // tsconfig dir indicates the root of the project
    path.dirname(tsconfigFilePath),
    'node_modules/.bin/tsc',
  )
  const args = [
    `--project ${tsconfigFilePath}`,
    `--outDir ${tmpDir.name}`,
    // babel-plugin-react-intl relies on imports
    `--module esnext`,
    `--jsx preserve`,
    `--sourceMap false`,
    '--declaration false',
  ].join(' ')

  try {
    // needs a spawned shell, so execFileSync doesn't work here
    childProcess.execSync(`${typescriptBinary} ${args}`)
  } catch (e) {
    tmpDir.removeCallback()
    throw new Error(e.stdout.toString())
  }

  const files = glob.sync(path.join(tmpDir.name, '**/*.@(js|jsx)'))

  const babelCompileOptions = {
    presets: ['@babel/preset-react'],
    plugins: [
      require('@babel/plugin-syntax-dynamic-import'),
      require('babel-plugin-react-intl'),
    ],
  }
  const messages: IntlMessage[] = files.reduce(
    (allMessages: IntlMessage[], fileName) => {
      const result = transformFileSync(
        fileName,
        babelCompileOptions,
      ) as BabelFileResultReactIntl

      const { messages } = result.metadata['react-intl']

      return [...allMessages, ...messages]
    },
    [],
  )

  tmpDir.removeCallback()

  return messages
}

export default extractMessages
