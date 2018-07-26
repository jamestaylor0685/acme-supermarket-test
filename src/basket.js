module.exports.default = class Basket {
  constructor(pricingRules) {
    this.pricingRules = pricingRules,
    this.items = []
  }
  add(item) {
    this.items.push(item);
  }
  total() {
    debugger
    if(this.pricingRules !== undefined) {
      if(this.pricingRules['buyOneGetOneFree']) {
        this.buyOneGetOneFree(this.pricingRules.buyOneGetOneFree)
      }
      if(this.pricingRules['bulkBuy']) {
        this.bulkBuy(this.pricingRules.bulkBuy.code, this.pricingRules.bulkBuy.newPrice, this.pricingRules.bulkBuy.limit)
      }
    }
    var total = 0;
    this.items.forEach(function(item) {
      total += item.price
    });
    return total;
  }
  buyOneGetOneFree(code) {
    //filter out items with the matching code and that are even
    const evenItems = this.items.filter(item => item.code === code).filter((item, i) => !isOddNum(i))

    //remove all items with the code
    const filteredItems = this.items.filter(item => item.code !== code)

    //add the two arrays
    this.items = evenItems.concat(filteredItems);
  }
  bulkBuy(code, newPrice, limit) {
    //get the items that match the code
    const matchedItems = this.items.filter(item => item.code === code)
    //check size of matchedItems to see if it exceeds or equals limit
    if(matchedItems.length >= limit) {
      //remove the matchedItems from the real array

      this.items = this.items.filter(item => item.code !== code)

      //change the price of the items then re-add them
      matchedItems.forEach(function(item) {
        item.price = newPrice
      });
      this.items = this.items.concat(matchedItems)
    }
  }
}

function isOddNum(i) {
  return i % 2
}
