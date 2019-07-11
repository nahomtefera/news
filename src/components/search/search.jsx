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
                
        this.props.search(query, sources)
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
        this.setState({sources: sources}, ()=>{this.handleSubmit()})
    }

    render() {
        let nightMode = this.props.nightMode;
        return (
            <div className="search-container">
                <div className="input-container">
                    <input className={ nightMode ? "dark-search-input" : "search-input"} onKeyPress={this.handleKeyPress} type="text" placeholder="Search article"  value={this.state.query} onChange={this.handleInput} />
                    <button onClick={this.handleSubmit} className={ nightMode ? "dark-submit-button" : "submit-button"} >Go</button>
                    <br/>
                    <div className={nightMode ? 'dark-attribution' : 'attribution'}>powerd by <a target="blank" href="https://newsapi.org">NewsAPI.org</a></div> {/*Attribution to Newsapi*/}
                </div>
                <SourcesSelector nightMode={nightMode} region={this.props.region} submit={this.handleSubmit} updateSources={this.updateSources}/>
            </div>
        )
    }
}