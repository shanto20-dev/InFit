# InFit


[Live Site!](https://in-fit.herokuapp.com/#/)

[image](https://user-images.githubusercontent.com/74939594/114573731-a08a6400-9c46-11eb-8f33-a67d6d57dfb7.png)




## Background

InFit is a full-stack social media web app that lets you store, rate, categorize, and share clothes in your wardrobe. The website allows users to sign up, sign in, and sign out with secure user authenticiation. Users of the website can upload clothing items with a picture of the clothing, descriptions, a link of where to buy the clothing, and tags that describe the aesthetic or style. Users can create outfits that consist of clothing items in their closet via a drag-and-drop.  Users can filter their own closet for clothing items or outfits by tag and category. Users also have access toa universal search function to view other member's favorite outfits and clothing items. Users can "like" these outfits and clothing items to save them for later.


InFit was built with a Node.js back-end and a React/Redux for the front-end.

## Technologies

* Node.js
* React.js
* Redux.js
* MongoDB
* Webpack
* Express.js






## User Auth

* Users can sign-up and create an account with InFit
* Users can sign-in with InFit and create clothing items and outfits
* There is a demo-user feature for InFit
* The Closet page of InFit is an ProtectedRoute - meaning that you cannot access the page if you are not signed-in.


<img width="1438" alt="Screen Shot 2021-04-13 at 10 51 50 AM" src="https://user-images.githubusercontent.com/74939594/114573294-41c4ea80-9c46-11eb-9d6b-0f2bae2df28f.png">






## User's Closet

* The Closet has 3 tabs that display different information - overview, clothing, and outfits
* The overview tab displays some high-level stats for the user that is logged-in: Most used aesethetic, # of clothes, and # of outfits
* The clothing tab is an index of all the clothing a user owns. You can filter these results by category and/or tag. You can drag and drop to delete a clothing item
* The outfit tab is an index of all the outfits a user owns. You can filter these results by category and/or tag. You can drag and drop to delete an outfit
* Clothing and Outfit creation buttons are displayed on the respective tabs



<img width="1432" alt="Screen Shot 2021-04-13 at 10 51 21 AM" src="https://user-images.githubusercontent.com/74939594/114573231-31ad0b00-9c46-11eb-894a-1b1fac7b4439.png">







## Clothing Items

* Users create clothing items via a form that accepts an Item Name, a Category, a Description, Tags, an Image, and a Link to Buy the item
* Users can view their own clothing or other user's clothing on a clothing show page
* If the user is the owner of the clothing item, an edit button will appear on the clothing's show page to edit details for the clothing


<img width="1439" alt="Screen Shot 2021-04-13 at 10 52 54 AM" src="https://user-images.githubusercontent.com/74939594/114573476-67ea8a80-9c46-11eb-838d-73519c4f1905.png">






## Outfits

* Users create outfits via a form that accepts an Outfit Name, Tags, a Description, and an Image
* Users can view their own outfits or other user's outfits on an outfit show page
* If the user is the owner of the outfit, two buttons will appear for the user to "Add clothes to this outfit" or "Save outfit." Additonally, the user can edit the tags for the outfit.
* If the user clicks "Add Clothes to this Outfit", a modal will slide up on the screen that contains all the user's clothing items that are not already a part of the outfit. The user can then drag and drop clothing items into the outfit to add items to that outfit.


<img width="1435" alt="Screen Shot 2021-04-13 at 10 50 41 AM" src="https://user-images.githubusercontent.com/74939594/114573122-18a45a00-9c46-11eb-9442-d601101d30c3.png">
