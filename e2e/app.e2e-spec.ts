import { HealthAppPage } from './app.po';

describe('health-app App', function() {
  let page: HealthAppPage;

  beforeEach(() => {
    page = new HealthAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
