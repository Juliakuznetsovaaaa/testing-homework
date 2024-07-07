import { BASE_URL } from "./constants";

describe("Проверка статического содержимого", () => {
  const pages = [
    {
      name: "Главная",
      url: `${BASE_URL}`,
      selector: ".navbar-brand",
      expectedContent: "Kogtetochka store", 
    },
    {
      name: "Условия доставки",
      url: `${BASE_URL}/delivery`,
      selector: "h1",
      expectedContent: "Delivery",
    },
    {
      name: "Контакты",
      url:` ${BASE_URL}/contacts`,
      selector: "h1",
      expectedContent: "Contacts",
    },
  ];

  pages.forEach(({ name, url, selector, expectedContent }) => {
    it(`Страница ${name} должна иметь статическое содержимое`, async ({ browser }) => {
      await browser.url(url);

      const titleElement = await browser.$(selector);
      await expect(titleElement).toBeDisplayed();

      const titleText = await titleElement.getText();
      await expect(titleText).toBe(expectedContent);
    });
  });
});
