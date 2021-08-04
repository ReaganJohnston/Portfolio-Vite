import React from "react";
import classnames from "classnames";
import { scroller } from "react-scroll";

import {
  Collapse,
  Navbar,
  NavItem,
  NavLink,
  Nav
} from "reactstrap";

class NavigationBar extends React.Component{
  listener = null;
  state = {
    nav:false,
    myText: 'home'
  }

  //Basic Component logic
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  //In the event that the user scrolls, change navbar transparency and text to match
  handleScroll= () => {
    if (window.pageYOffset > 601) {
      if(!this.state.nav){
      this.setState({ nav: true });
    }}
    
    if(window.pageYOffset < 600){
      if(this.state.nav){
      this.setState({ nav: false });
    }}

    //Logic that changes the navbar text as the user scrolls
    if(window.scrollY < 600){
      this.setState({myText: 'home'})
    }

    if(window.scrollY > 601){
      this.setState({myText: 'about'})
    }

    if(window.scrollY > 1600){
      this.setState({myText: 'projects'})
    }

    if(window.scrollY > 2300){
      this.setState({myText: 'contact'})
    }
  } 


  render(){
  return(
    <div className={`Nav ${this.state.nav && 'Nav__white'}`}>
    <Navbar
      className={classnames("fixed-top")}
      expand="lg"
      color-on-scroll="300"
    >
      <div class="grid-container">
        <div className="navbar-left">
          <i className="changing-title"/> reagan&#95;johnston &#47; {this.state.myText}
        </div>

        <div className="navbar-right">
          <Collapse
            className="justify-content-end"
            navbar
          >
            <Nav navbar>
              <NavItem>
                <NavLink onClick={() => scroller.scrollTo('home', {
                  smooth: true,
                  offset: -70,
                  duration: 500,
                })}>
                  <i className="navbar-home-layout"/> home(  )
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink onClick={() => scroller.scrollTo('about', {
                  smooth: true,
                  offset: -70,
                  duration: 500,
                })}>
                  <i className="navbar-work-layout"/> about(  )
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink onClick={() => scroller.scrollTo('projects', {
                  smooth: true,
                  offset: -70,
                  duration: 500,
                })}>
                  <i className="navbar about-layout"/> projects(  )
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink onClick={() => scroller.scrollTo('contact', {
                  smooth: true,
                  offset: -70,
                  duration: 500,
                })}>
                  <i className="navbar-contact-layout"/> contact(  )
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                data-placement="bottom"
                href="https://www.instagram.com/"
                target="_blank"
                title="Follow me on Instagram"
                >
                  <i className="nav-insta"/>
                  <p className="nav-placeholder-insta">Instagram</p>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                data-placement="bottom"
                href="https://www.linkedin.com/in/reagan-johnston-401477210"
                target="_blank"
                title="Follow me on LinkedIn"
                >
                  <i className="nav-LinkedIn"/>
                  <p className="nav-placeholder-LinkedIn">LinkedIn</p>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                data-placement="bottom"
                href="https://github.com/ReaganJohnston/Projects"
                target="_blank"
                title="Check out my projects repo"
                >
                  <i className="nav-Git"/>
                  <p className="nav-placeholder-Git">GitHub</p>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </div>      
      </div>
    </Navbar>
    </div>
  );
}}

export default NavigationBar;