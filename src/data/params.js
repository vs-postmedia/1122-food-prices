const params = {
    appId: 'app',
    categoryId: 'dp-121', // find in the data page of your cloudtables dataset
    clientId: 'food-prices', // unique for each dataset
    cloudTableId: 'a93f4d3e-c57e-11f0-8ff6-671ebea0c98b', // find in embed tab
    // below here probably won’t change 
    tableId: 'cloudtable', // DOM element for the table
    cloudTableDomain: 'vs-postmedia-a.cloudtables.me',
    // should probably have 3-4 servers in the pool...
    serverPool: [
        'vs-postmedia-a.cloudtables.me'
    ],
    // apiKey: 'L0Qx2dDFz0EX2BhyHvzvxt7y' // RW
    apiKey: 'kcZqiHL7MiUCi1waLZYN1vkz' // read-only
};

export default params;