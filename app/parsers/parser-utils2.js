"use strict";

module.exports.extractLinesTable = ($, selector, skip_lines, column_value) => {
    const result = {};
    skip_lines = skip_lines !== undefined ? skip_lines: 1;
    column_value = column_value !== undefined ? column_value : 1;
    $(selector).slice(skip_lines).each( function() {
        const children = $(this).children();
        result[children.eq(0).text()] = parseFloat(children.eq(column_value).text());
    });
    return result;
};