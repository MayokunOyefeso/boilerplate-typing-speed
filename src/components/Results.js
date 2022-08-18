import React, { Component } from 'react'

export default class Results extends Component {
  render() {
    return (
        <div className="alert alert-primary mt-3" role="alert">
            Score:{this.props.score}
        </div>
    )
  }
}
