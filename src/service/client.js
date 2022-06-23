import Client from 'shopify-buy';

const client = Client.buildClient({
    // domain: 'londonrooftop.com',
    // storefrontAccessToken: 'a149ea91a5dedda6f657cb0a263ed268'
    domain: 'myconcertdirect.com',
    storefrontAccessToken: 'f42c2d6bc61702ee209977452f672dea'
});

export default client;