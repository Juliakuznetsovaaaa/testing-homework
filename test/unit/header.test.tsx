// @ts-ignore
import React from 'react';
import { render} from '@testing-library/react';
import {Provider} from "react-redux";
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react';
import {Application} from "../../src/client/Application";
import {BrowserRouter} from "react-router-dom";
import {initStore} from "../../src/client/store";
import {CartApi, ExampleApi} from "../../src/client/api";
describe('шапка', () => {
    const basename = "/hw/store"
    const api = new ExampleApi(basename)
    const cart = new CartApi()
    const store = initStore(api, cart)

   

    it('есть ссылка на корзину с количеством', () => {
        const mockState = {
            cart: [{name: 'Product 1', price: 100, count: 1},
                {name: 'Product 2', price: 100, count: 1}]
        };

        cart.setState(mockState.cart)
        const store = initStore(api, cart)

        const count = Object.keys(mockState.cart).length;

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Application/>
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByRole('link', { name: 'Cart' })).toBeInTheDocument(); 
    });
});