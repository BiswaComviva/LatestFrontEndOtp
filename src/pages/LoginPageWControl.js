import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import ApiLayer from '../apiRequest/apiLayer';

class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      userid: '',
      formErrors: {userid: ''},
      useridValid: false,
      formValid: false
    }
    this.sendOtp = this.sendOtp.bind(this)
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let useridValid = this.state.useridValid;


    switch(fieldName) {
      case 'userid':
        useridValid = value.match("^[a-zA-Z][A-Za-z0-9_]*$");
        fieldValidationErrors.userid = useridValid ? '' : ' is invalid';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    useridValid: useridValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.useridValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  sendOtp()  {
      let valid = this.state.useridValid;
      if(valid){
        ApiLayer.getUser(this.state.userid);
      }else {
          return '';
      }
  }

  render () {
    return (
      <form>
        <h2>OTP Login:</h2>
        <div>
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.userid)}`}>
          <label>Userid :</label>
          <input type="text" required name="userid"
            placeholder="userid"
            value={this.state.userid}
            onChange={this.handleUserInput} />
        </div>
        <button type="button" disabled={!this.state.formValid} onClick={this.sendOtp}>Sign up</button>
      </form>
    )
  }
}

export default Form;