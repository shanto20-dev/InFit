const Validator = require('validator');
const validText = require('./valid_text');

module.exports = function validateOutfitInput(data) {
    let errors = {};

    data.name = validText(data.name) ? data.name : "";

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    if (Validator.isEmpty(data.img_url)) {
        errors.img_url = "An image is required";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    }
}