import React, {Component} from 'react';
import './news.css';
// Components
import Article from '../article/article';
import ArticlePreview from '../articlePreview/articlePreview';

export default class News extends Component {
    constructor(props){
        super(props)

        this.state={
            showPreview: null
        }
        this.previewArticle = this.previewArticle.bind(this);
        this.closePreview = this.closePreview.bind(this);
        this.handleEsc = this.handleEsc.bind(this);
    }

    previewArticle(article) {
        document.body.classList.add('modal-open');
        this.setState({showPreview:article})
    }

    closePreview() {
        document.body.classList.remove('modal-open');
        this.setState({showPreview:null})
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleEsc, false);
    }

    handleEsc(e){
        if (e.keyCode === 27) {
            this.closePreview()
        }
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
                { this.state.showPreview !== null 
                    ? <ArticlePreview closePreview={this.closePreview} data={this.state.showPreview}/>
                    : null
                }
                    
            </div>
        )
    }
}