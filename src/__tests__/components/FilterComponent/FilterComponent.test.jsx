/* global mount sinon */
import React from 'react';
import FilterComponent, { filterInitialState } from '../../../components/FilterComponent';
import FilterDropdown, {
  emailAutomations,
  failure,
  fellowName,
  freckleAutomations,
  partnerName,
  slackAutomations,
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
      it('should search by fellow name', () => {
        const fellowInput = filterComponent.find('input#fellowName');
        expect(fellowInput).toHaveLength(1);
        /* This is to simulate the input being checked in readiness
         * for the simulation of the change event.
         * The change event does not check the input and state will not be
         * set to what we expect it to be set to. */
        fellowInput.instance().checked = true;
        fellowInput.simulate('change');
        const [arg] = onChangeSpy.lastCall.args;
        const { searchBy } = filterComponent.state();
        expect(arg.target.name).toEqual('searchBy');
        expect(arg.target.value).toEqual(fellowName);
        expect(searchBy).toEqual(arg.target.value);
      });

      it('should search by partner name', () => {
        const partnerInput = filterComponent.find('input#partnerName');
        expect(partnerInput).toHaveLength(1);
        partnerInput.instance().checked = true;
        partnerInput.simulate('change');
        const [arg] = onChangeSpy.lastCall.args;
        const { searchBy } = filterComponent.state();
        expect(arg.target.name).toEqual('searchBy');
        expect(arg.target.value).toEqual(partnerName);
        expect(searchBy).toEqual(arg.target.value);
      });

      it('should be mutually exclusive', () => {
        const partnerInput = filterComponent.find('input#partnerName');
        const fellowInput = filterComponent.find('input#fellowName');
        partnerInput.instance().checked = true;
        partnerInput.simulate('change');
        expect(filterComponent.state().searchBy).toEqual(partnerName);
        fellowInput.instance().checked = true;
        fellowInput.simulate('change');
        expect(filterComponent.state().searchBy).toEqual(fellowName);
      });
    });

    describe('the Automation Type section', () => {
      it('should allow filtering by onboarding', () => {
        const onboardingInput = filterComponent.find('input#onboarding');
        expect(onboardingInput).toHaveLength(1);
        onboardingInput.instance().checked = true;
        onboardingInput.simulate('change');
        const [arg] = onChangeSpy.lastCall.args;
        const { type } = filterComponent.state();
        expect(arg.target.name).toEqual('type');
        expect(arg.target.value).toEqual('onboarding');
        expect(type).toEqual(arg.target.value);
      });

      it('should allow filtering by offboarding', () => {
        const offboardingInput = filterComponent.find('input#offboarding');
        expect(offboardingInput).toHaveLength(1);
        offboardingInput.instance().checked = true;
        offboardingInput.simulate('change');
        const [arg] = onChangeSpy.lastCall.args;
        const { type } = filterComponent.state();
        expect(arg.target.name).toEqual('type');
        expect(arg.target.value).toEqual('offboarding');
        expect(type).toEqual(arg.target.value);
      });

      it('should be mutually exclusive', () => {
        const onboardingInput = filterComponent.find('input#onboarding');
        const offboardingInput = filterComponent.find('input#offboarding');
        onboardingInput.instance().checked = true;
        onboardingInput.simulate('change');
        expect(filterComponent.state().type).toEqual('onboarding');
        offboardingInput.instance().checked = true;
        offboardingInput.simulate('change');
        expect(filterComponent.state().type).toEqual('offboarding');
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
          const successInput = filterComponent.find('input#emailSuccess');
          expect(successInput).toHaveLength(1);
          successInput.instance().checked = true;
          successInput.simulate('change');
          const [arg] = onChangeSpy.lastCall.args;
          expect(arg.target.name).toEqual(emailAutomations);
          expect(arg.target.value).toEqual(success);
          expect(filterComponent.state()[emailAutomations]).toEqual(arg.target.value);
          successInput.instance().checked = false;
          successInput.simulate('change');
          expect(filterComponent.state()[emailAutomations]).toBeFalsy();
        });

        it('failure', () => {
          const failureInput = filterComponent.find('input#emailFailure');
          expect(failureInput).toHaveLength(1);
          failureInput.instance().checked = true;
          failureInput.simulate('change');
          const [arg] = onChangeSpy.lastCall.args;
          expect(arg.target.name).toEqual(emailAutomations);
          expect(arg.target.value).toEqual(failure);
          expect(filterComponent.state()[emailAutomations]).toEqual(arg.target.value);
          failureInput.instance().checked = false;
          failureInput.simulate('change');
          expect(filterComponent.state()[emailAutomations]).toBeFalsy();
        });

        it('should be mutually exclusive', () => {
          const successInput = filterComponent.find('input#emailSuccess');
          const failureInput = filterComponent.find('input#emailFailure');
          successInput.instance().checked = true;
          successInput.simulate('change');
          expect(filterComponent.state()[emailAutomations]).toEqual(success);
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
          const successInput = filterComponent.find('input#slackSuccess');
          expect(successInput).toHaveLength(1);
          successInput.instance().checked = true;
          successInput.simulate('change');
          const [arg] = onChangeSpy.lastCall.args;
          expect(arg.target.name).toEqual(slackAutomations);
          expect(arg.target.value).toEqual(success);
          expect(filterComponent.state()[slackAutomations]).toEqual(arg.target.value);
          successInput.instance().checked = false;
          successInput.simulate('change');
          expect(filterComponent.state()[slackAutomations]).toBeFalsy();
        });

        it('failure', () => {
          const failureInput = filterComponent.find('input#slackFailure');
          expect(failureInput).toHaveLength(1);
          failureInput.instance().checked = true;
          failureInput.simulate('change');
          const [arg] = onChangeSpy.lastCall.args;
          expect(arg.target.name).toEqual(slackAutomations);
          expect(arg.target.value).toEqual(failure);
          expect(filterComponent.state()[slackAutomations]).toEqual(arg.target.value);
          failureInput.instance().checked = false;
          failureInput.simulate('change');
          expect(filterComponent.state()[slackAutomations]).toBeFalsy();
        });

        it('should be mutually exclusive', () => {
          const successInput = filterComponent.find('input#slackSuccess');
          const failureInput = filterComponent.find('input#slackFailure');
          successInput.instance().checked = true;
          successInput.simulate('change');
          expect(filterComponent.state()[slackAutomations]).toEqual(success);
          failureInput.instance().checked = true;
          failureInput.simulate('change');
          expect(filterComponent.state()[slackAutomations]).toEqual(failure);
        });
      });

      describe('Freckle Automations', () => {
        beforeEach(() => {
          onChangeSpy.resetHistory();
          filterComponent.setState({ ...filterInitialState, showFilterDropdown: true });
          filterComponent.update();
        });

        it('success', () => {
          const successInput = filterComponent.find('input#freckleSuccess');
          expect(successInput).toHaveLength(1);
          successInput.instance().checked = true;
          successInput.simulate('change');
          const [arg] = onChangeSpy.lastCall.args;
          expect(arg.target.name).toEqual(freckleAutomations);
          expect(arg.target.value).toEqual(success);
          expect(filterComponent.state()[freckleAutomations]).toEqual(arg.target.value);
          successInput.instance().checked = false;
          successInput.simulate('change');
          expect(filterComponent.state()[freckleAutomations]).toBeFalsy();
        });

        it('failure', () => {
          const failureInput = filterComponent.find('input#freckleFailure');
          expect(failureInput).toHaveLength(1);
          failureInput.instance().checked = true;
          failureInput.simulate('change');
          const [arg] = onChangeSpy.lastCall.args;
          expect(arg.target.name).toEqual(freckleAutomations);
          expect(arg.target.value).toEqual(failure);
          expect(filterComponent.state()[freckleAutomations]).toEqual(arg.target.value);
          failureInput.instance().checked = false;
          failureInput.simulate('change');
          expect(filterComponent.state()[freckleAutomations]).toBeFalsy();
        });

        it('should be mutually exclusive', () => {
          const successInput = filterComponent.find('input#freckleSuccess');
          const failureInput = filterComponent.find('input#freckleFailure');
          successInput.instance().checked = true;
          successInput.simulate('change');
          expect(filterComponent.state()[freckleAutomations]).toEqual(success);
          failureInput.instance().checked = true;
          failureInput.simulate('change');
          expect(filterComponent.state()[freckleAutomations]).toEqual(failure);
        });
      });
    });
  });

  describe('The filter form', () => {
    it('should call the filter function on submit', () => {
      filterComponent.find('form.filter-box').simulate('submit');
      expect(filterMock).toHaveBeenCalledWith({ ...filterInitialState, showFilterDropdown: true });
      expect(filterComponent.find(FilterDropdown)).toHaveLength(0);
    });
  });
});
