import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './Login.css';

const Login = ({ socket }) => {

  const submit = async evt => {
    evt.preventDefault();
    const name = evt.target.elements.namedItem('nick').value;
    socket.emit('join', name);
  };

  return (
    <div className="login">
      <div className="header">
        <h1 className="heading display-4 mb-5">
          <span className="text-danger">CORONA</span> HUNTER
        </h1>
        <p className="back">X5000</p>
      </div>

      <Form className="form-inline" onSubmit={submit}>
        <Form.Control className="mr-2" type="text" 
          placeholder="Nick" name="nick" autoComplete="off" autoFocus={true} />
        <Button type="submit" variant="primary">Play</Button>
      </Form>
    </div>
  );
}

export default Login;