import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './Login.css';

const Login = ({ socket, setNick }) => {

  const submit = async evt => {
    evt.preventDefault();
    const nick = evt.target.elements.namedItem('nick').value;

    socket.emit('join', nick);
    socket.once('inuse', () => alert('Nick in usea'));
    socket.once('joined', setNick);
  };

  return (
    <div className="login">
      <Form className="form-inline" onSubmit={submit}>
        <Form.Control className="mr-2" type="text" placeholder="Nick" name="nick" />
        <Button type="submit" variant="primary">Join</Button>
      </Form>
    </div>
  );
}

export default Login;