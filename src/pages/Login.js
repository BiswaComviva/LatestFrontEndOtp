import React , {Component} from 'react';
import ApiLayer from '../apiRequest/apiLayer';
import { FormErrors } from './FormErrors';
import '../statics/loginPage.css';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            userid: '',
            message: '',
            formErrors: {userid: ''},
            useridValid: false,
            formValid: false,
            showingAlert: false
        }
        this.onchange = this.onchange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onchange(e) {
        //this.setState({[e.target.name]: e.target.value })
        e.preventDefault();
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

  onSubmit(e) {
        e.preventDefault()
        let valid = this.state.useridValid;

        if(valid){
            
            localStorage.setItem('userid' , this.state.userid);
        ApiLayer.getUser(this.state.userid).then((response) => {
            if(response.code === 1) {
                localStorage.setItem('trials' , 3);
                this.props.history.push('/OTPPage');
            } else if (response.code === 2 ){
                localStorage.setItem('userid' , this.state.userid);
                console.log("Already logged in" , localStorage.getItem('userid'));
                localStorage.setItem('userLoggedIn' , true);
                this.props.history.push("/profile");
            }  else {
                    this.setState ({message : response.message});

                    this.setState({
                        showingAlert: true
                      });

                    setTimeout(() => {
                        this.setState({
                          showingAlert: false
                        });
                      }, 2000);
                    
            }
        });
        
    } else {return '';
}
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form onSubmit={this.onSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Please Enter UserID</h1>
                        <div className="form-group"></div>
                        <label htmlFor="text">USERID:</label>
                        <input type="text"
                               className="form-control"
                               name="userid"
                               placeholder="UserId." 
                               value={this.state.userid}
                               onChange={this.onchange}/>
                        <button type="submit" disabled={!this.state.formValid}  className="btn btn-lg btn-primary btn-block">
                            Send OTP
                        </button>
                        </form>
                    </div>
                </div>
                <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                <FormErrors formErrors={this.state.formErrors} />
                <div className={`form-group ${this.errorClass(this.state.formErrors.userid)}`}></div>
                </div>

                <div className="col-md-6 mt-5 mx-auto">
                <div className={`alert alert-success ${this.state.showingAlert ? 'alert-shown' : 'alert-hidden'}`}>
               <strong> {this.state.message} </strong>
                </div>
                </div>
                    
                </div>
            </div>
        )
    }
}
export default Login;