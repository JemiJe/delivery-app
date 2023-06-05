## client part of delivery-app

backend code: https://github.com/JemiJe/delivery-app-server <br>
demo: https://resilient-mochi-7d9d26.netlify.app/ <br>
to run: <br>

```
npm install
npm run dev
```

## features briefly

google maps address search/marking, showing shops on the map, cart saves in localStorage, only one shop per order, getting/putting data into MongoDB using server API, mobile adopted markup

## features

- users can choose their address using a pin on the map or just enter an address and it will be shown on the map (advanced level test task requirements)
- show a shop where the user ordered goods from on the map (advanced level test task requirements); when cart is empty - showing all shops
- cart and app state saves in localStorage using redux-persist (middle level test task requirements), refreshing shopping cart page may result in an error on netlify side, better check in shop page
- only one store's products per order is allowed (middle level test task requirements)
- receiving companies and products from server database
- adding/deleting products in cart, sending order to server and saving into data base
- amount of added products and server order feedback is shown in navbar (so you get feedback from server)

## additional

- input your address string into the address field and click another field/place to unfocus - then google.maps.Geocoder() will run to find address and fill the field with found one
- only one store for ordered products: when customer adds one product in the cart shop list selection is temporary blocked until customer delete all products in the cart and can choose another store

## bugs

- there is some bug after you clicked on the map and the marker was added you should click and hold LMB and move the map a little bit, otherwise if you didn't move the map and immediately zoomed it - the map became unavailable
