import React from 'react';
import { useDispatch } from 'react-redux';
import Client from 'shopify-buy/index.unoptimized.umd';
import allActions from '../stores/actions';

const client = Client.buildClient({
    domain: 'myconcertdirect.com',
    storefrontAccessToken: 'f42c2d6bc61702ee209977452f672dea'
});

const fetchAllInfo = () => {
    const dispatch = useDispatch();
    dispatch(allActions.clientAction.createClient(client))
   
    const collectionsQuery = client.graphQLClient.query((root) => {
        root.addConnection('collections', {args: {first: 20}}, (collection) => {
            collection.add('title');
            collection.add('description');
            collection.addConnection(
                    'metafields', { args: { first: 249 } }, (metafield) => {
                    metafield.add('key')
                    metafield.add('value')
                    }
                )
        });
    });
    client.graphQLClient.send(collectionsQuery).then(({model, data}) => {
        dispatch(allActions.collectionAction.getCollections(model));
        // const collectionId = model.collections.filter((item) => item.title == 'A Night of LIVE Rock N’ Roll')[0].id;
        // client.collection.fetchWithProducts(collectionId).then((collection) => {
        //     dispatch(allActions.productAction.getConcertProducts(collection.products));
        //   });
    });
    client.product.fetchAll().then((res) => {
        dispatch(allActions.productAction.getProducts(res));
    });
 
}

export default fetchAllInfo