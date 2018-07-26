import React, { Component } from 'react';

class SideBar extends Component {
  render() {
    return(
      <div className="sidebar">
          <ul>
              <li><a href="/">DASHBOARD</a></li>
              <li><a href="/slack-report">SLACK</a></li>
              <li><a href="/freckle-report">FRECKLE</a></li>
              <li><a href="/email-report">EMAIL</a></li>
              <li><a href="/overview">GENERAL</a></li>
            </ul>
      </div>
    );
  }  
}
export default SideBar;
