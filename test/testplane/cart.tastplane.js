describe('корзина', function() {
    it('после нажатия на кнопку Checkout выводится сообщение об успешном заказе', async ({ browser }) => {
        await browser.url('http://localhost:3000/hw/store/catalog/0')

        const addToCartButton = await browser.$("//button[normalize-space()='Add to Cart']");
        await addToCartButton.click();

        await browser.url('http://localhost:3000/hw/store/cart');

        const inputName = await browser.$('#f-name');
        await inputName.setValue('name');

        const inputTel = await browser.$('#f-phone');
        await inputTel.setValue('89154388258');

        const inputAd = await browser.$('#f-address');
        await inputAd.setValue('ffjfj');

        const checkoutButton = await browser.$("//button[normalize-space()='Checkout']");
        await checkoutButton.click();

        const successMessageDiv = await browser.$("//div[contains(@class, 'SuccessMessage')]");
        const color = await successMessageDiv.getCSSProperty('background-color');

        expect(color.parsed.hex).toBe('#d1e7dd');
    });
});