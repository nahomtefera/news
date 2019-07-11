import React, { Component } from 'react';
import './App.css';
// Components
import News from './components/news/news';
import Search from './components/search/search';
import Loader from './components/loader/loader';
import Language from './components/language/language';
import PageSelector from './components/pageSelector/pageSelector';
import NightMode from './components/nightMode/nightMode';

// Google Analytics
import ReactGA from 'react-ga';
if(process.env.NODE_ENV === 'production'){
  ReactGA.initialize('UA-127325093-1') // Will be used on live page
  ReactGA.pageview(window.location.pathname + window.location.search);
}

// News API
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('5be26c0d911a40fcac1539e471bbed2e');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: null,
      loading: true,
      language: 'en',
      country: 'us',
      query: "",
      sources: "",
      currentPage: 1,
      nightMode: true
    }

    this.updatePage = this.updatePage.bind(this);
    this.changeRegion = this.changeRegion.bind(this);
    this.search = this.search.bind(this);
    this.toggleNightMode = this.toggleNightMode.bind(this)
  }

  search(query, sources, page) {
    if(page === undefined) {page=1}
    if(query === undefined || query === null || query.length === 0 ) { // we will retrieve top headlines
      newsapi.v2.topHeadlines({
        sources: sources,
        language: this.state.language,
        sortBy: "publishedAt",
        page: (page || 1)
      }).then(response => {
        this.setState({articles: response, loading: false, query:query, sources:sources, currentPage:page});
      });
    } else if(query !== "") { // we will get everything we can
      this.setState({loading:true}, ()=>{
        newsapi.v2.everything({
          q: query,
          sources: sources,
          language: this.state.language,
          sortBy: "publishedAt",
          pageSize: 15,
          page: (page || 1)
        }).then(response => {
          this.setState({articles: response, loading:false, query:query, sources:sources, currentPage:page})
        }).catch((e)=>{console.log(e)});
      })
    }
  }

  componentWillMount(){
    this.search("usa", undefined)
  }

  changeRegion(language, country){this.setState({language, country:country},()=>{this.search()})}
  
  updatePage(page){
    this.search(this.state.query, this.state.sources, page)
    window.scrollTo(0, 0)
    this.setState({currentPage:page})
  }


  toggleNightMode() {
    let currentTheme = this.state.nightMode;
    this.setState({nightMode: !currentTheme})
  }


  render() {
    let loading = this.state.loading;
    return (
      <div className="App">
        <h1 className="app-title">news n press</h1>
        <Language changeRegion={this.changeRegion}/>
        <NightMode nightMode={this.state.nightMode} toggleNightMode={this.toggleNightMode}/>
        <Search search={this.search} region={this.state.country}/>
        {loading ? <Loader /> : <News articles={this.state.articles}/> }
        <PageSelector updatePage={this.updatePage} currentPage={this.state.currentPage} numberOfPages={this.state.articles ? this.state.articles.totalResults / 15 : 0}  />
      </div>
    );
  }
}

export default App;
