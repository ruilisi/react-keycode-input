import PropTypes from 'prop-types'
import React, { Component } from 'react'
import _ from 'lodash'

const translations = {
  'Mobile verification code': '手机验证码',
  'Verification code has been sent to {value}': '验证码已发送至{value}',
  'Click to resend': '点击重新发送',
  'Resend in {value}s': '{value}秒后重新发送'
}

export default class VerificationCodeInput extends Component {

  static propTypes = {
    lang: PropTypes.string,
    initialSeconds: PropTypes.number,
    codeLength: PropTypes.number,
    visible: PropTypes.bool,
    onlyNumber: PropTypes.bool,
    onResend: PropTypes.func,
    onComplete: PropTypes.func
  }

  static defaultProps = {
    codeLength: 4,
    initialSeconds: 60,
    onlyNumber: true,
    lang: 'en'
  }

  inputs = []

  state = {
    codes: _.times(this.props.codeLength, _.constant('')),
    timeLeft: 60
  }

  componentDidMount () {
    const { initialSeconds } = this.props
    this.setState({ timeLeft: initialSeconds })
    this.focusAtFirst()
    this.countDownTimer = setInterval(() => {
      if (this.state.timeLeft > 0) {
        this.setState({ timeLeft: this.state.timeLeft - 1 })
      }
    }, 1000)
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.visible && nextProps.visible) {
      this.setState({ timeLeft: nextProps.initialSeconds })
      this.focusAtFirst()
    }
  }

  focusAtFirst () {
    setTimeout(() => {
      const t = this.inputs[0]
      t && t.focus()
    }, 300)
  }

  componentWillUnmount () {
    clearInterval(this.countDownTimer)
  }

  updateInputRefs (el, index) {
    this.inputs[index] = el
  }

  TR = str => {
    if (this.props.lang === 'zh' && translations[str]) {
      return translations[str]
    } else {
      return str
    }
  }

  inputChange = i => e => {
    const newValue = e.target.value
    if (newValue.length > 1) {
      return
    }
    if (this.props.onlyNumber && newValue.length > 0 && !newValue.match(/[0-9]/)) {
      return
    }
    const codes = this.state.codes
    codes[i] = newValue
    this.setState({ codes })
    if (newValue !== '' && i + 1 < this.inputs.length) {
      this.inputs[i + 1].focus()
    } else if (newValue === '' && i - 1 >= 0) {
      this.inputs[i - 1].focus()
    }
    this.checkAndCommit()
  }

  inputKeyDown = i => e => {
    if (e.key === 'Backspace' && this.inputs[i].value === '' && i - 1 >= 0) {
      this.inputs[i - 1].focus()
    }
  }

  checkAndCommit () {
    let full = true
    let code = ''
    for (let i = 0; i < this.inputs.length; i++) {
      const value = this.inputs[i].value
      if (value === '') {
        full = false
        break
      } else {
        code += value
      }
    }
    if (full && this.props.onComplete) {
      this.props.onComplete(code)
    }
  }

  render () {
    const TR = this.TR
    return <div>
      <div style={{ textAlign: 'center', fontSize: 14 }}>{TR('Mobile verification code')}</div>
      <div style={{ textAlign: 'center', fontSize: 12, color: '#aaa' }}>{TR('Verification code has been sent to {value}').replace('{value}', this.props.mobile)}</div>
      <div style={{ textAlign: 'center', margin: 10 }}>
        {
          _.map(_.range(this.props.codeLength), (v, i) => <input type='text' key={i} onChange={this.inputChange(i)}
            onKeyDown={this.inputKeyDown(i)} value={this.state.codes[i]}
            ref={el => this.updateInputRefs(el, i)}
            style={{ width: 40, height: 40, margin: 8, display: 'inline-block', textAlign: 'center', fontSize: 20 }} />)
        }
      </div>
      { this.state.timeLeft === 0
          ? <p style={{ textAlign: 'center', cursor: 'pointer', fontSize: 12 }} onClick={() => {
            if (this.props.onResend) {
              this.props.onResend()
              this.setState({ timeLeft: this.props.initialSeconds })
            }
          }}>{TR('Click to resend')}</p>
          : <p style={{ textAlign: 'center', fontSize: 12 }}>{TR('Resend in {value}s').replace('{value}', this.state.timeLeft)}</p>
      }
    </div>
  }
}
