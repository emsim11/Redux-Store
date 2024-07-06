const { Category, Order, Product, User } = require('../Models')
const { AuthenticationError, SignToken } = require('../Utils/Auth')
const Stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')

const Resolvers = {
    Query: {
        Categories: async () => {
            return await Category.find();
        },

        Checkout: async (parent, Args, Context) => {
            const Link = new URL(Context.headers.referer).origin;
            const NewOrder = new Order({ Products: Args.Products });
            const Line_Items = [];

            const { Products } = await Order.Populate('Products');

            for (let i = 0; i < Products.length; i++) {
                const Product = await Stripe.Products.create({
                    Name: Products[i].Name,
                    Description: Products[i].Description,
                    Images: [`${Link}/Images/${Products[i].Image}`],
                });

                const Price = await Stripe.Prices.create({
                    Product: Product.Id,
                    Unit_Amount: Products[i].Price * 100,
                    Currency: 'USD',
                });

                Line_Items.push({
                    Price: Price.Id,
                    Quantity: 1,
                });
            }

            const Session = await Stripe.Checkout.Sessions.create({
                Payment_Method_Types: ['Card'],
                Line_Items,
                Mode: 'Payment',
                Success_URL: `${Link}/Success?Session_Id={CHECKOUT_SESSION_ID}`,
                Cancel_URL: `${Link}/`,
            });
            return { Session: Session.Id };
        },

        Order: async (parent, { _Id }, Context) => {
            if (Context.User) {
                const NewUser = await User.findById(Context.User._Id).populate({
                    Path: 'Orders.Products',
                    populate: 'Category',
                });
                return User.Orders.Id(_Id);
            }
            throw AuthenticationError;
        },

        Product: async(parent, { _Id }) => {
            return await Product.findById(_Id).populate('Category');
        },
        
        Products: async (parent, { Category, Name }) => {
            const Params = {};
            
            if (Category) {
                Params.Category = Category;
            }

            if (Name) {
                Params.Name = {
                    $Regex: Name,
                };
            }
            return await Product.find(Params).populate('Category');
        },

        User: async (parent, Args, Context) => {
            if (Context.User) {
                const NewUser = await User.findById(Context.User._Id).populate({
                    Path: 'Orders.Products',
                    Populate: 'Category',
                });
            }
        },
    },
    Mutation: {
        AddOrder: async (parent, { Products }, Context) => {
            console.log(Context);
            
            if (Context.User) {
                const NewOrder = new Order({ Products });
                await User.findByIdAndUpdate(Context.User._Id, { $push: { Orders: Order } });
                return NewOrder;
            }
            throw AuthenticationError;
        },

        AddUser: async (parent, Args) => {
            const NewUser = await User.create(Args);
            const Token = SignToken(NewUser);

            return { Token, User };
        },

        Login: async (parent, { Email, Password }) => {
            const NewUser = await User.findOne({ Email });

            if (!NewUser) {
                throw AuthenticationError;
            }

            const CorrectPassword = await NewUser.IsCorrectPassword(Password);

            if (!CorrectPassword) {
                throw AuthenticationError;
            }

            const Token = SignToken(NewUser);
            return { Token, User };
        },

        UpdateProduct: async (parent, { _Id, Quantity }) => {
            const Decrement = Math.abs(Quantity) * -1;
            return await Product.findByIdAndUpdate(_Id, { $inc: { Quantity: Decrement } }, { new: true });
        },

        UpdateUser: async (parent, Args, Context) => {
            if (Context.User) {
                return await User.findByIdAndUpdate(Context.User._Id, Args, { new: true });
            }
            throw AuthenticationError;
        },
    },
}

module.exports = Resolvers