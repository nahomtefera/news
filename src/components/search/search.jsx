import React, {Component} from 'react';
import './search.css';
// components
import SourcesSelector from './sourcesSelector';

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: "",
            sources: null,
            lastSourcesUsed: null
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateSources = this.updateSources.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleInput(e){
        let value = e.target.value;
        this.setState({query: value})
    }

    handleSubmit() {
        let query = this.state.query;
        let sources = this.state.sources;
                
        this.props.updateArticles(query, sources)
        this.setState({lastSourcesUsed: sources})
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleSubmit()
        }
    }

    updateSources(activeSources) {
        let sources="";
        for(let name in activeSources) {
            if(activeSources[name] !== undefined) {
                sources += name + ',';
            }
        }

        this.setState({sources: sources})
    }

    render() {
        return (
            <div className="search-container">
                <div className="input-container">
                    <input className="search-input" onKeyPress={this.handleKeyPress} type="text" placeholder="Search article"  value={this.state.query} onChange={this.handleInput} />
                    <button onClick={this.handleSubmit} className="submit-button"> 
                        {
                            this.state.sources !== this.state.lastSourcesUsed 
                                ? "Refresh"
                                : "Go"
                        }
                    </button>
                    <br/>
                    <div className='attribution'>powerd by <a target="blank" href="https://newsapi.org">NewsAPI.org</a></div> {/*Attribution to Newsapi*/}
                </div>
                <SourcesSelector submit={this.handleSubmit} updateSources={this.updateSources}/>
            </div>
        )
    }
}