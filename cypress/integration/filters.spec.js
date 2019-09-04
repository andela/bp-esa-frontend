import {
  stubbedOnboardingUrl,
  stubbedOffboardingUrl,
  stubbedFellowOnboarding,
  stubbedFellowOffboarding,
  stubbedPartnerOnboarding,
  stubbedPartnerOffboarding,
  stubbedDateFilter,
  onboardingFixtures,
  offboardingFixtures,
} from '../stubs/filterStubs';


describe('Filter test', () => {
  beforeEach(() => {
    cy.authenticateUser();
    cy.server();
    cy.route('GET', stubbedOnboardingUrl, onboardingFixtures);
    cy.route('GET', stubbedOffboardingUrl, offboardingFixtures);
    cy.route('GET', stubbedFellowOnboarding, onboardingFixtures);
    cy.route('GET', stubbedFellowOffboarding, offboardingFixtures);
    cy.route('GET', stubbedPartnerOnboarding, onboardingFixtures);
    cy.route('GET', stubbedPartnerOffboarding, offboardingFixtures);
    cy.route('GET', stubbedDateFilter, onboardingFixtures);
    cy.visit('/');
    cy.wait(3000);
  });

  describe('Filter automation data', () => {
    it('searches for an engineer by name', () => {
      cy.get('input.search-input')
        .click()
        .type('Kory');
      cy.get('.filter-button')
        .click();
      cy.get('button.apply-filters')
        .click();
      cy.get('span.developerName')
        .contains('Kory');
    });

    it('filters data to get onboarding results only', () => {
      cy.get('.filter-button')
        .click();
      cy.get('.automation-type-onboarding-label')
        .click();
      cy.get('button.apply-filters')
        .click();
      cy.wait(2000);
      cy.get('#more-info-icon')
        .click();
      cy.get('.automation-type')
        .contains('onboarding');
      cy.get('.modal-close-button-group')
        .click();
    });

    it('filters data to get offboarding results only', () => {
      cy.get('.filter-button')
        .click();
      cy.get('.automation-type-offboarding-label')
        .click();
      cy.get('button.apply-filters')
        .click();
      cy.wait(2000);
      cy.get('#more-info-icon')
        .click();
      cy.get('.automation-type')
        .contains('offboarding');
      cy.get('.modal-close-button-group')
        .click();
    });

    it('searches for a specified engineer name for onboarding activities ', () => {
      cy.get('input.search-input')
        .click()
        .clear()
        .type('Kory');
      cy.get('.filter-button')
        .click();
      cy.get('.search-by-fellow-label')
        .click();
      cy.get('.automation-type-onboarding-label')
        .click();
      cy.get('button.apply-filters')
        .click();
      cy.wait(2000);
      cy.get('#more-info-icon')
        .click();
      cy.get('.developer-name')
        .contains('Kory');
      cy.get('.automation-type')
        .contains('onboarding');
      cy.get('.modal-close-button-group')
        .click();
    });

    it('searches for a specified engineer name for offboarding activities ', () => {
      cy.get('input.search-input')
        .click()
        .clear()
        .type('Annabelle');
      cy.get('.filter-button')
        .click();
      cy.get('.search-by-fellow-label')
        .click();
      cy.get('.automation-type-offboarding-label')
        .click();
      cy.get('button.apply-filters')
        .click();
      cy.wait(2000);
      cy.get('#more-info-icon')
        .click();
      cy.get('.developer-name')
        .contains('Annabelle');
      cy.get('.automation-type')
        .contains('offboarding');
      cy.get('.modal-close-button-group')
        .click();
    });

    it('searches for a specified partner name for onboarding activities ', () => {
      cy.get('input.search-input')
        .click()
        .clear()
        .type('Fadel');
      cy.get('.filter-button')
        .click();
      cy.get('.search-by-partner-label')
        .click();
      cy.get('.automation-type-onboarding-label')
        .click();
      cy.get('button.apply-filters')
        .click();
      cy.wait(2000);
      cy.get('#more-info-icon')
        .click();
      cy.get('.partner-name')
        .contains('Fadel');
      cy.get('.automation-type')
        .contains('onboarding');
      cy.get('.modal-close-button-group')
        .click();
    });

    it('searches for a specified partner name for offboarding activities ', () => {
      cy.get('input.search-input')
        .click()
        .clear()
        .type('Lincon');
      cy.get('.filter-button')
        .click();
      cy.get('.search-by-partner-label')
        .click();
      cy.get('.automation-type-offboarding-label')
        .click();
      cy.get('button.apply-filters')
        .click();
      cy.wait(2000);
      cy.get('#more-info-icon')
        .click();
      cy.get('.partner-name')
        .contains('Lincon');
      cy.get('.automation-type')
        .contains('offboarding');
      cy.get('.modal-close-button-group')
        .click();
    });

    it('filters by automation date ', () => {
      cy.get('.filter-button')
        .click();
      cy.get('#from')
        .click()
        .type('September 12, 2019');
      cy.get('#to')
        .click()
        .type('September 12, 2019');
      cy.get('.filter-dropdown-parent')
        .click();
      cy.get('button.apply-filters')
        .click();
      cy.wait(2000);
      cy.get('#more-info-icon')
        .click();
      cy.get('.automation-date')
        .contains('9/12/2019');
      cy.get('.modal-close-button-group')
        .click();
    });
  });
});
