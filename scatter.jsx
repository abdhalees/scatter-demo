var React = require('react')
var linmap = require('linmap')
var jsonist = require('jsonist')
var createReactClass = require('create-react-class')

module.exports = createReactClass({
  getInitialState: function () {
    return {
      data: [],
      show: 'none',
      flower: {},
      err: null
    }
  },
  componentDidMount: function () {
    jsonist.get(this.props.dataset, {}, function (err, data, resp) {
      if (err) this.setState({err: err})
      this.setState({data: data})
    }.bind(this))
  },
  getColor: function (species) {
    if (species === 'virginica') return '#1f77b4'
    else if (species === 'versicolor') return '#2ca02c'
    else return '#ff7f0e'
  },
  onMouseEnter: function (e, row, i) {
    e.target.style.border = '1px solid white'
    this.setState({flower: Object.assign(row, {i: i})})
    this.setState({show: 'block'})
  },
  onMouseLeave: function (e) {
    e.target.style.border = ''
    this.setState({show: 'none'})
  },
  render () {
    if (this.state.err) return <h4>{this.state.err}</h4>
    return <div style={{background: '#222',
      border: '1px solid black',
      boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.5)',
      color: 'rgba(255, 255, 255, 0.7)',
      height: this.props.height,
      position: 'relative',
      width: this.props.width}}>

      {this.state.data.map(function (row, i) {
        return <div style={{background: this.getColor(row.species),
          borderRadius: 5,
          bottom: linmap(0, this.props.height, 0, 39000, row.petalLength),
          cursor: 'pointer',
          height: 10,
          left: linmap(0, this.props.width, 0, 430000, row.petalWidth),
          position: 'absolute',
          width: 10}}
          onMouseEnter={function (e) { this.onMouseEnter(e, row, i) }.bind(this)}
          onMouseLeave={this.onMouseLeave}
         />
      }.bind(this))}
      <div style={{display: this.state.show}}>
        <p>i: {this.state.flower.i}</p>
        <p>species: {this.state.flower.species} </p>
        <p>petalWidth: {this.state.flower.petalWidth} </p>
        <p>petalLength: {this.state.flower.petalLength} </p>
        <p>sepalWidth: {this.state.flower.sepalWidth} </p>
        <p>sepalLength: {this.state.flower.sepalLength} </p>
      </div>
    </div>
  }
})
