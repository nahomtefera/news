import React, {Component} from 'react';
import './nightMode.css'


export default class NightMode extends Component {
  render() {
    return (
      <div className={this.props.nightMode === true ? "theme-container" : "theme-container-dark"}>
        <div onClick={this.props.toggleNightMode}
            className={this.props.nightMode === true ? "theme-button" : "theme-button-light"}>
        </div>
      </div>
    )
  }
}

