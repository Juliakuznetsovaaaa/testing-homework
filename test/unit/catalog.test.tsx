
import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {Provider} from "react-redux";
import '@testing-library/jest-dom'
import {Application} from "../../src/client/Application";
import {BrowserRouter, MemoryRouter} from "react-router-dom";
import {initStore} from "../../src/client/store";
import {CartApi, ExampleApi} from "../../src/client/api";
import axios from "axios";
import {ProductDetails} from "../../src/client/components/ProductDetails";
import {ProductItem} from "../../src/client/components/ProductItem";
import {Cart} from "../../src/client/pages/Cart";




jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('каталог', () => {

    it('товары с сервера корректно отображаются', async () => {
        const basename = '/';

        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);

        const products = [
            {id: 0, name: 'product1', price: 100},
            {id: 1, name: 'product2', price: 100},
        ]

        mockedAxios.get.mockResolvedValue({data: products})

        const application = (
            <MemoryRouter initialEntries={['/catalog']}>
                <Provider store={store}>
                    <Application/>
                </Provider>
            </MemoryRouter>
        )

        const {container, getAllByTestId} = render(application)

        expect(container.textContent).toContain('LOADING')

        await waitFor(() => {
            const [item1, item2] = [getAllByTestId('0')[1].lastChild, getAllByTestId('1')[1].lastChild]
            expect(item1?.childNodes[0].textContent).toEqual('product1')
            expect(item1?.childNodes[1].textContent).toEqual('$100')
            expect((item1?.childNodes[2] as Element).getAttribute('href')).toEqual(`/catalog/0`)

            expect(item2?.childNodes[0].textContent).toEqual('product2')
            expect(item2?.childNodes[1].textContent).toEqual('$100')
            expect((item2?.childNodes[2] as Element).getAttribute('href')).toEqual(`/catalog/1`)
        })
    })


})
;



describe('страница товара', function() {
    const basename = "/hw/store"
    const api = new ExampleApi(basename)
    const cart = new CartApi()
    const store = initStore(api, cart)

    it('отображаются название, описание, цвет, цена, материал и кнопка', async() => {
        const product =  {id: 0, name: 'product1', price: 100, description: 'description', color: 'color', material: 'material'};

        render(<Provider store={store}>
            <BrowserRouter>
                <ProductDetails product={product}/>
            </BrowserRouter>
        </Provider>)


        await waitFor(() => {
            expect(screen.getByText(product.name)).toBeInTheDocument();
            expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
            expect(screen.getByText(product.description)).toBeInTheDocument();
            expect(screen.getByText(product.color)).toBeInTheDocument();
            expect(screen.getByText(product.material)).toBeInTheDocument();

            const button = screen.getByText('Add to Cart', {selector : 'button'});
            expect(button).toBeInTheDocument();
        })

    });


    it('при добавлении в корзину должно отображаться сообщение об этом на странице и карточке товара', async () => {
        const product =  {id: 0, name: 'product1', price: 100, description: 'description', color: 'color', material: 'material'};

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ProductDetails product={product}/>
                </BrowserRouter>
            </Provider>
        );


        const button = screen.getByText('Add to Cart', {selector : 'button'});
        fireEvent.click(button)

        await waitFor(() => {
            expect(screen.getByText('Item in cart')).toBeInTheDocument();
        })


        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ProductItem product={product}/>
                </BrowserRouter>
            </Provider>
        );

        await waitFor(() => {
            const items = screen.queryAllByText('Item in cart');
            expect(items[1]).toBeInTheDocument()
        })
    });

    it('повторное нажатие на кнопку должно увеличивать количетсво товара', async () => {
        const product =  {id: 1, name: 'product2', price: 100, description: 'description', color: 'color', material: 'material'};
        render(
            <Provider store={store}>
                <ProductDetails product={product}/>
            </Provider>
        );

        const button = screen.getByText('Add to Cart', {selector : 'button'});
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText('Item in cart')).toBeInTheDocument();
        });

        fireEvent.click(button);

        render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );

        await waitFor(() => {
            const quantity = screen.getByRole('cell', { name: '2' })
            expect(quantity).toBeInTheDocument()
        });

    });
});