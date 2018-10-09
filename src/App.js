import React, { Component } from 'react';
import './App.css';
// Components
import News from './components/news/news';
import Search from './components/search/search';
import PageSelector from './components/pageSelector/pageSelector';

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('5be26c0d911a40fcac1539e471bbed2e');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: null,
      lastSearch: null
    }

    this.updateArticles = this.updateArticles.bind(this);
    this.updatePage = this.updatePage.bind(this);
  }

  updateArticles(query, sources){
    newsapi.v2.everything({
      q: query,
      sources: sources,
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: 15
    }).then(response => {
      this.setState({articles: response, lastSearch:{query: query, sources: sources}})
    }).catch((e)=>{console.log(e)});
  }

  updatePage(page) {
    console.log("heyyy")
    newsapi.v2.everything({
      q: this.state.lastSearch.query,
      sources: this.state.lastSearch.sources,
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: 15,
      page: page
    }).then(response => {
      this.setState({articles: response})
      window.scrollTo(0, 0)
    }).catch((e)=>{console.log(e)});
  }

  render() {
    return (
      <div className="App">
        <Search updateArticles={this.updateArticles}/>
        <News articles={this.state.articles}/>
        <PageSelector 
          updatePage = {this.updatePage}
          numberOfPages={
            this.state.articles !== null
              ? this.state.articles.totalResults > 0
                ? this.state.articles.totalResults / 15
                : 0
              : null
          }
        />
      </div>
    );
  }
}

export default App;
