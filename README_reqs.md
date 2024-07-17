# Requirements

1. introduce "Type" for a user which has values "Dealer" and "Shopper".
    - Shopper types are clients who want to use the website as a car shop to buy vehicles
	- Dealer types are essentially dealers that want to use the website to sell vehicles (they have extra permissions such as add car, remove car etc), this must be validated on back-end too
	- Remove dealers table and all related routes in server
	- Introduce new column with values (dealer/shopper) in the users table (column name: type)
2. Every car must have an image (single image, included in the form, can be JPG or PNG and no bigger than 1500x1500)
3. Images must be saved in the server side and their path must be saved in the database
	- Introduce new column to cars table called "image_path" that saves the path of the file, relative to the public folder
4. Only dealers can add cars
6. Add a "Dealer: {dealerName}" to the card so that people know who they're buying the car from
7. Change theme to more bright and lively colors
8. Enable delete button for cars of the dealer that is logged in in the homepage (optional)
9. Enable edit button for cars of the  dealer that is logged in in the homepage (optional)
10. Implement login with JWT (lots of videos online), save JWT in local storage and then play with the user info and type, controlling what to show to the user/guest.
11. Refactor (optional)