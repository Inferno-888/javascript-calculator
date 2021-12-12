class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: "",
      current: "0"
    }
    
    this.handleNumClick = this.handleNumClick.bind(this)
    this.handleClearClick = this.handleClearClick.bind(this)
    this.handleOperator = this.handleOperator.bind(this)
    this.handleOperation = this.handleOperation.bind(this)
    this.handleDecimalClick = this.handleDecimalClick.bind(this)
  }
  
  handleNumClick(event) {
    const val = event.target.value
    const display = this.state.display
    const current = this.state.current
    
    if(current === "+" || current === "-" || current === "*" || current === "/") {
      this.setState({display: this.state.display + val, current: val})
    } else {
      if(current === "0") {
        if(val !== "0") {
          this.setState({display: val, current: val})
        } else {
          null
        }
      } else {
        this.setState({display: this.state.display + val, current: this.state.current + val})
      }
    }
  }
  
  handleClearClick() {
    this.setState({display: "", current: "0"})
  }
  
  handleOperator(event) {
    const val = event.target.value
    const display = this.state.display
    const len = display.length - 1
    const previous = display.charAt(len)
    const prePrevious = display.charAt(len - 1)
    const current = this.state.current
    
    if(/=/.test(display)) {
      this.setState({display: this.state.current + val, current: val})
      return
    }
    
    if(val === "+" || val === "*" || val === "/") {
      if(previous === "+" || previous === "-" || previous === "*" || previous === "/") {
        if(prePrevious === "+" || prePrevious === "-" || prePrevious === "*" || prePrevious === "/") {
          this.setState({display: display.substring(0, len - 1) + val, current: val})
        } else {
          this.setState({display: display.substring(0, len) + val, current: val})
        }
      } else {
        this.setState({display: display + val, current: val})
      }
    } else {
      if(previous === "+" || previous === "-" || previous === "*" || previous === "/") {
        if(prePrevious === "+" || prePrevious === "-" || prePrevious === "*" || prePrevious === "/") {
          null
        } else {
          this.setState({display: display + val, current: val})
        }
      } else {
        this.setState({display: display + val, current: val})
      }
    }
  }
  
  handleOperation() {
    let state = this.state.display
    state = state.replace(/--/g, "+")
    const answer = eval(state)
    this.setState({display: this.state.display + "=" + answer, current: answer})
  }
  
  handleDecimalClick(event) {
    const current = this.state.current
    const display = this.state.display
    const val = event.target.value
    
    if(current === "+" || current === "-" || current === "*" || current === "/" || current === "0") {
      if(this.checkForDecimals()) {
        this.setState({display: display + "0" + val, current: "0" + val})
      }
    } else {
      if(this.checkForDecimals()) {
        this.setState({display: display + val, current: current + val})
      }
    }
  }
  
  checkForDecimals() {
    const display = this.state.display
    let decimalsFound = false
    
    for(let i = 0; i < display.length; i++) {
      if(display.charAt(i) === "+" || display.charAt(i) === "-" || display.charAt(i) === "*" || display.charAt(i) === "/") {
        decimalsFound = false
      }
      
      if(display.charAt(i) === ".") {
        if(decimalsFound) {
          return false
        } else {
          decimalsFound = true
        }
      }
    }
    
    return !decimalsFound
  }
  
  render() {
    return (
      <div id="calculator">
        <div className="dis">
          <div>
            <p id="formula">{this.state.display}</p>
          </div>
          <div id="display">
            <p id="currentNum">{this.state.current}</p>
          </div>
        </div>
          <button 
            id="clear" 
            onClick={this.handleClearClick}>AC
          </button>
          <button 
            id="divide" 
            value="/" 
            onClick={this.handleOperator}
            className="operator">/
          </button>
          <button 
            id="multiply" 
            value="*" 
            onClick={this.handleOperator}
            className="operator">x
          </button>
          <button 
            id="seven" 
            value="7" 
            onClick={this.handleNumClick} 
            className="nums">7
          </button>
          <button 
            id="eight" 
            value="8" 
            onClick={this.handleNumClick} 
            className="nums">8
          </button>
          <button 
            id="nine" 
            value="9" 
            onClick={this.handleNumClick} 
            className="nums">9
          </button>
          <button 
            id="subtract" 
            value="-" 
            onClick={this.handleOperator}
            className="operator">-
          </button>
          <button 
            id="four" 
            value="4" 
            onClick={this.handleNumClick} 
            className="nums">4
          </button>
          <button 
            id="five" 
            value="5" 
            onClick={this.handleNumClick} 
            className="nums">5
          </button>
          <button 
            id="six" 
            value="6" 
            onClick={this.handleNumClick} 
            className="nums">6
          </button>
          <button 
            id="add" 
            value="+" 
            onClick={this.handleOperator}
            className="operator">+
          </button>
          <button 
            id="one" 
            value="1" 
            onClick={this.handleNumClick} 
            className="nums">1
          </button>
          <button 
            id="two" 
            value="2" 
            onClick={this.handleNumClick} 
            className="nums">2
          </button>
          <button 
            id="three" 
            value="3" 
            onClick={this.handleNumClick} 
            className="nums">3
          </button>
          <button 
            id="equals" 
            onClick={this.handleOperation}>=
          </button>
          <button 
            id="zero" 
            value="0" 
            onClick={this.handleNumClick} 
            className="nums">0
          </button>
          <button 
            id="decimal" 
            className="nums"
            value="."
            onClick={this.handleDecimalClick}>.
          </button>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById("root"))
