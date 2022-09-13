import React,{Component} from 'react';
import Navbar from './components/Navbar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'

import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends Component {
  pageSize = 15;
  state={
    progress:0,
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  apiKey = process.env.REACT_APP_NEWS_API
  render(){
    return (
      <React.Fragment>
      <Router>
      <Navbar />
      <LoadingBar
      height = {3}
      color='#f11946'
      progress = {this.state.progress}
      />
      <Routes>
            <Route path='/' element={<News setProgress = {this.setProgress} key ='general' pageSize = {this.pageSize} apiKey = {this.apiKey} country = 'in' category = 'general'/>} />
            <Route path='/sports' element={<News setProgress = {this.setProgress} key ='sports' pageSize = {this.pageSize} apiKey = {this.apiKey} country = 'in' category = 'sports' />} />
            <Route path='/business' element={<News setProgress = {this.setProgress} key ='business' pageSize = {this.pageSize} apiKey = {this.apiKey} country = 'in' category = 'business'/>} />
            <Route path='/entertainment' element={<News setProgress = {this.setProgress} key ='entertainment' pageSize = {this.pageSize} apiKey = {this.apiKey} country = 'in' category = 'entertainment'/>} />
            <Route path='/health' element={<News setProgress = {this.setProgress} key ='health' pageSize = {this.pageSize} apiKey = {this.apiKey} country = 'in' category = 'health'/>} />
            <Route path='/science' element={<News setProgress = {this.setProgress} key ='science' pageSize = {this.pageSize} apiKey = {this.apiKey} country = 'in' category = 'science'/>} />
            <Route path='/sports' element={<News setProgress = {this.setProgress} key ='sports' pageSize = {this.pageSize} apiKey = {this.apiKey} country = 'in' category = 'sports'/>} />
            <Route path='/technology' element={<News setProgress = {this.setProgress} key ='technology' pageSize = {this.pageSize} apiKey = {this.apiKey} country = 'in' category = 'technology'/>} />
          </Routes>
      </Router>

    </React.Fragment>
  );
}
}

export default App;
