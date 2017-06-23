import { EnviPage } from './app.po';

describe('envi App', () => {
  let page: EnviPage;

  beforeEach(() => {
    page = new EnviPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
