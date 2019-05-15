import React from 'react';
import moment from 'moment';
import './activityfeed.scss';

/**
 * @description gets ordered initials of names
 * @param {string} fullNames from the API
 * @returns {string}
 */
const getInitials = (fullNames) => {
  const names = fullNames.split(',');
  const initials = `${names[1][1]}${names[0][0]}`;
  return (initials);
};

/**
 * @description orders names to appear as firstName and lastName
 * @param {string} fullNames takes unordered names from the API
 * @returns {string}
 */
const reorderNames = (fullNames) => {
  const namesArr = fullNames.split(',');
  const names = `${namesArr[1]} ${namesArr[0]}`;
  return (names);
};

const ActivityFeed = (props) => {
  const { reportData } = props;
  if (reportData.length === 0) {
    return (
      <div className="activity-feed-no-activity">No activities to display</div>
    );
  }
  return (
    reportData.map(data => (
      <div className="activity-feed-container" key={data.id}>
        <div className="feeds-initials">
          <span>{getInitials(data.fellowName)}</span>
        </div>
        <div className="feeds-content">
          <span className="feed-description">
            <span className="bold">{reorderNames(data.fellowName)}</span>
            <span> was </span>
            <span className={data.type === 'offboarding' ? 'offboarding' : 'onboarding'}>
              {data.type === 'offboarding' ? 'offboarded' : 'onboarded'}
            </span>
            <span>
              {data.type === 'offboarding' ? ' from ' : ' on '}
            </span>
            <span className="bold">{data.partnerName}</span>
          </span>
          <span className="feed-date">
            {moment(data.updatedAt).format('MM/DD/YYYY, HH:mm')}
          </span>
        </div>
      </div>
    ))
  );
};

export default ActivityFeed;
