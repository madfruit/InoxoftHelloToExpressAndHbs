const { constants } = require('../configs');

module.exports = {
    getFilterObject: (filters) => {
        const allowedFilters = constants.ALLOWED_BOOK_FILTERS;

        const filterObject = {};

        Object.keys(filters).forEach((key) => {
            if (key.includes('.lte') || key.includes('.gte')) {
                const keyParts = key.split('.');
                const keyName = keyParts[0];
                const keyGteOrLte = keyParts.pop();
                if (allowedFilters.includes(keyName)) {
                    if (!filterObject[keyName]) {
                        filterObject[keyName] = {};
                    }
                    if (keyGteOrLte === 'lte') {
                        filterObject[keyName].$lte = filters[key];
                    } else {
                        filterObject[keyName].$gte = filters[key];
                    }
                }
            } else if (allowedFilters.includes(key)) {
                filterObject[key] = filters[key];
            }
        });
        return filterObject;
    }
};
