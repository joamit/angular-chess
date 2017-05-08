import { AngularChessPage } from './app.po';

describe('angular-chess App', () => {
  let page: AngularChessPage;

  beforeEach(() => {
    page = new AngularChessPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
