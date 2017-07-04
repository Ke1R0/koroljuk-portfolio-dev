import { ImageGalleryPage } from './app.po';

describe('image-gallery App', function() {
  let page: ImageGalleryPage;

  beforeEach(() => {
    page = new ImageGalleryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
