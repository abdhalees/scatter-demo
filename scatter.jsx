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
      minMax: {},
      err: null
    }
  },
  componentDidMount: function () {
    jsonist.get(this.props.dataset, {}, function (err, data, resp) {
      if (err) this.setState({err: err})
      var dataKeys = data.map(function (flower) {
        return Object.assign(flower, {key: Math.random()})
      })
      this.setState({data: dataKeys})
      var flowerShape = data.reduce(function (acc, curr) {
        acc.minHeight = (acc.minHeight === 0 || curr.petalLength < acc.minHeight) ? curr.petalLength : acc.minHeight
        acc.maxHeight = (acc.maxHeight === 0 || curr.petalLength > acc.maxHeight) ? curr.petalLength : acc.maxHeight
        acc.minWidth = (acc.minWidth === 0 || curr.petalWidth < acc.minWidth) ? curr.petalWidth : acc.minWidth
        acc.maxWidth = (acc.maxmaxWidth === 0 || curr.petalWidth > acc.maxWidth) ? curr.petalWidth : acc.maxWidth
        return acc
      }, {minHeight: 0,
        maxHeight: 0,
        minWidth: 0,
        maxWidth: 0})
      this.setState({minMax: flowerShape})
    }.bind(this))
  },
  getColor: function (species) {
    if (species === 'virginica') return '#1f77b4'
    if (species === 'versicolor') return '#2ca02c'
    return '#ff7f0e'
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
    return <div style={{
      background: '#222',
      border: '1px solid black',
      boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.5)',
      color: 'rgba(255, 255, 255, 0.7)',
      height: this.props.height,
      position: 'relative',
      width: this.props.width
    }}
            >
      {this.state.data.map(function (row, i) {
        return <div
          key={row.key}
          style={{
            background: this.getColor(row.species),
            borderRadius: 5,
            bottom: linmap(this.state.minMax.minHeight, this.state.minMax.maxHeight, 0, this.props.height, row.petalLength) - 5,
            cursor: 'pointer',
            height: 10,
            left: linmap(this.state.minMax.minWidth, this.state.minMax.maxWidth, 0, this.props.width, row.petalWidth) - 5,
            position: 'absolute',
            width: 10
          }}
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
