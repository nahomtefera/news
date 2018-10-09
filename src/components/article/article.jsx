import React, {Component} from 'react';
import './article.css';

export default class Article extends Component {
    
    render() {
        return(
            <div className="article-container">
                <div>
                    <div className="article-source">
                        {this.props.data.source.name}
                    </div>
                    <div className="article-date">{/* We chop the seconds and remove letters T and Z */}
                        {this.props.data.publishedAt.replace(/T|Z/g, ' ').slice(0, -4)}
                    </div>
                </div>
                <div style={{clear:"both"}}></div>
                <h3 className="article-title" onClick={this.props.previewArticle}>{this.props.data.title}</h3>
                <p className="article-description" onClick={this.props.previewArticle}>{this.props.data.description}</p>
                <div>
                    <div className="article-author">
                        {this.props.data.author !== null
                            ? <img className="author-icon" src={require('../../icons/author-icon.svg')} alt="author"/>
                            : null
                        }
                        {
                            this.props.data.author !== null
                                ? this.props.data.author.indexOf("http") !== -1
                                    ? <a target="blank" href={this.props.data.author}>Author</a> //sometimes the author data is a link to facebook
                                    : <a target="blank" href={`http://www.google.com/search?q=${this.props.data.author}`}> {/*If it's not a link we will open a google search*/}                                        {
                                            this.props.data.author.length > 20 //if the text it's too long we will slice it
                                                ? this.props.data.author.slice(0, 20).toLowerCase() + "..."
                                                : this.props.data.author.toLowerCase()
                                        }
                                      </a>
                                : ""
                        }
                    </div>
                    <div className="article-url">
                        <a target="blank" href={this.props.data.url}>Go to Source</a>
                    </div>
                </div>
                <div style={{clear:"both"}}></div>
            </div>
        )
    }
}