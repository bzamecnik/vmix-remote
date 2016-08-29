'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  it('should automatically redirect to /scenes when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/scenes");
  });

  describe('scenes', function() {

    beforeEach(function() {
      browser.get('index.html#!/scenes');
    });

    it('should render scene liest when user navigates to /scenes', function() {
      expectelement.all(by.css('[ng-view] ul li')).first().getText()).
        toMatch(/live piano stream/);
    });

  });
});
