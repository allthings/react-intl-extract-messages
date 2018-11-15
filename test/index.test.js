const path = require('path')
const extractMessages = require('../index')

test('Extract all messages', () => {
  const tsconfig = path.join(__dirname, 'fixture-project/tsconfig.json')
  const messages = extractMessages(tsconfig)

  expect(messages).toMatchSnapshot()
})
