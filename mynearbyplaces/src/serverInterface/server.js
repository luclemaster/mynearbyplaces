import entries from './entries'
let server = {
    fetchEntries: () => {
        return entries;
    },
    addReview: (review, page) => {
        entries[page].reviews.push(review);
    },
    fetchPropery: (val) => {
        let propList = []
        for (let i = 0; i < entries.length; i++)
        {
            propList.push(entries[i][val]);
        }
        return propList;
    },
    createPage: (new_name, new_address, new_info) => {
        let pageInfo = {
            name: new_name, 
            address: new_address, 
            infoText: new_info,
            reviews: []
        }
        entries.push(pageInfo);
    },
    changeInfo: (name, address, infoText, page) => {
        entries[page].name = name;
        entries[page].address = address;
        entries[page].infoText = infoText;
    },
    deleteIndex: (page) => {
        entries.splice(page,1);
    }
}
export default server