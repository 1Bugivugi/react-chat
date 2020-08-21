import React, { useState } from 'react';
import { Link }from 'react-router-dom';
import './Join.css';

const Join = () => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className='joinOuterContainer'>
      <div className='joinInnerContainer'>
        <h1 className='heading'>Join</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div> {/*we can get data from event with <- (event.target.value - holds data)*/}
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}> {/*with this we're gonna be able to read the name and room from our chat component to actually see the data we got in here*/}
          <button className="button mt-20" type="submit">Sign In</button> {/*Link onClick will prevent (entering without specified name&room) clicking the button*/}
        </Link>
      </div>
    </div>
  )
};

export default Join;
