import React, {Component} from 'react';
import './articlePreview.css';

export default class ArticlePreview extends Component {

    render() {
        return (
            <div className="article-preview-container">
                {this.props.data !== null
                    ?
                        <div className="article-preview">
                            <div className="close-button" onClick={this.props.closePreview}>X</div>
                            
                            {this.props.data.urlToImage !== null 
                                ?   <div className="preview-img-container">
                                        <img className="preview-img" src={this.props.data.urlToImage} alt="article-img"/>
                                    </div >
                                : null
                            }
                            <div>
                            <div className="preview-author">
                                    {this.props.data.author == null || this.props.data.author == ""
                                        ? null
                                        : <img className="author-icon" src={require('../../icons/author-icon.svg')} alt="author"/>
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
                                <div className='preview-date'>{this.props.data.publishedAt.replace(/T|Z/g, ' ').slice(0, -10)}</div>
                            </div>
                            <div style={{clear:"both"}}></div>
                            <h3 className='preview-title'>{this.props.data.title}</h3>
                            <p className="preview-content">
                                {this.props.data.content 
                                    ? this.props.data.content.slice(0, 260)
                                    : null 
                                }
                                <a className="preview-link" target='blank' href={this.props.data.url}> Keep reading</a>    
                            </p>
                                    
                            <div className="preview-source">
                                {this.props.data.source.name}
                            </div>
                        </div>
                    :null
                }
            </div>
        )
    }
}