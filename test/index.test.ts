import { join, resolve } from 'path'
import { exec } from 'child_process'
import { extractMessages } from '../src'

const tsconfig = join(__dirname, 'fixture-project/tsconfig.json')
const badTsconfig = join(__dirname, 'fixture-project/bad-tsconfig.json')

jest.setTimeout(10000)

test('Extract all messages', () => {
  const messages = extractMessages(tsconfig)

  expect(messages).toMatchSnapshot()
})

test('Extract all messages with options', () => {
  const messages = extractMessages(tsconfig, {
    additionalComponentNames: {
      'react-lingo': ['default', 'LingoFormattedMessage'],
    },
  })

  expect(messages).toMatchSnapshot()
})

test('Fail with invalid non existent tsconfig file', () => {
  expect(() => {
    extractMessages('invalid file')
  }).toThrow()
})

test('Fail with bad tsconfig file', () => {
  expect(() => {
    extractMessages(badTsconfig)
  }).toThrow()
})

test('Test binary', done => {
  exec(
    'node_modules/.bin/ts-node src/cli.ts --tsconfig test/fixture-project/tsconfig.json --options-file test/fixture-project/opts.json',
    { cwd: resolve(__dirname, '..') },
    (err, stdout) => {
      expect(err).toBe(null)
      expect(JSON.parse(stdout)).toMatchSnapshot()
      done()
    },
  )
})
