import React from "react";

const parseSearch = (item, searchTerm) => {
    // Convert search term to lowercase for case-insensitive matching
    searchTerm = searchTerm.toLowerCase();

    // Extracting prefixed search terms (e.g., "id:", "traits:")
    const terms = searchTerm.split(" ");
    const filters = { any: null, id: null, traits: null, slot: null, name: [] };

    terms.forEach(term => {
        const [key, value] = term.split(":");
        if (filters.hasOwnProperty(key)) {
            filters[key] = value;
        } else {
            filters.name.push(term); // Non-prefixed terms are treated as name search
        }
    });

    // Deep search helper function
    const deepSearch = (obj, query) => {
        if (typeof obj === "string") return obj.toLowerCase().includes(query);
        if (Array.isArray(obj)) return obj.some(item => deepSearch(item, query));
        if (obj && typeof obj === "object") return Object.values(obj).some(value => deepSearch(value, query));
        return false;
    };

    // Apply filters
    return (!filters.any || deepSearch(item, filters.any)) &&
           (!filters.id || item.cardIDs.some(cardID => cardID.toLowerCase().includes(filters.id))) &&
           (!filters.traits || item.traits?.some(trait => trait.toLowerCase().includes(filters.traits))) &&
           (!filters.slot || item.slot?.toLowerCase().includes(filters.slot)) &&
           (!filters.name.length || filters.name.every(term => item.name.toLowerCase().includes(term)));
};

export default parseSearch;
