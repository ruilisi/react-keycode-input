import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Modal } from 'antd'
import KeycodeInput from './keycode-input.js'

export default class KeycodeInputModal extends Component {

  static propTypes = {
    initialSeconds: PropTypes.number,
    mobile: PropTypes.string,
    codeLength: PropTypes.number,
    style: PropTypes.object,
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
    style: {},
    width: 330
  }

  render () {
    const { initialSeconds, codeLength, width, visible, onlyNumber, onResend, onComplete, onCancel, lang, style, mobile } = this.props
    return <Modal
      maskClosable={false}
      style={style}
      footer={null}
      title={null}
      onCancel={onCancel}
      width={width}
      visible={visible}>
      <KeycodeInput
        initialSeconds={initialSeconds}
        codeLength={codeLength}
        onlyNumber={onlyNumber}
        onResend={onResend}
        onComplete={onComplete}
        visible={visible}
        lang={lang}
        mobile={mobile}
      />
    </Modal>
  }
}
