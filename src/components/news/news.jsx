import React, {Component} from 'react';
import './news.css';

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('5be26c0d911a40fcac1539e471bbed2e');
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
newsapi.v2.everything({
    q: 'bitcoin',
    sources: 'bbc-news,the-verge',
    domains: 'bbc.co.uk, techcrunch.com',
    from: '2018-9-09',
    to: '2018-7-10',
    language: 'en',
    sortBy: 'relevancy',
    page: 2
}).then(response => {
  console.log(response);
  /*
    {
      status: "ok",
      articles: [...]
    }
  */
}).catch((e)=>{console.log(e)});

export default class News extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
                News are gonna be displayed here
            </div>
        )
    }
}