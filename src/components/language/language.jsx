import React, {Component} from 'react';
import '../search/sourcesList';
import './language.css';

export default class Language extends Component {

    constructor(props){
        super(props)

        this.state = {
            regions : [
                {region: 'us', language: "en"},
                {region: 'es', language: "es"},
                {region: 'fr', language: "fr"},
                {region: 'de', language: "de"},
            ],
            activeRegion: 'us'
        }

        this.chooseRegion = this.chooseRegion.bind(this);
    }

    chooseRegion(e) {
        let region = e.target.getAttribute('data-reg');
        let language = e.target.getAttribute('data-lang');
        this.props.changeRegion(region, language)
        this.setState({activeRegion: region})
    }

    render(){
        let activeReg = this.state.activeRegion;
        return (
            <div className="language-selector">
                <ul className="language-list">
                    {this.state.regions.map((region, index)=>{
                        return <li onClick={this.chooseRegion} 
                                    data-reg={region.region} data-lang={region.language} key={index}
                                    className={activeReg === region.region ? "list-region active-region" : "list-region"}>{region.region}</li>
                    })}
                </ul>
            </div>
        )
    }
}