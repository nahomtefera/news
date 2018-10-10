import React, {Component} from 'react';
import './articlePreview.css';

export default class ArticlePreview extends Component {

    render() {

        let article = this.props.data;

        return (
            <div className="article-preview-container">
                {article !== null
                    ?
                        <div className="article-preview">
                            <div className="close-button" onClick={this.props.closePreview}>X</div>
                            
                            {article.urlToImage !== null 
                                ?   <div className="preview-img-container">
                                        <img className="preview-img" src={article.urlToImage} alt="article-img"/>
                                    </div >
                                : null
                            }
                            <div>
                            <div className="preview-author">
                                    {article.author == null || article.author == ""
                                        ? null
                                        : <img className="author-icon" src={require('../../icons/author-icon.svg')} alt="author"/>
                                    }
                                    {
                                        article.author !== null
                                            ? this.props.data.author.indexOf("http") !== -1
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
                                <div className='preview-date'>{article.publishedAt.replace(/T|Z/g, ' ').slice(0, -10)}</div>
                            </div>
                            <div style={{clear:"both"}}></div>
                            <h3 className='preview-title'>{article.title}</h3>
                            <p className="preview-content">
                                {article.content 
                                    ? article.content.slice(0, 260)
                                    : null 
                                }
                                <a className="preview-link" target='blank' href={article.url}> Keep reading</a>    
                            </p>
                                    
                            <div className="preview-source">
                                {article.source.name}
                            </div>
                        </div>
                    :null
                }
            </div>
        )
    }
}