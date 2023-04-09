import weaviate from 'weaviate-ts-client';
// import schemaConfig from './schemaConfig.js';

import { readdirSync, readFileSync, writeFileSync } from 'fs';

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
});

// const schemaRes = await client.schema.classCreator().withClass(schemaConfig).do();

const imgFiles = readdirSync('./img');

const promises = imgFiles.map(async (imgFile) => {
    const img = readFileSync(`./img/${imgFile}`);

    const b64 = Buffer.from(img).toString('base64');

    await client.data.creator()
        .withClassName('Meme')
        .withProperties({
            image: b64,
            text: imgFile.split('.')[0].split('-').join(' '), // remove extension and replace underscores with spaces
        })
        .do();
});

await Promise.all(promises);

const test = Buffer.from(readFileSync('./test.jpg')).toString('base64');

const resImage = await client.graphql.get()
    .withClassName('Meme')
    .withFields(['image'])
    .withNearImage({ image:test })
    .withLimit(1)
    .do();

const result = resImage.data.Get.Meme[0].image;
writeFileSync('./result.jpg', Buffer.from(result, 'base64'));

