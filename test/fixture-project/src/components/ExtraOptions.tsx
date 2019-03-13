import * as React from 'react'
// Example, non-existent library for `additionalComponentNames` option
import LingoMessage, { LingoFormattedMessage } from 'react-lingo'

export default function ExtraOptions() {
  // these should be picked up with the option
  return (
    <>
      <LingoMessage id="foo" description="foo" defaultMessage="foo" />
      <LingoFormattedMessage id="bar" description="bar" defaultMessage="bar" />
    </>
  )
}
