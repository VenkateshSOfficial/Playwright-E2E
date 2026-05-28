import{test,expect} from '@playwright/test'

/*
BUILT-IN LOCATORS IN PLAYWRIGHT
=======================================

Introduction
=============
Locators are the central piece of Playwright's auto-waiting and retry-ability. In a nutshell, locators represent a way to find element(s) on the page at any moment.

Quick Guide
=============
These are the recommended built-in locators.

1) page.getByRole() to locate by explicit and implicit accessibility attributes.
2) page.getByText() to locate by text content.
3) page.getByLabel() to locate a form control by associated label's text.
4) page.getByPlaceholder() to locate an input by placeholder.
5) page.getByAltText() to locate an element, usually image, by its text alternative.
6) page.getByTitle() to locate an element by its title attribute.
7) page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).

*/

