import React from 'react';

class SideBar extends React.PureComponent {
  render() {
    return (
      <div className="sidebar">
        <ul>
          {/* eslint-disable jsx-a11y/anchor-is-valid */}
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
