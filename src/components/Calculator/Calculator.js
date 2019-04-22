import React, { Component } from 'react';

class CalculatorButton extends React.PureComponent {
  render() {
    return (
      <div className={`c-calc__btn ${this.props.extraClass}`} >{this.props.symbol}</div>
    )
  }
}

class CalculatorFunctions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        '(', ')', '%', 'AC',
        7, 8, 9, '÷',
        4, 5, 6, '*',
        1, 2, 3, '-',
        0, '.', '=', '+'
      ]
    }
  }

  renderCalcButton(symbol) {
    return (
      <CalculatorButton symbol={symbol} />
    );
  }

  render() {
    const btns = this.state.rows.map( (value, index) => {
      let btnClass = '';
      if (value === '=') { btnClass = 'btn--equals' }
      else if ( typeof value !== 'number' && value !== '.' ) { btnClass = 'btn--op' }
      
      return (
        <CalculatorButton key={index} symbol={value} extraClass={btnClass} />
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

    }
  }

  render() {
    return (
      <section className="c-calc">
        <CalculatorOutput />
        <CalculatorFunctions />
      </section>
    )
  }
}

export default Calculator;