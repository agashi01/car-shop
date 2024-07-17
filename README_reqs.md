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
5. Enable delete button for cars of the dealer that is logged in in the homepage (optional)
6. Enable edit button for cars of the  dealer that is logged in in the homepage (optional)
7. Implement login with JWT (lots of videos online), save JWT in local storage and then play with the user info and type, controlling what to show to the user/guest.
