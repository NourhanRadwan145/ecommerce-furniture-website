# Online E-commerce Furniture Store
 
Welcome to our Online E-commerce Furniture Store! This platform is designed to offer a seamless shopping experience for customers looking for high-quality furniture, providing a comprehensive admin panel for store managers to oversee operations.
 
## Features
 
### Admin Features:
- Secure login with email and password.
- Full CRUD functionality for product management:
  - Create, update, edit, and delete product listings including title, image, price, and details.
- Order management dashboard:
  - View all orders with filters like pending, accepted, and rejected.
  - Modify the status of orders.
 
### User Features:
- View home and about pages without logging in.
- Secure registration and login process.
- Browse all products with the ability to search by name.
- Add products to a shopping cart and checkout.
- User profile management:
  - View and edit personal information.
  - View order history and status.
  - Cancel pending orders.
 
## Technology Stack
 
- **Frontend:** Angular
- **Backend:** Node.js with Express
- **Database:** MongoDB
- **Authentication:** JWT for secure authentication
- **Styling:** CSS3 and Bootstrap for responsive design
 
## Installation
 
1. **Clone the repository**:
git clone https://github.com/NourhanRadwan145/ecommerce-furniture-website
cd ecommerce-furniture-website
 
 
2. **Install dependencies**:
npm install
 
3. **Start the Application**:
- Start the backend server:
  cd Back-end/src/Servers
  nodemon server
- Start the frontend application:
  cd Front-end
  ng serve
 
4. **Open your browser**:
- Navigate to `http://localhost:4200` to view the application.
 
## Usage
 
- **Administrators** should first login through the `/admin` endpoint to manage the store.
- **Users** can register and login through the homepage links provided on the `http://localhost:4200` landing page.
- **Note** Don't forget to type the connection string of database in `.env` file in Backend directory
 
## Contributing
 
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.
 
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
 
## License
 
Distributed under the MIT License. See `LICENSE` for more information.