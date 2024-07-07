describe('navigation', function() {
    it('меню скрывается за гамбургер на ширине меньше 576', async ({ browser }) => {
        await browser.setWindowSize(500, 700);
        await browser.url('http://localhost:3000/hw/store');

        const navMenu = await browser.$('.navbar-nav');
        expect(await navMenu.isDisplayed()).toBe(false);

        const hamburger = await browser.$('.navbar-toggler-icon');
        expect(await hamburger.isDisplayed()).toBe(true);

        await hamburger.click();
        expect(await navMenu.isDisplayed()).toBe(true);

        const menuItem = await browser.$('.nav-link');
        await menuItem.click();

        expect(await navMenu.isDisplayed()).toBe(false);
    });


    it('при выборе элемента из меню гамбургера, оно закрывается', async ({browser}) => {
        await browser.setWindowSize(500, 700);
        await browser.url('http://localhost:3000/hw/store');

        const hamburger = await browser.$('.navbar-toggler-icon');
        await hamburger.click();

        const navMenu = await browser.$('.navbar-nav');

        const menuItem = await browser.$(".nav-link");
        await menuItem.click();

        expect(await navMenu.isDisplayed()).toBe(false);
    });
});


describe('название магазина в шапке', function() {
    it('должно вести на главну страницу', async ({ browser }) => {
        await browser.url('http://localhost:3000/hw/store/contacts');

        const storeNameLink = await browser.$('.navbar-brand');

        expect(await storeNameLink.getTagName()).toBe('a');

        const linkHref = await storeNameLink.getAttribute('href');
        expect(linkHref).toBe('/hw/store');
    });
});