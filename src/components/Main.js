import React, { Component } from 'react';
import '../dist/css/main.min.css';
import Calculator from './Calculator';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorPresent: false,
    }
  }

  setEP = (bool) => {
    this.setState({
      errorPresent: bool,
    });
  }

  render() {
    return (
      <div>
        <Calculator handleError={this.setEP} />
        <p class="main__error">{this.state.errorPresent && "Invalid Expression."}</p>
      </div>
    )
  }
}

export default Main;
