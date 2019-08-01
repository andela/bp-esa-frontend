import React from 'react';
import PartnerStats from '../../../components/Dashboard/PartnerStatsCard';

describe('Partner Stats Card', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<PartnerStats />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render four stats cards', () => {
    const card = wrapper.find('.partner-stats');
    expect(card.length).toEqual(4);
  });

  it('Should render card title', () => {
    const card = wrapper.html();
    expect(card).toContain('Total Upsell');
    expect(card).toContain('Total Downsell');
    expect(card).toContain('New Partner');
    expect(card).toContain('Partner Churns');
  });
});
