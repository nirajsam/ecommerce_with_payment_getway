import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
const axios = require('axios');
const config= require('../config')
const dotenv = require('dotenv')

dotenv.config();
const URL = config.BACKEND_URL
// const URL ="http://localhost:5000"

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});
const storeRating=(value,id,email)=>{
  console.log(id,email)
    axios.post(`${URL}/api/rate/rateUs`,{productId:id,email:email,rate:value}).then(response=>{
        console.log("rating updated")
        console.log(response)
        //window.location.reload()
    }).catch(error=>{
        console.log(error)
    })
}

export default function HoverRating(props) {
  const userSignin = useSelector(state=>state.userSignin);
  const {userInfo} = userSignin;
  const [value, setValue] = React.useState(props.rate);
  const [hover, setHover] = React.useState(-1);
  //const [np, setNp] = React.useState(0);
  const classes = useStyles();
  //console.log(props.rate)

  return (
    <div className={classes.root}>
      <Rating
        name="hover-feedback"
        value={props.rate}
        precision={0.5}
        onChange={(event, newValue) => {
          // setValue(props.rate);
        //   setNp(np+1)
        //   localStorage.setItem('nor',np)
          storeRating(newValue,props.id,userInfo.email);
        }}
        // onChangeActive={(event, newHover) => {
        //   setHover(newHover);
        // }}
      />
      {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
      
    </div>
  );
}
