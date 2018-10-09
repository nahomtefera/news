import React, {Component} from 'react';
import './article.css';

export default class Article extends Component {
    
    componentWillMount(){
        console.log(this.props.data)
        /*
            author,
            content,
            description,
            source
                id: usa-today,
                name: USA Today
            title,
            url,
            urlToImage,
            publishedAt
        */ 
    }

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
                <h3 className="article-title">{this.props.data.title}</h3>
                <p className="article-description">{this.props.data.description}</p>
                <div>
                    <div className="article-author">
                        {
                            this.props.data.author !== null
                                ? this.props.data.author.indexOf("http") !== -1
                                    ? <a target="blank" href={this.props.data.author}>Link to Author</a>
                                    : this.props.data.author
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