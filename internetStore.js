const countCartCost = (apiClient, cart) => {
  const user = cart.userId;
  const date = cart.orderDate;
  const goods = cart.items;
  const city = cart.cityId;
  const currency = cart.cityId; 
  const methods =Object.getOwnPropertyNames(apiClient.__proto__);
  const methodNames = methods.reduce((acc, el) => {
      if (el === 'constructor') {
       return { ...acc, el };
    }
    const method = apiClient[el];
    if (method.length === 0) {
      return { ...acc, 'getDefaultCurrency': method};
    }
    if (method.length === 3) {
      return { ...acc, 'makeConvertation': method };
    }
    try {
       if (typeof method.call(apiClient,city) === 'number') {
         return { ...acc, 'deliveryCost': method };
      }
      const arrOfObj = method.call(apiClient, date);
      const shortObj = arrOfObj.map(obj => Object.keys(obj).length)
        .filter(el => el === 4);
      if (arrOfObj.length === shortObj.length) {
          return { ...acc, 'rests': method };
      }
      return { ...acc, 'prices': method };
    } catch (e) {
       return e;
    }     
  }, {});
  

  const goodsCost = goods.reduce((acc, good) => {
   const quantity = methodNames.rests.call(apiClient, date)
     .filter(el => el.articleId === good.articleId)
     .reduce((acc, item) => acc + Number(item.quantity), 0);
  
  const freeQuantity = quantity > Number(goods.quantity) ? goods.quantity : quantity;
   
  /// don't finish
   acc += freeQuantity;
   return acc;
      /*
   const price = methodNames.prices.call(apiClient, date)
   .find(el => el.articleId === good.articleId)
      
    
 return acc; */

  
  }, 0);
  
  
  
  return goodsCost;
  
}