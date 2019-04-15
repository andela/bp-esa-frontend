import * as React from 'react';
import PropTypes from 'proptypes';
import './styles.scss';
import FilterComponent from '../FilterComponent';

const ReportNavBar = ({ isStats, renderView, ...props }) => (
  <React.Fragment>
    {
      isStats ? (
        <div className="left-navbar">
          <React.Fragment>
            Automations stats for Today
            <img src="/drop-down.png" alt="down" />
          </React.Fragment>
        </div>
      ) : (
        <div className="report-navbar-container">
          <div className="report-navbar">
            <p>View:</p>
            <svg version="1.1" viewBox="0.0 0.0 960.0 720.0" fill="none" stroke="none" strokeLinecap="square" strokeMiterlimit="10" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" id="card-icon" className="view-button" onClick={renderView('card')}>
              <clipPath id="p.0"><path d="m0 0l960.0 0l0 720.0l-960.0 0l0 -720.0z" clipRule="nonzero" /></clipPath>
              <g clipPath="url(#p.0)">
                <path fill="#000000" fillOpacity="0.0" d="m0 0l960.0 0l0 720.0l-960.0 0z" fillRule="evenodd" />
                <path fill="#000000" d="m243.45009 -0.17608136l-242.82036 0l0 194.1241l242.82036 0z" fillRule="evenodd" />
                <path stroke="#000000" strokeWidth="1.0" strokeLinejoin="round" strokeLinecap="butt" d="m243.45009 -0.17608136l-242.82036 0l0 194.1241l242.82036 0z" fillRule="evenodd" />
                <path fill="#000000" d="m601.4111 -0.17608136l-242.82034 0l0 194.1241l242.82034 0z" fillRule="evenodd" />
                <path stroke="#000000" strokeWidth="1.0" strokeLinejoin="round" strokeLinecap="butt" d="m601.4111 -0.17608136l-242.82034 0l0 194.1241l242.82034 0z" fillRule="evenodd" />
                <path fill="#000000" d="m959.372 -0.17608136l-242.82031 0l0 194.1241l242.82031 0z" fillRule="evenodd" />
                <path stroke="#000000" strokeWidth="1.0" strokeLinejoin="round" strokeLinecap="butt" d="m959.372 -0.17608136l-242.82031 0l0 194.1241l242.82031 0z" fillRule="evenodd" />
                <path fill="#000000" d="m243.45009 262.47488l-242.82036 0l0 194.12408l242.82036 0z" fillRule="evenodd" />
                <path stroke="#000000" strokeWidth="1.0" strokeLinejoin="round" strokeLinecap="butt" d="m243.45009 262.47488l-242.82036 0l0 194.12408l242.82036 0z" fillRule="evenodd" />
                <path fill="#000000" d="m601.4111 262.47488l-242.82034 0l0 194.12408l242.82034 0z" fillRule="evenodd" />
                <path stroke="#000000" strokeWidth="1.0" strokeLinejoin="round" strokeLinecap="butt" d="m601.4111 262.47488l-242.82034 0l0 194.12408l242.82034 0z" fillRule="evenodd" />
                <path fill="#000000" d="m959.372 262.47488l-242.82031 0l0 194.12408l242.82031 0z" fillRule="evenodd" />
                <path stroke="#000000" strokeWidth="1.0" strokeLinejoin="round" strokeLinecap="butt" d="m959.372 262.47488l-242.82031 0l0 194.12408l242.82031 0z" fillRule="evenodd" />
                <path fill="#000000" d="m243.45009 525.12585l-242.82036 0l0 194.12408l242.82036 0z" fillRule="evenodd" />
                <path stroke="#000000" strokeWidth="1.0" strokeLinejoin="round" strokeLinecap="butt" d="m243.45009 525.12585l-242.82036 0l0 194.12408l242.82036 0z" fillRule="evenodd" />
                <path fill="#000000" d="m602.9698 525.1262l-242.82031 0l0 196.35175l242.82031 0z" fillRule="evenodd" />
                <path stroke="#000000" strokeWidth="1.0" strokeLinejoin="round" strokeLinecap="butt" d="m602.9698 525.1262l-242.82031 0l0 196.35175l242.82031 0z" fillRule="evenodd" />
                <path fill="#000000" d="m959.372 525.12585l-242.82031 0l0 194.12408l242.82031 0z" fillRule="evenodd" />
                <path stroke="#000000" strokeWidth="1.0" strokeLinejoin="round" strokeLinecap="butt" d="m959.372 525.12585l-242.82031 0l0 194.12408l242.82031 0z" fillRule="evenodd" />
              </g>
            </svg>
            <svg height="512pt" viewBox="0 -52 512.00001 512" width="512pt" xmlns="http://www.w3.org/2000/svg" className="view-button" onClick={renderView('list')} id="list-icon">
              <path d="m0 113.292969h113.292969v-113.292969h-113.292969zm30.003906-83.289063h53.289063v53.289063h-53.289063zm0 0" />
              <path d="m149.296875 0v113.292969h362.703125v-113.292969zm332.699219 83.292969h-302.695313v-53.289063h302.695313zm0 0" />
              <path d="m0 260.300781h113.292969v-113.292969h-113.292969zm30.003906-83.292969h53.289063v53.289063h-53.289063zm0 0" />
              <path d="m149.296875 260.300781h362.703125v-113.292969h-362.703125zm30.003906-83.292969h302.695313v53.289063h-302.695313zm0 0" />
              <path d="m0 407.308594h113.292969v-113.296875h-113.292969zm30.003906-83.292969h53.289063v53.289063h-53.289063zm0 0" />
              <path d="m149.296875 407.308594h362.703125v-113.296875h-362.703125zm30.003906-83.292969h302.695313v53.289063h-302.695313zm0 0" />
            </svg>
            <FilterComponent {...props} />
          </div>
        </div>
      )
    }
  </React.Fragment>
);

ReportNavBar.propTypes = {
  isStats: PropTypes.bool,
  renderView: PropTypes.func,

};

ReportNavBar.defaultProps = {
  isStats: false,
  renderView: null,
};

export default ReportNavBar;
