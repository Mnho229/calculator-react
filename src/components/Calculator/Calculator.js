import React, { Component } from 'react';
import math from 'mathjs';

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
        <span className="c-calc__output">
          {this.props.result || this.props.display.join('')}
        </span>
      </div>
    )
  }

}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currExp: [],
      result: 0
    }
  }

  //Could be used to identify token.  Maybe use dotCheck in this one
  _formatToken(token) {
    return token.match(/[%*-+÷]/) ? " " + token + " " : token;
  }
  
  //No duplicate dot | Need to account for extra periods in number and operator
  //Might be better to go back and wait for equals before checking for dupes
  _dotCheck(token) {
    const lastToken = this.state.currExp[this.state.currExp.length - 1] || '';

    return token === "."  && lastToken.match(/[^0-9]/) 
                          && lastToken.match(/[.]/) ? '' : token;
  }

  _evaluate() {
    const expr = this.state.currExp.join('');
    let result; 
    try {
      result = math.eval(expr);
    }
    catch (err) {
      console.log('Error: ', err);
      result = 0;
      this.props.handleError(true);
      return;
    }
    finally {
      this.setState({
        currExp: [],
        result: result
      });
    }
    
  }

  handleClick = (value) => {
    console.log(value);
    if (value === '=') { this._evaluate(); return; }
    const token = this._dotCheck( this._formatToken(value) ),
          lastToken = this.state.currExp.length === 0 ? ''
                    : this.state.currExp.slice(-1)[0];

    if (token === '') {return;}

    const tokenIsNum = token.match(/[0-9.]/),
          LTokenIsOp = lastToken.match(/[%*-+÷]/);

    if ( tokenIsNum && !LTokenIsOp ) {
      const oldArray = this.state.currExp.slice(0, -1);
      const newExp = [...oldArray, lastToken + token];

      this.setState({
        currExp: newExp,
        result: 0
      });
    } else {
      const newExp = [...this.state.currExp, token];

      this.setState({
        currExp: newExp,
        result: 0
      });
    }
    this.props.handleError(false);

  }

  render() {
    console.log(this.state.currExp);
    return (
      <section className="c-calc">
        <CalculatorOutput display={this.state.currExp} result={this.state.result} />
        <CalculatorFunctions passClick={this.handleClick} />
      </section>
    )
  }
}

export default Calculator;