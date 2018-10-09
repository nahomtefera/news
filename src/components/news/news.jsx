import React, {Component} from 'react';
import './news.css';
// Components
import Article from '../article/article';

export default class News extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="news-container">
                {
                    this.props.articles !== null
                        ? this.props.articles.articles.length > 0 
                            ? this.props.articles.articles.map((article, index)=>{
                                return <Article key={index} data={article} />
                            })
                            : <div className="no-articles">No articles</div>
                        : <div className="no-articles">No articles</div>
                }
            </div>
        )
    }
}