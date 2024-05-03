# Online E-commerce Furniture Store

Welcome to our Online E-commerce Furniture Store! This platform is designed to offer a seamless shopping experience for customers looking for high-quality furniture, providing a comprehensive admin panel for store managers to oversee operations.

## Table of Contents

- [Project Demo](#project-demo)
- [Features](#features)
  - [Admin Features](#admin-features)
  - [User Features](#user-features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributors](#contributors)
- [Contributing](#contributing)
- [License](#license)

## Project Demo

Check out our project demo [here](https://www.youtube.com/watch?v=x9JopZqdfn4)!

## Features

### Admin Features:
- **Secure Authentication:** Admins can securely log in with their pre-registered email and password.
- **Product Management:** Admins have full CRUD functionality for managing products, including creating, updating, editing, and deleting product listings. They can add products with details such as title, image, price, and description.
- **Order Management Dashboard:** Admins can view the orders page with filters for pending, accepted, and rejected orders. They can see all orders, including username, date, total price, and product titles. Admins can also take actions to modify the order state.
- **User Management:** Admins can manage user accounts, including viewing user information, editing user details, and potentially disabling or deleting user accounts.

### User Features:
- **View Home and About Pages:** Users can access the home and about pages without the need to log in.
- **Secure Registration and Login Process:** Users can securely register with their email, username, password, image, and gender. They can also log in securely.
- **Browse Products:** Users can browse all products with the ability to search by name.
- **Add to Cart and Checkout:** Users can add products to their shopping cart and proceed to checkout to place an order.
- **User Profile Management:**
  - View and Edit Personal Information: Users can view their own information and edit it if necessary.
  - View Order History and Status: Users can view their order history, including accepted, rejected, and pending orders.
  - Cancel Pending Orders: Users can cancel pending orders if needed.

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
- **Admin Account:**  
  - Email: admin@gmail.com  
  - Password: 12345678  
- **Users** can register and login through the homepage links provided on the `http://localhost:4200` landing page.
- **Note** Don't forget to type the connection string of database in `.env` file in Backend directory.

## Contributors

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/ZeinabAbdelghaffar">
        <img
            src="https://avatars.githubusercontent.com/u/87963230?v=4"
            width="100px;"
        /><br /><sub><b>Zeinab Abgelghafar</b></sub> </a
        ><br />
      </td>
      <td align="center" valign="top" width="15%">
        <a href="https://github.com/NourhanRadwan145">
        <img
            src="https://avatars.githubusercontent.com/u/153069096?v=4"
            width="105px;"
        /><br /><sub><b>Nourhan Radwan </b></sub> </a
        ><br />
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/nadarabea1">
        <img
            src="https://avatars.githubusercontent.com/u/89930688?v=4"
            width="100px;"
        /><br /><sub><b>Nada Rabea</b></sub> </a
        ><br />
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/Ahmed10257">
        <img
            src="https://avatars.githubusercontent.com/u/153066996?v=4"
            width="100px;"
        /><br /><sub><b>Ahmes Mansour</b></sub> </a
        ><br />
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/AhmedKamal71">
        <img
            src="https://avatars.githubusercontent.com/u/111020957?v=4"
            width="100px;"
        /><br /><sub><b>Ahmed Kamal</b></sub> </a
        ><br />
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/Mohamed-Algharabawy17">
        <img
            src="https://avatars.githubusercontent.com/u/77066150?v=4"
            width="100px;"
        /><br /><sub><b>Mohamed Algharabawy</b></sub> </a
        ><br />
      </td>
    </tr>
  </tbody>
</table> 

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
