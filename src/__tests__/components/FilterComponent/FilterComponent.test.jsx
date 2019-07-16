/* global mount sinon */
import React from 'react';
import FilterComponent, { filterInitialState } from '../../../components/FilterComponent';
import FilterDropdown, {
  emailAutomations,
  failure, fellowName,
  nokoAutomations, offboarding, onboarding, partnerName, slackAutomations,
  success,
} from '../../../components/FilterComponent/FilterDropdown';

describe('The FilterComponent Mounted', () => {
  let filterComponent;
  let onChangeSpy;
  const filterMock = jest.fn();
  beforeAll(() => {
    filterComponent = mount(
      <FilterComponent filter={filterMock} />,
    );
    onChangeSpy = sinon.spy(filterComponent.instance(), 'handleInputChange');
  });

  beforeEach(() => {
    onChangeSpy.resetHistory();
    filterComponent.setState({ ...filterInitialState, showFilterDropdown: true });
    filterComponent.update();
  });

  describe('The filter dropdown toggle', () => {
    beforeEach(() => {
      filterComponent.setState({ ...filterInitialState, showFilterDropdown: false });
      filterComponent.update();
    });

    it('should not display the FilterDropdown component by default', () => {
      expect(filterComponent.find(FilterDropdown)).toHaveLength(0);
    });

    it('should display the FilterDropdown component', () => {
      const toggle = filterComponent.find('div.filter-button');
      toggle.simulate('click');
      expect(filterComponent.find(FilterDropdown)).toHaveLength(1);
      toggle.simulate('click');
      expect(filterComponent.find(FilterDropdown)).toHaveLength(0);
    });
  });

  describe('should call handleInputChange with expected values', () => {
    describe('the Search input', () => {
      it('should accept input on change', () => {
        const searchInput = filterComponent.find('input.search-input');
        expect(searchInput).toHaveLength(1);
        const mockInput = 'mock input';
        searchInput.instance().value = mockInput;
        searchInput.simulate('change');
        const [arg] = onChangeSpy.lastCall.args;
        const { searchTerm } = filterComponent.state();
        expect(arg.target.name).toEqual('searchTerm');
        expect(arg.target.value).toEqual(mockInput);
        expect(searchTerm).toEqual(arg.target.value);
      });
    });

    describe('the Search by section', () => {
      it('should search by engineer\'s name', () => {
        let fellowInput = filterComponent.find(`input#search-by-${fellowName}`);
        expect(fellowInput).toHaveLength(1);
        /* This is to simulate the input being checked in readiness
         * for the simulation of the change event.
         * The change event does not check the input and state will not be
         * set to what we expect it to be set to. */
        fellowInput.instance().checked = true;
        fellowInput.simulate('change');
        const [arg] = onChangeSpy.lastCall.args;
        expect(arg.target.name).toEqual('search-by');
        expect(arg.target.value).toEqual(fellowName);
        expect(filterComponent.state()['search-by']).toEqual(arg.target.value);
        fellowInput = filterComponent.find(`input#search-by-${fellowName}`);
        fellowInput.instance().checked = false;
        fellowInput.simulate('change');
        expect(filterComponent.state()['search-by']).toBeFalsy();
      });

      it('should search by partner name', () => {
        let partnerInput = filterComponent.find(`input#search-by-${partnerName}`);
        expect(partnerInput).toHaveLength(1);
        partnerInput.instance().checked = true;
        partnerInput.simulate('change');
        const [arg] = onChangeSpy.lastCall.args;
        expect(arg.target.name).toEqual('search-by');
        expect(arg.target.value).toEqual(partnerName);
        expect(filterComponent.state()['search-by']).toEqual(arg.target.value);
        partnerInput = filterComponent.find(`input#search-by-${partnerName}`);
        partnerInput.instance().checked = false;
        partnerInput.simulate('change');
        expect(filterComponent.state()['search-by']).toBeFalsy();
      });

      it('should be mutually exclusive', () => {
        const partnerInput = filterComponent.find(`input#search-by-${partnerName}`);
        partnerInput.instance().checked = true;
        partnerInput.simulate('change');
        expect(filterComponent.state()['search-by']).toEqual(partnerName);
        const fellowInput = filterComponent.find(`input#search-by-${fellowName}`);
        fellowInput.instance().checked = true;
        fellowInput.simulate('change');
        expect(filterComponent.state()['search-by']).toEqual(fellowName);
      });
    });

    describe('the Automation Type section', () => {
      it('should allow filtering by onboarding', () => {
        let onboardingInput = filterComponent.find(`input#automation-type-${onboarding}`);
        expect(onboardingInput).toHaveLength(1);
        onboardingInput.instance().checked = true;
        onboardingInput.simulate('change');
        const [arg] = onChangeSpy.lastCall.args;
        const { 'automation-type': type } = filterComponent.state();
        expect(arg.target.name).toEqual('automation-type');
        expect(arg.target.value).toEqual('onboarding');
        expect(type).toEqual(arg.target.value);
        onboardingInput = filterComponent.find(`input#automation-type-${onboarding}`);
        onboardingInput.instance().checked = false;
        onboardingInput.simulate('change');
        expect(filterComponent.state()['automation-type']).toBeFalsy();
      });

      it('should allow filtering by offboarding', () => {
        let offboardingInput = filterComponent.find(`input#automation-type-${offboarding}`);
        expect(offboardingInput).toHaveLength(1);
        offboardingInput.instance().checked = true;
        offboardingInput.simulate('change');
        const [arg] = onChangeSpy.lastCall.args;
        const { 'automation-type': type } = filterComponent.state();
        expect(arg.target.name).toEqual('automation-type');
        expect(arg.target.value).toEqual('offboarding');
        expect(type).toEqual(arg.target.value);
        offboardingInput = filterComponent.find(`input#automation-type-${offboarding}`);
        offboardingInput.instance().checked = false;
        offboardingInput.simulate('change');
        expect(filterComponent.state()['automation-type']).toBeFalsy();
      });

      it('should be mutually exclusive', () => {
        const onboardingInput = filterComponent.find(`input#automation-type-${onboarding}`);
        onboardingInput.instance().checked = true;
        onboardingInput.simulate('change');
        expect(filterComponent.state()['automation-type']).toEqual(onboarding);
        const offboardingInput = filterComponent.find(`input#automation-type-${offboarding}`);
        offboardingInput.instance().checked = true;
        offboardingInput.simulate('change');
        expect(filterComponent.state()['automation-type']).toEqual(offboarding);
      });
    });

    describe('the Automation Status section', () => {
      describe('Email Automations', () => {
        beforeEach(() => {
          onChangeSpy.resetHistory();
          filterComponent.setState({ ...filterInitialState, showFilterDropdown: true });
          filterComponent.update();
        });

        it('success', () => {
          let successInput = filterComponent.find(`input#${emailAutomations}-${success}`);
          expect(successInput).toHaveLength(1);
          successInput.instance().checked = true;
          successInput.simulate('change');
          const [arg] = onChangeSpy.lastCall.args;
          expect(arg.target.name).toEqual(emailAutomations);
          expect(arg.target.value).toEqual(success);
          expect(filterComponent.state()[emailAutomations]).toEqual(arg.target.value);
          successInput = filterComponent.find(`input#${emailAutomations}-${success}`);
          successInput.instance().checked = false;
          successInput.simulate('change');
          expect(filterComponent.state()[emailAutomations]).toBeFalsy();
        });

        it('failure', () => {
          let failureInput = filterComponent.find(`input#${emailAutomations}-${failure}`);
          expect(failureInput).toHaveLength(1);
          failureInput.instance().checked = true;
          failureInput.simulate('change');
          const [arg] = onChangeSpy.lastCall.args;
          expect(arg.target.name).toEqual(emailAutomations);
          expect(arg.target.value).toEqual(failure);
          expect(filterComponent.state()[emailAutomations]).toEqual(arg.target.value);
          failureInput = filterComponent.find(`input#${emailAutomations}-${failure}`);
          failureInput.instance().checked = false;
          failureInput.simulate('change');
          expect(filterComponent.state()[emailAutomations]).toBeFalsy();
        });

        it('should be mutually exclusive', () => {
          const successInput = filterComponent.find(`input#${emailAutomations}-${success}`);
          successInput.instance().checked = true;
          successInput.simulate('change');
          expect(filterComponent.state()[emailAutomations]).toEqual(success);
          const failureInput = filterComponent.find(`input#${emailAutomations}-${failure}`);
          failureInput.instance().checked = true;
          failureInput.simulate('change');
          expect(filterComponent.state()[emailAutomations]).toEqual(failure);
        });
      });

      describe('Slack Automations', () => {
        beforeEach(() => {
          onChangeSpy.resetHistory();
          filterComponent.setState({ ...filterInitialState, showFilterDropdown: true });
          filterComponent.update();
        });

        it('success', () => {
          let successInput = filterComponent.find(`input#${slackAutomations}-${success}`);
          expect(successInput).toHaveLength(1);
          successInput.instance().checked = true;
          successInput.simulate('change');
          const [arg] = onChangeSpy.lastCall.args;
          expect(arg.target.name).toEqual(slackAutomations);
          expect(arg.target.value).toEqual(success);
          expect(filterComponent.state()[slackAutomations]).toEqual(arg.target.value);
          successInput = filterComponent.find(`input#${slackAutomations}-${success}`);
          successInput.instance().checked = false;
          successInput.simulate('change');
          expect(filterComponent.state()[slackAutomations]).toBeFalsy();
        });

        it('failure', () => {
          let failureInput = filterComponent.find(`input#${slackAutomations}-${failure}`);
          expect(failureInput).toHaveLength(1);
          failureInput.instance().checked = true;
          failureInput.simulate('change');
          const [arg] = onChangeSpy.lastCall.args;
          expect(arg.target.name).toEqual(slackAutomations);
          expect(arg.target.value).toEqual(failure);
          expect(filterComponent.state()[slackAutomations]).toEqual(arg.target.value);
          failureInput = filterComponent.find(`input#${slackAutomations}-${failure}`);
          failureInput.instance().checked = false;
          failureInput.simulate('change');
          expect(filterComponent.state()[slackAutomations]).toBeFalsy();
        });

        it('should be mutually exclusive', () => {
          const successInput = filterComponent.find(`input#${slackAutomations}-${success}`);
          successInput.instance().checked = true;
          successInput.simulate('change');
          expect(filterComponent.state()[slackAutomations]).toEqual(success);
          const failureInput = filterComponent.find(`input#${slackAutomations}-${failure}`);
          failureInput.instance().checked = true;
          failureInput.simulate('change');
          expect(filterComponent.state()[slackAutomations]).toEqual(failure);
        });
      });

      describe('noko Automations', () => {
        beforeEach(() => {
          onChangeSpy.resetHistory();
          filterComponent.setState({ ...filterInitialState, showFilterDropdown: true });
          filterComponent.update();
        });

        it('success', () => {
          let successInput = filterComponent.find(`input#${nokoAutomations}-${success}`);
          expect(successInput).toHaveLength(1);
          successInput.instance().checked = true;
          successInput.simulate('change');
          const [arg] = onChangeSpy.lastCall.args;
          expect(arg.target.name).toEqual(nokoAutomations);
          expect(arg.target.value).toEqual(success);
          expect(filterComponent.state()[nokoAutomations]).toEqual(arg.target.value);
          successInput = filterComponent.find(`input#${nokoAutomations}-${success}`);
          successInput.instance().checked = false;
          successInput.simulate('change');
          expect(filterComponent.state()[nokoAutomations]).toBeFalsy();
        });

        it('failure', () => {
          let failureInput = filterComponent.find(`input#${nokoAutomations}-${failure}`);
          expect(failureInput).toHaveLength(1);
          failureInput.instance().checked = true;
          failureInput.simulate('change');
          const [arg] = onChangeSpy.lastCall.args;
          expect(arg.target.name).toEqual(nokoAutomations);
          expect(arg.target.value).toEqual(failure);
          expect(filterComponent.state()[nokoAutomations]).toEqual(arg.target.value);
          failureInput = filterComponent.find(`input#${nokoAutomations}-${failure}`);
          failureInput.instance().checked = false;
          failureInput.simulate('change');
          expect(filterComponent.state()[nokoAutomations]).toBeFalsy();
        });

        it('should be mutually exclusive', () => {
          const successInput = filterComponent.find(`input#${nokoAutomations}-${success}`);
          successInput.instance().checked = true;
          successInput.simulate('change');
          expect(filterComponent.state()[nokoAutomations]).toEqual(success);
          const failureInput = filterComponent.find(`input#${nokoAutomations}-${failure}`);
          failureInput.instance().checked = true;
          failureInput.simulate('change');
          expect(filterComponent.state()[nokoAutomations]).toEqual(failure);
        });
      });
    });
  });

  describe('The filter form', () => {
    it('should call the filter function on submit', () => {
      filterComponent.find('form.filter-box').simulate('submit');
      expect(filterMock).toHaveBeenCalledWith(filterInitialState);
      expect(filterComponent.find(FilterDropdown)).toHaveLength(0);
    });
  });
});
