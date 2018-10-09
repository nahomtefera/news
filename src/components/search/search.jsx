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
    }

    handleInput(e){
        let value = e.target.value;
        this.setState({query: value})
    }

    handleSubmit() {
        let query = this.state.query;
        let sources = this.state.sources;
        
        if(query.length < 4) return; 
        
        this.props.updateArticles(query, sources)
        this.setState({lastSourcesUsed: sources})
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
                    <input className="search-input" type="text" placeholder="Search article"  value={this.state.query} onChange={this.handleInput} />
                    <button onClick={this.handleSubmit} className="submit-button"> 
                        {
                            this.state.sources !== this.state.lastSourcesUsed 
                                ? "Update"
                                : "Go"
                        }
                    </button>
                    <div className='attribution'>powerd by <a target="blank" href="https://newsapi.org">NewsAPI.org</a></div> {/*Attribution to Newsapi*/}
                </div>
                <SourcesSelector updateSources={this.updateSources}/>
            </div>
        )
    }
}