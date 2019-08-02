import React , {Component}  from 'react';
import {Link , withRouter} from 'react-router-dom';
import  ApiLayer from '../apiRequest/apiLayer';

class Navbar extends Component {
    logOut(e){
        
        ApiLayer.logOut(localStorage.getItem('userid')).then((response) => {
            console.log("Response from logout api" ,response);
            if(response) {
                this.props.history.push('/');
                localStorage.clear();
            } else {

            }
        });
        

    }
    render (){
        const loginRegLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/Register" className="nav-link">
                        Register
                    </Link>
                </li>
            </ul>
        )

    const userLink = (
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link to="/profile" className="nav-link">
                    User
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/login" onClick={this.logOut.bind(this)} className="nav-link">
                    Logout
                </Link>
            </li>
        </ul>
    )

    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded" />
        <button className="navbar-toggler" 
                type="button" 
                data-toggle="collapse" 
                data-target="#navbar1" 
                aria-controls="navbar1" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
                <span className="navbar-toggle-icon"></span>
        </button>
        
        <div className="navbar navbar-expand-lg navbar-light bg-light" id="navbar1">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to='/' className="nav-link">
                        Home
                    </Link>
                </li>
            </ul>
            {localStorage.getItem('userLoggedIn') ? userLink : loginRegLink}
        </div>
        </div>
    )
    }
}

export default withRouter(Navbar);