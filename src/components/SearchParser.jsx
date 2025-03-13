import React from "react";

const matchesSearch = (item, searchTerm) => {

    let searchFields = [
        item.name,
        item.cardType
    ]

    return searchFields
        .filter(Boolean)
        .some(field => field?.toLowerCase().includes(searchTerm.toLowerCase()));
};

export default matchesSearch