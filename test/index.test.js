const path = require('path')
const extractMessages = require('../index')

const tsconfig = path.join(__dirname, 'fixture-project/tsconfig.json')
const badTsconfig = path.join(__dirname, 'fixture-project/bad-tsconfig.json')

test('Extract all messages', () => {
  const messages = extractMessages(tsconfig)

  expect(messages).toMatchSnapshot()
})

test('Fail with invalid non existent tsconfig file', () => {
  expect(() => {
    extractMessages()
  }).toThrow()

  expect(() => {
    extractMessages('invalid file')
  }).toThrow()
})

test('Fail with bad tsconfig file', () => {
  expect(() => {
    extractMessages(badTsconfig)
  }).toThrow()
})
