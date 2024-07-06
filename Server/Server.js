const Express = require('express')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const Path = require('path')
const { AuthMiddleware } = require('./Utils/Auth')

const { Resolvers, TypeDefs } = require('./Schemas')
const Database = require('./Config/Connection')

const PORT = process.env.PORT || 3001;
const App = Express();
const Server = new ApolloServer({
    Resolvers,
    TypeDefs,
});

const StartApolloServer = async () => {
    await Server.start();

    App.use(Express.urlencoded({ extended: false }));
    App.use(Express.json());
    App.use('/Images', Express.static(Path.join(__dirname, '../Client/Images')));
    App.use('/graphql', expressMiddleware(Server, {
        context: AuthMiddleware
    }));

    if (process.env.NODE_ENV === 'production') {
        App.use(Express.static(Path.join(__dirname, '../Client/dist')));

        App.get('*', (Req, Res) => {
            Res.sendFile(Path.join(__dirname, '../Client/dist/index.html'));
        });
    }

    Database.once('open', () => {
        App.listen(PORT, () => {
            console.log(`API Server Running On PORT: ${PORT}!`);
            console.log(`Use GraphQL At http://localhost:${PORT}/graphql`);
        });
    });
};

// Call Async Function To Start The Server
StartApolloServer();