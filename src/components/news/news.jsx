import React, {Component} from 'react';
import './news.css';
// Components
import Article from '../article/article';

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('5be26c0d911a40fcac1539e471bbed2e');



export default class News extends Component {
    constructor(props){
        super(props)

        this.state = {
            news: []
        }
    }

    componentWillMount(){
        newsapi.v2.topHeadlines({
            country: 'us'
        }).then(response => {
            this.setState({news: response})
            console.log(response)
        }).catch((e)=>{console.log(e)});
    }

    render() {
        return (
            <div>
                News are gonna be displayed here
            </div>
        )
    }
}