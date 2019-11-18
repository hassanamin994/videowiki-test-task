import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Router, Route} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import history from './history';
import NavBar from './NavBar';
import ArticleList from './ArticleList'
import ArticlePage from './ArticlePage'
import { checkAuth } from './actions/user';
import './App.css';
import { createPost } from './actions/post';

function App(props) {
  const [articleOpen, openArticle] = useState(false);
  const [articleMode, setMode] = useState('read');

  const dispatch = useDispatch();
  const { post, checkAuth } = props;


  useEffect(() => {
   checkAuth()
   if(post.success) {
    openArticle(false)
   }
  }, [post, checkAuth, dispatch]);

  const handleClose = e => {
    openArticle(false)
  }

  const createArticle = e => {
    setMode('write');
    openArticle(true);
  }
  
  const submitArticle = article => {
    dispatch(createPost(article))
  }

  return (
    <Router history={history}>
      <React.Fragment>
        <NavBar createArticle={createArticle} />
        <Route exact path="/" component={ArticleList} />
        <ArticlePage
          mode={articleMode}
          open={articleOpen}
          handleClose={handleClose}
          submitArticle={submitArticle}
        />
      </React.Fragment>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  post: state.post,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  checkAuth
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);;
