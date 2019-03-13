import { join } from 'path'
import { extractMessages } from '../src'

const tsconfig = join(__dirname, 'fixture-project/tsconfig.json')
const badTsconfig = join(__dirname, 'fixture-project/bad-tsconfig.json')

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
