import React from 'react'
import Notes from './Notes'


export const Home = (props) => {

  // const {showAlert} = props;

  return (
    <div>
      <Notes showAlert = {props.showAlert}/>
    </div>
  )
}

export default Home
