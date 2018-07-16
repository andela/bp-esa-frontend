import React, { Component } from 'react';

class SideBar extends Component {
  render() {
    return(
      <div className="sidebar">
          <ul>
              <li><a href="#">DASHBOARD</a></li>
              <li><a href="#">SLACK</a></li>
              <li><a href="#">FRECKLE</a></li>
              <li><a href="#">EMAIL</a></li>
              <li><a href="#">GENERAL</a></li>
            </ul>
      </div>
    );
  }  
}
export default SideBar;
