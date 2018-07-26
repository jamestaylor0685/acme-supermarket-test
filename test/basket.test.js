const assert = require('assert');
const Basket = require('../src/basket').default;
const Products = require('../src/product');

describe('Basket tests', () => {
  var pricingRules = {}

  beforeEach(() => {
    pricingRules = {}
  });

  describe('Without pricingRules', () => {
    it('Should add three items', () => {
      const basket = new Basket()
      basket.add(Products.SR1);
      basket.add(Products.FR1);
      basket.add(Products.CF1);
      console.log("Basket items:", basket.items);
      assert.equal(basket.items.length, 3);
    });

    it('Should return basket total', () => {
      const basket = new Basket()
      basket.add(Products.SR1);
      basket.add(Products.FR1);
      basket.add(Products.CF1);
      console.log("Bakset total: ", basket.total());
      assert.equal(basket.total(), 19.34);
    });
  });

  describe('With pricingRules', () => {
    beforeEach(() => {
      pricingRules = {
        buyOneGetOneFree: 'FR1',
        bulkBuy: {
          code: 'SR1',
          newPrice: 4.50,
          limit: 3
        }
      }
    });

    it('Should apply buy one get one free to fruit tea', () => {
      const basket = new Basket(pricingRules);
      basket.add(Products.FR1);
      basket.add(Products.SR1);
      basket.add(Products.FR1);
      basket.add(Products.CF1);
      const price = basket.total();
      console.log("Basket items:", basket.items);
      console.log("Bakset total:", price);

      assert.equal(price, 19.34);
    });

    it('Should add two fruit teas', () => {
      const basket = new Basket(pricingRules);
      basket.add(Products.FR1);
      basket.add(Products.FR1);
      const price = basket.total();
      console.log("Basket items:", basket.items);
      console.log("Bakset total:", price);

      assert.equal(price, 3.11);
    })

    it('Should add 1 fruit tea and 3 strawberries', () => {
      const basket = new Basket(pricingRules);
      basket.add(Products.SR1);
      basket.add(Products.SR1);
      basket.add(Products.FR1);
      basket.add(Products.SR1);
      const price = basket.total();
      console.log("Basket items:", basket.items);
      console.log("Bakset total:", price);

      assert.equal(price, 16.61)
    });
  });
});
