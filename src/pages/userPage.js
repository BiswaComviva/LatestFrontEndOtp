import React ,  {Component} from 'react';

class Profile extends Component {
    constructor(){
        super()
            this.state =  {
                userid:'',
                msisdn:''
            }
        }

        componentDidMount() { 
            const userid = localStorage.getItem('userid');
            const userLoggedIn = localStorage.getItem('userLoggedIn');
            if(userid && userLoggedIn) { 
            this.setState({
                userid: userid
            })
        } else  {
            this.props.history.push('/');
        }
    }
        

        render () {
            return (
                <div className="container">
                    <div className="jumbotron mt-4">
                        <h1 className="text-center">Profile</h1>
                        <h1 className="text-center">{this.state.userid}</h1>
                    </div>
                </div>
            )
        }
    }

    export default Profile;