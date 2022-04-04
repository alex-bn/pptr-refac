describe('image naturalWidth', () => {
  it.skip('should check if there are any broken images on the page', async () => {
    // await page.goto('https://the-internet.herokuapp.com/broken_images', {
    //   waitUntil: 'load',
    // });
    await page.goto('https://wikipedia.com', { waitUntil: 'load' });

    const selector = 'img';
    const imgWidthArray = await page.evaluate(sel => {
      let elements = Array.from(document.querySelectorAll(sel));

      let width = elements.map(element => {
        return element.naturalWidth;
      });

      return width;
    }, selector);

    console.log(
      '--\xa0process:\xa0found\xa0' + imgWidthArray.length + '\xa0images'
    );
    console.log(
      '--\xa0process:\xa0natural\xa0width\xa0list:\xa0' + imgWidthArray
    );

    imgWidthArray.forEach(img => {
      expect(img).toBeGreaterThan(0);
    });
  });
});
