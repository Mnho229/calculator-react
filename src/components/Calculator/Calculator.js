import React, { Component } from 'react';

class CalculatorButton extends React.PureComponent {

  handleClick = () => {
    this.props.onClick(this.props.symbol);
  }

  render() {
    return (
      <div  className={`c-calc__btn ${this.props.extraClass}`}
            onClick={this.handleClick} >
        {this.props.symbol}
      </div>
    )
  }
}

class CalculatorFunctions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        '(', ')', '%', 'AC',
        '7', '8', '9', '÷',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+'
      ]
    }
  }

  render() {
    const btns = this.state.rows.map( (value, index) => {
      let btnClass = '';
      if (value === '=') { btnClass = 'btn--equals' }
      else if ( typeof value !== 'number' && value !== '.' ) { btnClass = 'btn--op' }
      
      return (
        <CalculatorButton key={index} 
                          symbol={value} 
                          extraClass={btnClass}
                          onClick={this.props.passClick}/>
      )
    });

    return (
      <section className="l-grid">
        {btns}
      </section>
    );
  };

}

class CalculatorOutput extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className="c-calc__display">
        <span className="c-calc__output">3+2=1</span>
      </div>
    )
  }

}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currExp: ""
    }
  }

  _formatToken(token) {
    return token.match(/[%*-+÷]/) ? " " + token + " " : token
  }
  
  _evaluateToken(token) {
    const lastChar = this.state.currExp.slice(-1);
    return token === "." && lastChar.match(/[^0-9]/) ? '' : token;
  }

  handleClick = (value) => {
    console.log(value);
    const token = this._formatToken(value);



    let newExp = this.state.currExp.concat(token);
    this.setState({
      currExp: newExp,
    });
  }

  render() {
    console.log(this.state.currExp);
    return (
      <section className="c-calc">
        <CalculatorOutput />
        <CalculatorFunctions passClick={this.handleClick} />
      </section>
    )
  }
}

export default Calculator;