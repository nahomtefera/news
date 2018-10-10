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
      lastSearch: null,
      loading: true
    }

    this.updateArticles = this.updateArticles.bind(this);
    this.updatePage = this.updatePage.bind(this);
    this.topHeadlines = this.topHeadlines.bind(this)
  }

  componentWillMount(){
    this.topHeadlines()
  }

  topHeadlines(sources) {
    newsapi.v2.topHeadlines({
      sources: sources,
      language: 'en',
      sortBy: 'publishedAt',
      country: 'us'
    }).then(response => {
      this.setState({articles: response, loading: false})
    });
  } 

  updateArticles(query, sources){

    if(query.length === 0) {
      this.topHeadlines(sources)
    } 

    this.setState({loading:true}, ()=>{
      newsapi.v2.everything({
        q: query,
        sources: sources,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 15
      }).then(response => {
        console.log(response)
        this.setState({articles: response, lastSearch:{query: query, sources: sources}, loading:false})
      }).catch((e)=>{console.log(e)});
    })
  }

  updatePage(page) {
    this.setState({loading:true}, ()=>{
      newsapi.v2.everything({
        q: this.state.lastSearch.query,
        sources: this.state.lastSearch.sources,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 15,
        page: page
      }).then(response => {
        this.setState({articles: response, loading:false})
        window.scrollTo(0, 0)
      }).catch((e)=>{console.log(e)});
    })
  }

  render() {
    return (
      <div className="App">
        <h1 className="app-title">news n' press</h1>
        <Search updateArticles={this.updateArticles}/>
        {
          this.state.loading === true
          ? 
            <div> 
              <div className="loader-container">
                  <div className="loader">Loading...</div>
              </div>
            </div>
            
          : <News articles={this.state.articles}/>
        }
        <PageSelector updatePage = {this.updatePage} numberOfPages={this.state.articles ? this.state.articles.totalResults / 15 : 0}  />
      </div>
    );
  }
}

export default App;
