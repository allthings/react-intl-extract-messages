import * as React from 'react'
import {
  defineMessages,
  FormattedMessage,
  FormattedHTMLMessage,
  injectIntl,
  InjectedIntlProps,
} from 'react-intl'
import externalMessages from './messages'

export interface IProps {
  name: string
}

const messages = defineMessages({
  privacy: {
    defaultMessage: 'Privacy',
    description: 'privacy',
    id: 'footer.privacy',
  },
  terms: {
    defaultMessage: 'Terms',
    description: 'terms',
    id: 'footer.terms',
  },
  settings: {
    defaultMessage: 'Settings',
    description: 'settings',
    id: 'footer.settings',
  },
})

function App({ name, intl }: IProps & InjectedIntlProps) {
  return (
    <div>
      <h1>
        <FormattedMessage
          id="header.hello"
          description="hello"
          defaultMessage="Hello {name}"
          values={{ name }}
        />
      </h1>
      <ul>
        <li>{intl.formatMessage(messages.settings)}</li>
        <li>{intl.formatMessage(messages.terms)}</li>
        <li>{intl.formatMessage(messages.privacy)}</li>
        <li>{intl.formatMessage(externalMessages.external)}</li>
        <FormattedHTMLMessage
          id="footer.cookie"
          description="cookie"
          defaultMessage={`<a href="#">You can change your cookie settings here</a>`}
        />
      </ul>
    </div>
  )
}

export default injectIntl(App)
