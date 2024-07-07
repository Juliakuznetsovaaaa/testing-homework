describe('страница с подробным описанием товара', function() {
    it('отображается кнопка', async ({ browser }) => {
        await browser.url('http://localhost:3000/hw/store/catalog/0');

        const button = await browser.$('.ProductDetails-AddToCart');

        await button.assertView('plain', {ignoreDiffPixelCount : '5%'})
    });
});