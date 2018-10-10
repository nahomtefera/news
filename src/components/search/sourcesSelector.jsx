import React, {Component} from 'react';
import './sourcesSelector.css';
import sourcesList from './sourcesList'; // List of all the sources available

export default class SourcesSelector extends Component {

    constructor(props) {
        super(props);

        this.state={
            active: {},
        }
        
        this.toggleSource = this.toggleSource.bind(this)
    }

    toggleSource(e){
        let source = e.target.id;
        let prevState = this.state.active;

        if(prevState[source] !== undefined) {
            prevState[source] = undefined;
            this.props.updateSources(prevState)
            this.setState({active: prevState}, ()=>{this.props.submit()})

        } else if(prevState[source] == undefined) {
            prevState[source] = true;
            this.props.updateSources(prevState)
            this.setState({active: prevState}, ()=>{this.props.submit()})
        }

        
    }

    render(){
        return (
            <div className="sources-selector-container">
                <div className="sources-slider">
                    <ul className="sources-list">
                        {
                            sourcesList.us.map((source, index)=>{
                                return <li key={index} id={source.id} 
                                            onClick={this.toggleSource} 
                                            className={this.state.active[source.id] !== undefined 
                                                ? "source-item-active source-item" 
                                                : "source-item"}>
                                            {source.name}
                                        </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}