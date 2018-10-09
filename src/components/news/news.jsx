import React, {Component} from 'react';
import './news.css';
// Components
import Article from '../article/article';

export default class News extends Component {
    constructor(props){
        super(props)

        this.state={
            showPreview: null
        }
        this.previewArticle = this.previewArticle.bind(this);
        this.closePreview = this.closePreview.bind(this)
    }

    previewArticle(article) {
        this.setState({showPreview:article})
    }

    closePreview() {
        this.setState({showPreview:null})
    }

    render() {
        return (
            <div className="news-container">
                <div className="articles">
                    {
                        this.props.articles !== null
                            ? this.props.articles.articles.length > 0 
                                ? this.props.articles.articles.map((article, index)=>{
                                    return <Article key={index} data={article} previewArticle={()=>{this.previewArticle(article)}}/>
                                })
                                : <div className="no-articles">No articles</div>
                            : <div className="no-articles">No articles</div>
                    }
                </div>
                
                <div className={this.state.showPreview ? "dark-background" : 'hide'} onClick={this.closePreview}></div>

                <div className={this.state.showPreview ? "article-preview-container" : 'hide'}>
                    {this.state.showPreview !== null
                        ?
                            <div className="article-preview">
                                <div className="close-button" onClick={this.closePreview}>X</div>
                                
                                {this.state.showPreview.urlToImage !== null 
                                    ?   <div className="preview-img-container">
                                            <img className="preview-img" src={this.state.showPreview.urlToImage} alt="article-img"/>
                                        </div >
                                    : null
                                }
                                <div>
                                <div className="preview-author">
                                        {this.state.showPreview.author == null || this.state.showPreview.author == ""
                                            ? null
                                            : <img className="author-icon" src={require('../../icons/author-icon.svg')} alt="author"/>
                                        }
                                        {
                                            this.state.showPreview.author !== null
                                                ? this.state.showPreview.author.indexOf("http") !== -1
                                                    ? <a target="blank" href={this.state.showPreview.author}>Author</a> //sometimes the author data is a link to facebook
                                                    : <a target="blank" href={`http://www.google.com/search?q=${this.state.showPreview.author}`}> {/*If it's not a link we will open a google search*/}                                        {
                                                            this.state.showPreview.author.length > 20 //if the text it's too long we will slice it
                                                                ? this.state.showPreview.author.slice(0, 20).toLowerCase() + "..."
                                                                : this.state.showPreview.author.toLowerCase()
                                                        }
                                                    </a>
                                                : ""
                                        }
                                    </div>
                                    <div className='preview-date'>{this.state.showPreview.publishedAt.replace(/T|Z/g, ' ').slice(0, -4)}</div>
                                </div>
                                <div style={{clear:"both"}}></div>
                                <h3 className='preview-title'>{this.state.showPreview.title}</h3>
                                <p className="preview-content">
                                    {this.state.showPreview.content 
                                        ? this.state.showPreview.content.slice(0, 260)
                                        : null 
                                    }
                                    <a className="preview-link" target='blank' href={this.state.showPreview.url}>Keep reading</a>    
                                </p>
                                        
                                <div className="preview-source">
                                    {this.state.showPreview.source.name}
                                </div>
                            </div>
                        :null
                    }
                </div>
            </div>
        )
    }
}