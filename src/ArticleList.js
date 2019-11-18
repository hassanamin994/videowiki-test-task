import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Pagination from 'rc-pagination'
import ArticleCard from './ArticleCard';
import ArticlePage from './ArticlePage';
import { getPosts } from './actions/post';
import 'rc-pagination/assets/index.css';

// const useStyles = makeStyles(theme => ());

const styles = theme => (
  {
    root: {
      flexGrow: 1,
      // display: "grid",
      // gridGap: "10px",
      // gridTemplateColumns: "100px 100px 100px",
      // backgroundColor: "#fff",
      // color: "#444",
      width: "77%",
      margin: '50px auto auto auto'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }
)


class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openArticle: false,
      posts: null,
      total: 0,
      page: 1,
      currentPost: null
    }
  }

  componentDidMount() {
    this.props.getPosts()
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.post.newUserPost) {
      this.props.getPosts();
    } else if(nextProps.post.success) {
      const { posts: {docs, total, limit}, page } = nextProps.post.posts;   
      this.setState({
        posts: docs,
        limit,
        total,
        page,
      })
    }
  }

  openArticle = (post) => {
    this.setState(prevState => ({
      openArticle: !prevState.openArticle,
      currentPost: post,
    }))
  }

  handleClose = () => {
    this.setState({
      openArticle: false
    })
  }

  onChange = (newPage) => {
    this.props.getPosts(newPage)
  }
  
  render() {
    const { posts, page, limit, total } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          { posts &&
            posts.map((post, i) => (
              <Grid item xs={12} sm={4} key={i}>
                <ArticleCard post={post} openArticle={()  => {this.openArticle(post)}} />
              </Grid>
            ))
          }
        </Grid>
        <ArticlePage mode={'read'} article={this.state.currentPost} open={this.state.openArticle} handleClose={() => {this.handleClose()}} />
        {
          posts && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
              <Pagination
                onChange={this.onChange}
                current={page}
                pageSize={limit}
                total={total}
                className="pagination"
              />
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  post: state.post,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getPosts
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ArticleList));