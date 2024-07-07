describe('home adaptive layout', function() {

  it('home var1', async ({ browser }) => {
      await browser.setWindowSize(375, 700);
      await browser.url('http://localhost:3000/hw/store');

      const home = await browser.$('.Home');
      expect(await home.isDisplayed()).toBe(true);

      await home.assertView('plain', {ignoreDiffPixelCount : '5%'})
  });

  it('home var2', async ({ browser }) => {
      await browser.setWindowSize(711, 700);
      await browser.url('http://localhost:3000/hw/store');

      const home = await browser.$('.Home');
      expect(await home.isDisplayed()).toBe(true);

      await home.assertView('plain', {ignoreDiffPixelCount : '5%'})

  });

  it('home var3', async ({ browser }) => {
      await browser.setWindowSize(1024, 700); // Desktop size
      await browser.url('http://localhost:3000/hw/store');

      const home = await browser.$('.Home');
      expect(await home.isDisplayed()).toBe(true);

      await home.assertView('plain', {ignoreDiffPixelCount : '5%'})
  });

});


describe('catalog adaptive layout', function() {
  it('var1', async ({ browser }) => {
      await browser.setWindowSize(375, 700);
      await browser.url('http://localhost:3000/hw/store/catalog');

      const catalog = await browser.$('.Catalog');
      expect(await catalog.isDisplayed()).toBe(true);

      await catalog.assertView('plain')
  });

  it('var2', async ({ browser }) => {
      await browser.setWindowSize(711, 700);
      await browser.url('http://localhost:3000/hw/store/catalog');

      const catalog = await browser.$('.Catalog');
      expect(await catalog.isDisplayed()).toBe(true);

      await catalog.assertView('plain')
  });

  it('var3', async ({ browser }) => {
      await browser.setWindowSize(1024, 700); // Desktop size
      await browser.url('http://localhost:3000/hw/store/catalog');

      const catalog = await browser.$('.Catalog');
      expect(await catalog.isDisplayed()).toBe(true);

      await catalog.assertView('plain')
  });

});



describe('delivery adaptive layout', function() {
  it('var1', async ({ browser }) => {
      await browser.setWindowSize(375, 700);
      await browser.url('http://localhost:3000/hw/store/delivery');

      const delivery = await browser.$('.Delivery');
      expect(await delivery.isDisplayed()).toBe(true);

      await delivery.assertView('plain')
  });

  it('var2', async ({ browser }) => {
      await browser.setWindowSize(711, 700);
      await browser.url('http://localhost:3000/hw/store/delivery');

      const delivery = await browser.$('.Delivery');
      expect(await delivery.isDisplayed()).toBe(true);

      await delivery.assertView('plain')
  });

  it('var3', async ({ browser }) => {
      await browser.setWindowSize(1024, 700); // Desktop size
      await browser.url('http://localhost:3000/hw/store/delivery');

      const delivery = await browser.$('.Delivery');
      expect(await delivery.isDisplayed()).toBe(true);

      await delivery.assertView('plain')
  });

});


describe('contacts adaptive layout', function() {
  it('var1', async ({ browser }) => {
      await browser.setWindowSize(375, 700);
      await browser.url('http://localhost:3000/hw/store/contacts');

      const contacts = await browser.$('.Contacts');
      expect(await contacts.isDisplayed()).toBe(true);

      await contacts.assertView('plain')
  });

  it('var2', async ({ browser }) => {
      await browser.setWindowSize(711, 700);
      await browser.url('http://localhost:3000/hw/store/contacts');

      const contacts = await browser.$('.Contacts');
      expect(await contacts.isDisplayed()).toBe(true);

      await contacts.assertView('plain')
  });

  it('var3', async ({ browser }) => {
      await browser.setWindowSize(1024, 700); // Desktop size
      await browser.url('http://localhost:3000/hw/store/contacts');

      const contacts = await browser.$('.Contacts');
      expect(await contacts.isDisplayed()).toBe(true);

      await contacts.assertView('plain')
  });

});