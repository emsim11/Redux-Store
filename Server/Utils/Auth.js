const { GraphQLError } = require('graphql')
const JWT = require('jsonwebtoken')

const Secret = 'mysecretshhhhhhhh';
const Expiration = '2h';

module.exports = {
    AuthenticationError: new GraphQLError('Could Not Authenticate User', {
        extensions: {
            code: 'UNAUTHENTICATED',
        },
    }),
    AuthMiddleware: function ({ Req }) {
        let Token = Req.body.Token || Req.query.Token || Req.headers.authorization;

        if (Req.headers.authorization) {
            Token = Token
                .split(' ')
                .pop()
                .trim();
        }
        console.log('TOKEN:', Token);

        if (!Token) {
            return Req;
        }

        try {
            const { data } = JWT.verify(Token, Secret, { maxAge: Expiration });
            Req.User = data;
        } catch {
            console.log('Invalid Token');
        }
        return Req;
    },
    SignToken: function ({ FirstName, Email, _Id }) {
        const Payload = { FirstName, Email, _Id };
        return JWT.sign(
            { data: Payload },
            Secret,
            { expiresIn: Expiration }
        );
    }
};