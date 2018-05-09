import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Modal } from 'antd'
import VerificationCodeInput from './verification-code-input.js'

export default class VerificationCodeInputModal extends Component {

  static propTypes = {
    initialSeconds: PropTypes.number,
    codeLength: PropTypes.number,
    width: PropTypes.number,
    visible: PropTypes.bool,
    onlyNumber: PropTypes.bool,
    onResend: PropTypes.func,
    onComplete: PropTypes.func,
    onCancel: PropTypes.func
  }

  static defaultProps = {
    codeLength: 4,
    initialSeconds: 60,
    onlyNumber: true,
    lang: 'en',
    width: 330
  }

  render () {
    const { initialSeconds, codeLength, width, visible, onlyNumber, onResend, onComplete, onCancel, lang } = this.props
    return <Modal
      maskClosable={false}
      footer={null}
      title={null}
      onCancel={onCancel}
      width={width}
      visible={visible}>
      <VerificationCodeInput
        initialSeconds={initialSeconds}
        codeLength={codeLength}
        onlyNumber={onlyNumber}
        onResend={onResend}
        onComplete={onComplete}
        visible={visible}
        lang={lang}
      />
    </Modal>
  }
}
