import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import { userService } from "../utils/auth";

import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: ""
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const callBackFunction = () => {
      const { history } = this.props;
      const location = {
        pathname: "/"
      };
      history.push(location);
    };
    return userService.login(
      this.state.username,
      this.state.password,
      callBackFunction
    );
  }

  handleUserChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handlePassChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  render() {
    return (
      <div className="Login">
        <h1 className="Login__title">My-Instagram</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextField
              required
              id="outlined-basic"
              autoFocus={true}
              label="User Name"
              margin="dense"
              variant="outlined"
              fullWidth={true}
              onChange={this.handleUserChange}
            />
          </div>

          <div>
            <TextField
              required
              id="outlined-basic"
              label="Password"
              margin="dense"
              variant="outlined"
              fullWidth={true}
              onChange={this.handlePassChange}
            />
          </div>

          <div className="Login__submit">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth={true}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
