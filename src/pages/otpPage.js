import React, { Component } from "react";
import "../statics/OTPPage.css";
import ApiLayer from '../apiRequest/apiLayer';

const CODE_LENGTH = new Array(6).fill(0);

class otppage extends Component {
  input = React.createRef();
  constructor () {
      super()
     this.state = {
         userData: {},
        value: "",
        showTrials: false,
        focused: false,
        time: {}, 
        seconds: 60,
        shouldHide: false
      };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.validate = this.validate.bind(this);
    this.resend = this.resend.bind(this);
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  };


  startTimer() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState ({
        time: timeLeftVar
    })
    if (this.timer === 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
       }
   }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds === 0) { 
      clearInterval(this.timer);
      this.setState({
        shouldHide: true
     })
    }
   
  }

 
  handleClick = () => {
    this.input.current.focus();
  };
  handleFocus = () => {
    this.setState({ focused: true });
  };
  handleBlur = () => {
    this.setState({
      focused: false,
    });
  };
  handleKeyUp = e => {
    if (e.key === "Backspace") {
      this.setState(state => {
        return {
          value: state.value.slice(0, state.value.length - 1),
        };
      });
    }
  };
  validate=(e)=>{
    e.preventDefault();
      
       ApiLayer.validateOtp(this.state.userData.userid , this.state.value).then((response) => {
        
        if(response.code === 6){
            
            localStorage.setItem('userLoggedIn' , true);
            this.props.history.push("/profile");
        } else {
            var trials = response.trials
            if(trials > 0 ) {
            localStorage.setItem('trials' , trials-1);
            } else {
                this.props.history.push("/login");   
            }
            this.setState({showTrials:true});
            setTimeout(() => {
                this.setState({
                    showTrials:false
                });
              }, 1000);      
        }
    })
  }

  resend=(e) =>{
    e.preventDefault(); 
    ApiLayer.getUser(this.state.userData.userid).then((response) => {
        if(response.code === 1) {
           this.setState({
            shouldHide: false,
            seconds : 60 
         })
         this.timer = 0;
         
         this.startTimer();
        } else {
            console.log("Not sent Successfully",response.code);

        }
    })
  }

  handleChange = e => {
    const value = e.target.value;

    this.setState(state => {
      if (state.value.length >= CODE_LENGTH.length) return null;
      return {
        value: (state.value + value).slice(0, CODE_LENGTH.length),
      };
    });
  };


  componentDidMount() {
    this.setState({ 
        userData : {
                userid : localStorage.getItem('userid'),
                trials : localStorage.getItem('trials')
        } 
    });
    this.startTimer();
    
  }
  render() {
    const { value, focused } = this.state;

    const values = value.split("");
    
    const selectedIndex =
      values.length < CODE_LENGTH.length ? values.length : CODE_LENGTH.length - 1;

    const hideInput = !(values.length < CODE_LENGTH.length);

    return (
      <div>
        <h3>Please enter one time password</h3>
        <form onSubmit={this.onSubmit}>
        <div className="wrap" onClick={this.handleClick}>
          <input
            value=""
            ref={this.input}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            className="input"
            style={{
              width: "32px",
              top: "0px",
              bottom: "0px",
              left: `${selectedIndex * 32}px`,
              opacity: hideInput ? 0 : 1,
            }}
          />
          {CODE_LENGTH.map((v, index) => {
            const selected = values.length === index;
            const filled = values.length === CODE_LENGTH.length && index === CODE_LENGTH.length - 1;

            return (
              <div className="display">
                {values[index]}
                {(selected || filled) && focused && <div className="shadows" />}
              </div>
            );
          })}
          <button type="submit"  disabled={this.state.shouldHide} className="btn btn-primary btn-lg" onClick={this.validate}>Login</button>

          <button type="submit"  onClick={this.resend} className={`btn btn-primary btn-sm  ${this.state.shouldHide ? '' : 'hidden'}`} >Resend</button>
           
        </div>
        </form>
        <div>
         Resend code in : 00:{this.state.time.s}
        </div>
        
        <div className={`alert alert-success ${this.state.showTrials ? 'alert-shown' : 'alert-hidden'}`}>
        <strong> Invalid OTP </strong>
         You have <strong>{localStorage.getItem('trials')}</strong> left !!! 
        </div>
      </div>
    );
  }
}

export default otppage;