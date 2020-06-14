import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './Login.css';

const Login = ({ socket, setName }) => {

  const submit = async evt => {
    evt.preventDefault();
    const name = evt.target.elements.namedItem('nick').value;

    socket.emit('join', name);
    socket.once('inuse', () => alert('Nick in use'));
    socket.once('joined', setName);
  };

  return (
    <div className="login">
      <Form className="form-inline" onSubmit={submit}>
        <Form.Control className="mr-2" type="text" placeholder="Nick" name="nick" />
        <Button type="submit" variant="primary">Play</Button>
      </Form>
    </div>
  );
}

export default Login;