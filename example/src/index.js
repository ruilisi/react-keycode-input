import React from 'react'
import ReactDOM from 'react-dom'
import VerificationInput from 'react-verification-code-input'
import VerificationInputModal from 'react-verification-code-input/modal'
import 'antd/dist/antd.css'
import { Button, message } from 'antd'

class Demo extends React.Component {

  state = {
    modalOpen: false
  }

  handleComplete = code => {
    message.success(code)
  }

  handleResend = () => {
    message.success('Resend')
  }

  render() {
    return <div>
      <VerificationInput
        codeLength={5}
        initialSeconds={30}
        onlyNumber={false}
        mobile='13770000000'
        style={{ margin: 30 }}
        onCancel={() => this.setState({ modalOpen: false })}
        onComplete={this.handleComplete}
        onResend={this.handleResend} />
      <div style={{ textAlign: 'center' }}>
        <Button type='primary' onClick={() => this.setState({ modalOpen: true })}>Open Modal</Button>
      </div>
      <VerificationInputModal
        lang='zh'
        mobile='13770000000'
        visible={this.state.modalOpen}
        onCancel={() => this.setState({ modalOpen: false })}
        onComplete={this.handleComplete}
        onResend={this.handleResend} />
    </div>
  }
}

ReactDOM.render(<Demo />, document.getElementById('root'))
