## client part of delivery-app

backend code: https://github.com/JemiJe/delivery-app-server <br>
demo: https://resilient-mochi-7d9d26.netlify.app/ <br>
to run: <br>

```
npm install
npm run dev
```

## features

- cart and app state saves in localStorage using redux-persist (middle level test task requirements), refreshing shopping cart page may result in an error on netlify side, better check in shop page
- only one store's products per order is allowed (middle level test task requirements)
- receiving companies and products from server database
- adding/deleting products in cart, sending order to server and saving into data base
- amount of added products and server order feedback is shown in navbar (so you get feedback from server)

## additional

- only one store for ordered products: when customer adds one product in the cart shop list selection is temporary blocked until customer delete all products in the cart and can choose another store
- to get rid CORS error, is used cors proxy https://corsproxy.io/
