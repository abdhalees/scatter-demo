var React = require('react')
var ReactDOM = require('react-dom')
var createReactClass = require('create-react-class')

var Scatter = require('./scatter.jsx')

document.body.style.margin = 0
document.body.style.background = '#333'
document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

var container = document.createElement('div')
container.style.display = 'flex'
container.style.justifyContent = 'center'
container.style.alignItems = 'center'
container.style.height = '100vh'

document.body.appendChild(container)

var Element = createReactClass({
  getInitialState: function () {
    return {
      height: window.innerHeight,
      width: window.innerWidth
    }
  },
  componentDidMount: function () {
    window.addEventListener('resize', function () {
      this.setState({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }.bind(this))
  },
  render () {
    return <Scatter width={this.state.width * 0.8}
      height={this.state.height * 0.8}
      dataset='https://azure-respect.glitch.me/iris.json' />
  }})

ReactDOM.render(<Element />, container)
