import { buildConfig } from 'payload/config';
import path from 'path';
import Categories from './collections/Categories';
import Posts from './collections/Posts';
import Tags from './collections/Tags';
import Users from './collections/Users';
import Media from './collections/Media';

const serverURL = process.env.PAYLOAD_SERVER_URL;
const clientURL = process.env.NEXT_CLIENT_URL;

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
  },
  cors: [serverURL, clientURL].filter(Boolean),
  csrf: [serverURL, clientURL],
  collections: [Categories, Posts, Tags, Users, Media],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
