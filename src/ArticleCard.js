import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import moment from 'moment';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: "100%",
    height: "100%",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const {post} = props;

  const trunc = (str, length, ending) => {
    if (length == null) {
      length = 70;
    }
    if (ending == null) {
      ending = '...';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  }


  return (
    <Card className={classes.card} onClick={props.openArticle}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.title}
        subheader={moment(post.date).format('YYYY-MM-DD')}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {trunc(post.content.replace(/<(.|\n)*?>/g, ''))}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="add to favorites" color="inherit">
          <ThumbUpAltIcon />
        </IconButton>
        <span>100 likes</span>
        <IconButton aria-label="share" >
          <ThumbDownAltIcon />
        </IconButton>
        <span>100 dislikes</span>
      </CardActions>
    </Card>
  );
}