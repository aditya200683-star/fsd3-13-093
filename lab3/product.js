const products = [
    { id: 1, name: 'marker', qty: 100, price: 15 },
    { id: 2, name: 'pen', qty: 200, price: 10 },
    
];

let nextId=3;
export const getAllproducts=()=>{
    return products;
};
export const addProduct =( item )=>{
    item.id=nextId;
    nextId++;
    products.push(item);
    return item ;
         
};
export const deleteProduct = (id) => {
    const index = products.findIndex(item => item.id == id);

    if (index === -1) {
        return null;
    }

    return products.splice(index, 1)[0];
};