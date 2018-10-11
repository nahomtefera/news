import React, { Component } from 'react';
import './App.css';
// Components
import News from './components/news/news';
import Search from './components/search/search';
import Loader from './components/loader/loader';
import Language from './components/language/language';
import PageSelector from './components/pageSelector/pageSelector';
// Google Analytics
import ReactGA from 'react-ga';
process.env.NODE_ENV === 'production'
  ? ReactGA.initialize('UA-127325093-1') // Will be used on live page
  : ReactGA.initialize('UA-127325093-1') // Will be used on dev page
// News API
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('5be26c0d911a40fcac1539e471bbed2e');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: null,
      lastSearch: null,
      loading: true,
      language: 'en',
      country: 'us'
    }

    this.updateArticles = this.updateArticles.bind(this);
    this.updatePage = this.updatePage.bind(this);
    this.topHeadlines = this.topHeadlines.bind(this);
    this.changeRegion = this.changeRegion.bind(this);
  }

  componentWillMount(){
    this.topHeadlines()
  }

  topHeadlines(sources) {
    newsapi.v2.topHeadlines({
      sources: sources,
      language: this.state.language,
      sortBy: 'publishedAt',
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
        language: this.state.language,
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

  changeRegion(region, language) {
    this.setState({country:region, language:language, lastSearch:null}, ()=>{this.topHeadlines()})
  }

  render() {
    let loading = this.state.loading;
    return (
      <div className="App">
        <h1 className="app-title">news n press</h1>
        <Language changeRegion={this.changeRegion}/>
        <Search region={this.state.country} updateArticles={this.updateArticles}/>
        {loading ? <Loader /> : <News articles={this.state.articles}/> }
        <PageSelector updatePage = {this.updatePage} numberOfPages={this.state.articles ? this.state.articles.totalResults / 15 : 0}  />
      </div>
    );
  }
}

export default App;
