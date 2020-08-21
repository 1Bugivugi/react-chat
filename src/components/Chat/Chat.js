import React, { useState, useEffect } from 'react'; // useEffect is for lifecycle methods inside of hooks
import queryString from 'query-string'; // will help with retrieving data from the URL
import io from 'socket.io-client';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

import './Chat.css';

let socket;


const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'https://react-1chat-application.herokuapp.com/';

  useEffect(() => { // replicates componentDidMount, etc

    const {name, room} = queryString.parse(location.search); // location comes from react-router and it gives us a prop called `location`; with it we get the URL back

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit('join', { name, room }, () => {

    });

    return () => { // will be happening on unmounting the component (leaving chat)
      socket.emit('disconnect');

      socket.off(); // will turn 1 chat person off
    }

    // console.log(socket);
    // console.log(name, room)
    // console.log(location.search)
    // console.log(data)

  }, [ENDPOINT, location.search]) // only if this 2 values change, then we need to rerender our useEffect

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message])
    }) // listening for messages
  }, [])

  // function for sending messages

  const sendMessage = (event) => {

    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  console.log(message, messages)

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name}/>
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
        {/*<input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />*/}
      </div>
      <TextContainer users={users} />
    </div>
  )
};

export default Chat;
