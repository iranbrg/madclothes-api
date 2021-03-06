# TO-DO's

## Features

### Create Account

- [x] Register administrators with first name, last name, email, password and role
- [x] Register customers with first name, last name, email, password, birthdate, phone number, CPF and zip code
     - [ ] Add validation to confirm passwords
     - [ ] Verify zip code via Correios API or similar
- [ ] Confirm registration via email
- [ ] Login via Google Account (OAuth)

### Update Profile

- [ ] Update administrators' profile data: name, email, password (with confirmation), avatar
- [ ] Update customers' profile data: first name, last name, email, password (with confirmation)

### Products

- [ ] Administrators must add products
     - [ ] Register products with id, name, gender (male, female, unisex), brand, price, quantity in stock, category (e.g. shirt, cap, sneakers) and description
- [ ] Administrators should update product data
- [ ] Administrators must delete products
- [ ] List all registered products
     - [ ] List all registered products filtered by category and gender
     - [ ] List all products registered in ascending and descending price orders
- [ ] Receive the id of a registered product and return all customers who purchased it

### Delete Profile

- [ ] Admins should delete their own profile
- [ ] Customers should delete their own profile

### Password Recovery

- [ ] Admins should recover their password via email
- [ ] Customers should recover their password via email

### Purchases

- [ ] Enable product purchases through the platform
- [ ] Receive a purchase id to cancel it

### Payment

- [ ] Integrate with payment method
     - [ ] Add a fake payment method so that no real money is spent

### Customers

- [ ] Receive the id of a registered customer and return the products purchased by him

### Chat

- [ ] Add chat so that a customer can chat with support and ask questions
     - [ ] For instance, the support will be done by the admin

### Wishlist

- [ ] Add a wishlist
- [ ] The customer must receive a notification on the website when a product is available in stock
- [ ] The customer should receive an email when a product is available in stock

## Chore

### Infrastructure

- [ ] Configure CI/CD with Github Actions
     - [x] Run unit and integration tests
     - [ ] Run linting and formatting
- [ ] Build a workflow in Git with branches
     - [ ] Organize feature branches, development environment, staging environment, production environment, release, etc.
- [x] Find out if it is possible to deploy the API in a cloud provider for free
- [x] Configure docker and docker-compose

### Setup

- [x] Set up Jest
- [x] Set up Prettier
- [x] Set up ESlint
- [x] CORS

### Project Structure

- [x] Define entities
- [x] Define endpoints

## Docs

- [x] Translate TODO.md and README.md to english
- [ ] Add a table of contents to README.md
- [x] Write examples for endpoint requests in the form of a Postman collection
- [ ] Write examples for endpoint requests in the form of a markdown file with endpoint name, HTTP method and body
