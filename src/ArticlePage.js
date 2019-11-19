import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CKEditor from "react-ckeditor-component";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import ReactHtmlParser from 'react-html-parser'; 
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "100%",
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  input: {
    height: "60px !important",
    fontSize:"x-large !important",
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ArticlePage(props) {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('')
  const {mode, article} = props;

  useEffect(() => {
    if(mode === 'read' && article) {
      setTitle(article.title)
      setContent(article.content)
    }
  }, [article, mode])

  const onContentChange = (event) => {
    const newContent = event.editor.getData();
    setContent(newContent);
  }

  const onTitleChange = (event) => {
    const {value} = event.target
    setTitle(value);
  }

  const submitArticle = () => {
    props.submitArticle({title, content});
  }



  return (
    <div>
      <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {(mode === 'write') && "New Post"}
            </Typography>
            <Button autoFocus color="inherit" onClick={submitArticle}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        {
          props.mode === 'read' && (
            <React.Fragment>
              <section className="article">
                <h1 style={{textAlign: 'center'}}>{title}</h1>
                {ReactHtmlParser(content)}
              </section>

            </React.Fragment>
          )
        }
        {props.mode === 'write' && 
          (<React.Fragment>
            <Paper className={classes.root}>
              <InputBase
                className={classes.input}
                value={title}
                placeholder="Enter Title"
                onChange={onTitleChange}
                inputProps={{ 'aria-label': 'search google maps' }}
                fullWidth
              />
            </Paper>
            <CKEditor
              activeClass="p10"
              content={content}
              events={{
                "change": onContentChange
              }}
            /> 
          </React.Fragment>)}
      </Dialog>
    </div>
  );
}