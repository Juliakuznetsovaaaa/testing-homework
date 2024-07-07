import {ExampleApi , CartApi}  from "../../src/client/api"
import {initStore} from "../../src/client/store"
import { Application } from "../../src/client/Application";
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'; 
import React from "react";
import { render, screen } from '@testing-library/react';

describe('Проверка каталога товаров', () => {
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    const application = (
        <MemoryRouter initialEntries={['/catalog']}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );

    it('Проверка отображения информации о товарах', () => {
        render(application);

        // Используем селектор по классу "ProductItem"
        const productElements = screen.getAllByTestId('ProductItem');
        expect(productElements.length).toBeGreaterThanOrEqual(1);

        productElements.forEach(productElement => {
            // Проверка наличия названия товара
            const productNameElement = productElement.querySelector('.card-title'); 
            expect(productNameElement).not.toBeNull();
            expect(productNameElement?.textContent?.trim()).toBeDefined();

            // Проверка наличия цены товара
            const productPriceElement = productElement.querySelector('.card-text');
            expect(productPriceElement).not.toBeNull();
            expect(productPriceElement?.textContent?.trim()).toBeDefined();

            // Проверка наличия ссылки на страницу с подробной информацией о товаре
            const productLinkElement = productElement.querySelector('.card-link');
            expect(productLinkElement).not.toBeNull();
            expect(productLinkElement?.getAttribute('href')).toBeDefined();
        });
    });
});
