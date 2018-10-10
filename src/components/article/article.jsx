import React, {Component} from 'react';
import './article.css';

export default class Article extends Component {
    
    render() {
        
        let article = this.props.data, previewArticle = this.props.previewArticle;

        return(
            <div className="article-container">
                <div>
                    <div className="article-source">
                        {article.source.name}
                    </div>
                    <div className="article-date">{/* We chop the seconds and remove letters T and Z */}
                        {article.publishedAt.replace(/T|Z/g, ' ').slice(0, -10)}
                    </div>
                </div>
                <div style={{clear:"both"}}></div>
                <h3 className="article-title" onClick={previewArticle}>{article.title}</h3>
                <p className="article-description" onClick={previewArticle}>{article.description}</p>
                <div>
                    <div className="article-author">
                        {article.author !== null
                            ? <img className="author-icon" src={require('../../icons/author-icon.svg')} alt="author"/>
                            : null
                        }
                        {article.author !== null
                                ? article.author.indexOf("http") !== -1
                                    ? <a target="blank" href={article.author}>Author</a> //sometimes the author data is a link to facebook
                                    : <a target="blank" href={`http://www.google.com/search?q=${article.author}`}> {/*If it's not a link we will open a google search*/}                                        {
                                            article.author.length > 20 //if the text it's too long we will slice it
                                                ? article.author.slice(0, 20).toLowerCase() + "..."
                                                : article.author.toLowerCase()
                                        }
                                      </a>
                                : ""
                        }
                    </div>
                    <div className="article-url">
                        <a target="blank" href={article.url}>Go to Source</a>
                    </div>
                </div>
                <div style={{clear:"both"}}></div>
            </div>
        )
    }
}