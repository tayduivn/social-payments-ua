import {
  graphiqlExpress,
  graphqlExpress
} from 'apollo-server-express';
import bodyParser from 'body-parser';
import express from 'express';
import { mergeSchemas } from 'graphql-tools';
import { rootSchema } from '../graphql-schemas/root.schema';

const router = express.Router();

const schema = mergeSchemas({
  schemas: [rootSchema]
});

const formatError = (a: any) => {
  console.log('!!!!!!!! it works', a);
};

router.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
router.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

export const graphqlRouter = router;