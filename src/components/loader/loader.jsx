import React, {Component} from 'react';
import './loader.css';

export default class Loader extends Component {

    render() {
        return (
            <div> 
              <div className="loader-container">
                  <div className="loader">Loading...</div>
              </div>
            </div>
        )
    }
}