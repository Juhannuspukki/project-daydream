import React, { Component } from 'react';

class CustomizedXAxisTick extends Component {
  render () {
    const {x, y, payload} = this.props;
    
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#fff" transform="rotate(-35)">{payload.value}</text>
      </g>
    );
  }
}

export default CustomizedXAxisTick;