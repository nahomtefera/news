import React, {Component} from 'react';
import './search.css';

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ""
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e){
        let value = e.target.value;
        this.setState({query: value})
    }

    handleSubmit() {
        let query = this.state.query;
        
        if(query.length < 4) return; 
        
        this.props.updateArticles(query)
    }

    render() {
        return (
            <div className="search-container">
                <div className="input-container">
                    <input 
                        className="search-input"
                        type="text" 
                        placeholder="Search article"
                        value={this.state.query}
                        onChange={this.handleInput}
                    />
                    <button onClick={this.handleSubmit} className="submit-button"> Go</button>
                </div>
            </div>
        )
    }
}