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
        7, 8, 9, '÷',
        4, 5, 6, '*',
        1, 2, 3, '-',
        0, '.', '=', '+'
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
      currExp: ''
    }
  }

  mutateCurrExp(value) {
    this.setState({
      currExp: this.currExp + value
    });
  }

  handleClick = (value) => {
    console.log(value);
    console.log(this);
  }

  render() {
    return (
      <section className="c-calc">
        <CalculatorOutput />
        <CalculatorFunctions passClick={this.handleClick} />
      </section>
    )
  }
}

export default Calculator;