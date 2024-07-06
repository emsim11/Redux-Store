const TypeDefs = `

    type Category {
        _Id: ID
        Name: String
    }

    type Checkout {
        Session: ID
    }

    type Order {
        _Id: ID
        PurchaseDate: String
        Products: [Product]
    }

    type Product {
        _Id: ID
        Name: String
        Category: Category
        Description: String
        Image: String
        Price: Float
        Quantity: Int
    }

    type User {
        _Id: ID
        FirstName: String
        LastName: String
        Email: String
        Orders: [Order]
    }

    type Auth {
        Token: ID
        User: User
    }

    type Query {
        Categories: [Category]
        Checkout(Products: [ID]!): Checkout
        Order(_Id: ID!): Order
        Product(Category: ID, Name: String): [Product]
        Product(_Id: ID!): Product
        User: User
    }

    type Mutation {
        AddUser(FirstName: String, LastName: String!, Email: String!, Password: String!): Auth
        AddOrder(Products: [ID]!): Order
        UpdateUser(FirstName: String, LastName: String, Email: String, Password: String): User
        UpdateProduct(_Id: ID!, Quantity: Int!): Product
        Login(Email: String!, Password: String!): Auth
    }
`;

module.exports = TypeDefs