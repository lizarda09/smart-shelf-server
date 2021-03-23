//const Product = require('../models/Product');

function calculateDiscount(){
    let dateOfManufacture = "2021-03-20"; //произведено
    let shelfLife = 72; //срок годности
    let today = new Date();
    let arrDateOfManufacture = dateOfManufacture.split('-');
    let dayOfExpiration = +arrDateOfManufacture[2] + (shelfLife/24);
    let dateOfExpiration = new Date(Date.parse(`${+arrDateOfManufacture[0]}-${+arrDateOfManufacture[1]}-${dayOfExpiration + 1}`));
    let diff = Math.round((dateOfExpiration - today)/(1000*60*60*24));
    switch (diff) {
        case 0:
            console.log('скидка 50%');
            break;
        case 1:
            console.log('скидка 30%');
            break;
        case 2:
            console.log('скидка 15%');
            break;
        case 3:
            console.log('скидка 10%');
            break;
    }
}

calculateDiscount();