import React, { Component } from 'react';
import './App.css';
// Components
import News from './components/news/news';
import Search from './components/search/search';

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('5be26c0d911a40fcac1539e471bbed2e');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: null
    }

    this.updateArticles = this.updateArticles.bind(this)
  }

  updateArticles(query, sources){
    newsapi.v2.everything({
      q: query,
      sources: sources,
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: 5
    }).then(response => {
      this.setState({articles: response})
      console.log(response)
    }).catch((e)=>{console.log(e)});
  }

  render() {
    return (
      <div className="App">
        <Search updateArticles={this.updateArticles}/>
        <News articles={this.state.articles}/>
      </div>
    );
  }
}

export default App;
