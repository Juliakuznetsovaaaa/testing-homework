import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {Provider} from "react-redux";
import '@testing-library/jest-dom'
import {BrowserRouter, MemoryRouter} from "react-router-dom";
import {initStore} from "../../src/client/store";
import {CartApi, ExampleApi} from "../../src/client/api";
import {ProductDetails} from "../../src/client/components/ProductDetails";
import {Cart} from "../../src/client/pages/Cart";



describe('корзина', function () {
    const basename = "/hw/store"
    const api = new ExampleApi(basename)
    const cart = new CartApi()
    const store = initStore(api, cart)


    it('отображается таблица с добавленными товарами', async () => {

        const product1 = {
            id: 0,
            name: 'product1',
            price: 100,
            description: 'description',
            color: 'color',
            material: 'material'
        };

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ProductDetails product={product1}/>
                </BrowserRouter>
            </Provider>
        );

        const button1 = screen.getByText('Add to Cart', {selector: 'button'});
        fireEvent.click(button1);

        const product2 = {
            id: 1,
            name: 'product2',
            price: 200,
            description: 'description',
            color: 'color',
            material: 'material'
        };

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ProductDetails product={product2}/>
                </BrowserRouter>
            </Provider>
        );

        const button2 = screen.queryAllByText('Add to Cart', {selector: 'button'})[1];
        fireEvent.click(button2);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Cart/>
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByRole('table')).toBeInTheDocument();

        expect(screen.getByRole('cell', {name: /product1/i})).toBeInTheDocument()
        expect(screen.getByRole('cell', {name: /product2/i})).toBeInTheDocument()

        expect(screen.getAllByRole('cell', {name: /\$100/i})[0]).toBeInTheDocument()
        expect(screen.getAllByRole('cell', {name: /\$200/i})[0]).toBeInTheDocument()

        expect(screen.getByRole('cell', {name: /\$300/i})).toBeInTheDocument()
    });


    it('при нажатии на "очистить корзину" все товары удаляются и отображается ссылка на каталог', async () => {
        const product1 = {id: 0, name: 'product1', price: 100, description: 'description', color: 'color', material: 'material'};

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ProductDetails product={product1}/>
                </BrowserRouter>
            </Provider>
        );

        const button1 = screen.getByText('Add to Cart', {selector : 'button'});
        fireEvent.click(button1);


        const product2 = {id: 1, name: 'product2', price: 200, description: 'description', color: 'color', material: 'material'};

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ProductDetails product={product2}/>
                </BrowserRouter>
            </Provider>
        );

        const button2 = screen.queryAllByText('Add to Cart', {selector : 'button'})[1];
        fireEvent.click(button2);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Cart />
                </BrowserRouter>
            </Provider>
        );


        const clearButton = screen.getByText('Clear shopping cart', {selector: 'button'});
        fireEvent.click(clearButton);

        await waitFor(() => {
            expect(screen.queryByRole('table')).not.toBeInTheDocument();
            expect(screen.getByText(/cart is empty\. please select products in the \./i)).toBeInTheDocument()
            expect(screen.getByRole('link', {name: /catalog/i})).toBeInTheDocument()
        });

    });

});