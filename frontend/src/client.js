import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: `${process.env.REACT_APP_PROJECT_ID}`,
    dataset: 'production',
    apiVersion: '2023-06-30',
    useCdn: true,
    ignoreBrowserTokenWarning: true,
    token: `${process.env.REACT_APP_SANITY_CLIENT_TOKEN}`,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);