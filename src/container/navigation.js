import React from 'react';
import { faHome, faAlignJustify, faTimes, faUser, faBookReader } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Nurturing from '../page/nurturing';
import Home from '../page/home';
import UserSetting from '../page/userSettings';
import classNames from 'classnames';
import '../css/Navigation.css';
import Login from '../page/login';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.loginClick = this.loginClick.bind(this);
    this.state = {
      collapsed: true,
      session: sessionStorage.getItem("session")
    };

    toast.configure();
  }

  toggleNavbar() {
    this.setState({
      ...this.state, ...{ collapsed: !this.state.collapsed }
    });
  }

  loginClick() {
    let session = sessionStorage.getItem("session");
    if (session)
      this.setState({
        ...this.state, ...{ session: JSON.parse(session) }
      });
  }



  render() {

    return (
      <Router>
        <div className="wrapper">
          <nav className={classNames({ active: this.state.collapsed })} id="sidebar">
            <div className="sidebar-header">
              <h3>Massachusetts Institute of Technology</h3>
              <strong>MIT</strong>
            </div>

            <ul className="list-unstyled components">
              <li >
                <a onClick={this.toggleNavbar}  >
                  <FontAwesomeIcon size="1x" icon={this.state.collapsed ? faAlignJustify : faTimes} />
                  <div className='nav-text' >   </div>
                </a>
              </li>
              <li >
                <Link to="/">
                  <FontAwesomeIcon size="1x" className='mr-2' icon={faHome} />
                  <div className='nav-text' > home </div>
                </Link>
              </li>
              <li>
                <Link to="/nurturing">
                  <FontAwesomeIcon className='mr-2' icon={faBookReader} />
                  <div className='nav-text' > nurturing </div>
                </Link>

              </li>
              <li>
                <Link to="/profile/view">
                  <FontAwesomeIcon className='mr-2' icon={faUser} />
                  <div className='nav-text' > profile </div>
                </Link>
              </li>

            </ul>
          </nav>

          <div className='container mainContainer' id="content">

            {
              !this.state.session ? <Route path="/" render={() => <Login loginClick={this.loginClick} ></Login>} /> :

                <Switch>

                  <Route exact path="/" component={Home} />
                  <Route exact path="/nurturing/:id?" component={Nurturing} />
                  <Route exact path="/profile/:id?" component={UserSetting} />

                </Switch>
            }


          </div>
        </div>
      </Router>

    );
  }
}
