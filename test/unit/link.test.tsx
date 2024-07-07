import {ExampleApi , CartApi}  from "../../src/client/api"
import {initStore} from "../../src/client/store"
import { Application } from "../../src/client/Application";
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'; 
import React from "react";
import { render } from '@testing-library/react';

describe('Проверка header', () => {
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    const application = (
        <MemoryRouter initialEntries={[basename]}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );

    it('Проверка ссылок', () => {
        const { container } = render(application);
        const links = container.querySelectorAll('.nav-link');

        expect(links.length).toBe(4);

        const linkTexts = ['Catalog', 'Delivery', 'Contacts', 'Cart'];
        links.forEach((link, index) => {
            expect(link.textContent).toBe(linkTexts[index]);
        });
    });

    it('Проверка ссылки на главную', () => {
        const { getByText } = render(application);

        const brandLink = getByText('Kogtetochka store');
        expect(brandLink.closest('a')).not.toBeNull();
        expect(brandLink.closest('a')?.getAttribute('href')).toBe('/');
    });
});