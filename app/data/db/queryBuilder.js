/**
 * ECHOVERSE
 * A NodeJS Bulletin Board System
 * 
 * By Sam Wilcox
 * Email: sam@echoversebbs.com
 * Website: https://www.echoversebbs.com
 * 
 * Echoverse is released under the GPL v3+ license.
 * For further details, visit:
 * https://license.echoversebbs.com
 */

const UtilHelper = require('../../helpers/utilHelper');

/**
 * Utility class that constructs SQL query statements.
 */
class QueryBuilder {
    /**
     * Create a new instance of QueryBuilder.
     */
    constructor() {
        this._query = '';
        this._values = [];

        this._prefix = '';

        switch (process.env.DATABASE_PROVIDER.toLowerCase()) {
            case 'mysql':
                this._prefix = process.env.MYSQL_TABLE_PREFIX || '';
                break;
            case 'sqlite':
                this._prefix = process.env.SQLITE_TABLE_PREFIX || '';
                break;
            default:
                throw new Error(`Unsupported database type: ${process.env.DATABASE_PROVIDER}`);
        }
    }

    /**
     * Starts a SELECT query.
     * 
     * @param {string|string[]} [columns='*'] - The columns to select (default is '*'). 
     * @returns {QueryBuilder} The QueryBuilder instance to allow for chaining.
     */
    select(columns = '*') {
        this._query += `SELECT ${Array.isArray(columns) ? columns.join(', ') : columns} `;
        return this;
    }

    /**
     * Adds a DISTINCT clause to the query.
     * 
     * @returns {QueryBuilder} The QueryBuilder instance to allow for chaining.
     */
    distinct() {
        this._query = this._query.replace('SELECT', 'SELECT DISTINCT');
        return this;
    }

    /**
     * Specifies the table from which to select data.
     * 
     * @param {string} table - The table to select from.
     * @returns {QueryBuilder} The QueryBuilder instance to allow for chaining.
     */
    from(table) {
        this._query += `FROM ${this._prefix}${table} `;
        return this;
    }

    /**
     * Adds a JOIN clause to the query.
     * 
     * @param {string} type - The type of join (INNER, LEFT, RIGHT, FULL).
     * @param {string} table - The table to join.
     * @param {string} onCondition - The condition for the join (e.g., 'table1.id = table2.id').
     * @returns {QueryBuilder} The QueryBuilder instance to allow for chaining.
     */
    join(type, table, onCondition) {
        this._query += `${type} JOIN ${this._prefix}${table} ON ${onCondition} `;
        return this;
    }

    /**
     * Adds a WHERE clause to the query.
     * 
     * @param {string} condition - The condition (e.g., 'id = ?'). 
     * @param {any|Array<any>} values - The values to substitute for placeholder.
     * @returns {QueryBuilder} The QueryBuilder instance to allow for chaining.
     */
    where(condition, values) {
        this._query += `WHERE ${condition} `;

        if (Array.isArray(values)) {
            this._values.push(...values);
        } else {
            this._values.push(values);
        }

        return this;
    }

    /**
     * Adds an AND condition to the WHERE clause.
     * 
     * @param {string} condition - The condition to add (e.g., 'status = ?').
     * @param {any} value - The value to substitute for placeholder.
     * @returns {QueryBuilder} The QueryBuilder instance to allow for chaining.
     */
    andWhere(condition, value) {
        this._query += `AND ${condition} `;
        this._values.push(value);
        return this;
    }

    /**
     * Adds an OR condition to the WHERE clause.
     * 
     * @param {string} condition - The condition to add (e.g., 'status = ?').
     * @param {any} value - The value to substitute for the placeholder.
     * @returns {QueryBuilder} The QueryBuilder instance to allow for chaining. 
     */
    orWhere(condition, value) {
        this._query += `OR ${condition} `;
        this._values.push(value);
        return this;
    }

    /**
     * Adds just a single "WHERE" clause.
     * 
     * @returns {QueryBuilder} The QueryBuilder instance to allow for chaining.
     */
    onlyWhere() {
        this._query += 'WHERE ';
        return this;
    }

    /**
     * Adds an IN condition to the WHERE clause.
     * 
     * @param {string} column - The column name (e.g., 'status'). 
     * @param {Array<any>} values - The list of values to match against (e.g., [1, 2, 3]).
     * @returns {QueryBuilder} The QueryBuilder instance to allow for chaining. 
     */
    in(column, values) {
        if (!Array.isArray(values) || values.length === 0) {
            throw new Error('The "values" parameter must be a non-empty array');
        }

        this._query += `${column} IN (${values.map(() => '?').join(', ')}) `;
        this._values.push(...values);
        return this;
    }

    /**
     * Adds a BETWEEN condition to the WHERE clause.
     * 
     * @param {string} column - The column to apply the condition to (e.g., 'createdAt').
     * @param {Array<any>} values - The values to use in the range (e.g., ['2020-01-01', '2020-12-01']).
     * @returns {QueryBuilder} The QueryBuilder instance to allow for chaining. 
     */
    between(column, values) {
        if (values.length !== 2) {
            throw new Error('The "values" parameter for BETWEEN must have exactly two elements');
        }

        this._query += `${column} BETWEEN ? and ? `;
        this._values.push(...values);
        return this;
    }

    /**
     * Adds a GROUP BY clause to the query.
     * 
     * @param {string|string[]} columns - The columns to group by.
     * @returns {QueryBuilder} The QueryBuilder instance to allow for chaining. 
     */
    groupBy(columns) {
        this._query += `GROUP BY ${Array.isArray(columns) ? columns.join(', ') : columns} `;
        return this;
    }

    /**
     * Adds a HAVING clause to the query.
     * 
     * @param {string} condition - The condition for the HAVING clause.
     * @param {Array<any>} value - The values to subtitute for placeholders.
     * @returns {QueryBuilder} The QueryBuilder instance to allow for chaining. 
     */
    having(condition, value) {
        this._query += `HAVING ${condition} `;
        this._values.push(value);
        return this;
    }

    /**
     * Adds an ORDER BY clause to the query.
     * 
     * @param {string|string[]} columns - The columns to order by. 
     * @param {string} direction - The sort direction (ASC or DESC).
     * @returns {QueryBuilder} The QueryBuilder instance to allow for chaining. 
     */
    orderBy(columns, direction = 'ASC') {
        if (!Array.isArray(columns)) {
            columns = [columns];
        }

        this._query += `ORDER BY ${columns.join(', ')} ${direction} `;
        return this;
    }

    /**
     * Adds a LIMIT clause to the query.
     * 
     * @param {number} limit - The number of rows to return.
     * @returns {QueryBuilder} The QueryBuilder instance to allow for chaining.  
     */
    limit(limit) {
        this._query += `LIMIT ${limit} `;
        this._values.push(limit);
        return this;
    }

    /**
     * Adds an OFFSET clause to the query.
     * 
     * @param {number} offset - The number of rows to skip before starting to return results.
     * @returns {QueryBuilder} The QueryBuilder instance to allow for chaining.  
     */
    offset(offset) {
        this._query += `OFFSET ? `;
        this._values.push(offset);
        return this;
    }

    /**
     * Adds an INSERT INTO query.
     * 
     * @param {string} table - The table to insert into.
     * @param {string[]} columns - The columns to insert into.
     * @param {Array<any>} values - The values to insert.
     * @returns {QueryBuilder} The QueryBuilder instance to allow for chaining. 
     */
    insertInto(table, columns, values) {
        if (!Array.isArray(values) || values.length === 0) {
            throw new Error('The "values" parameter must be a non-empty array.');
        }

        this._query += `INSERT INTO ${this._prefix}${table} (${columns.join(', ')}) VALUES (${values.map(() => '?').join(', ')}) `;
        this._values = values;
        return this;
    }

    /**
     * Starts an UPDATE query for the specified table.
     * 
     * @param {string} table - The table to update.
     * @returns {QueryBuilder} The QueryBuilder instance to allow for chaining. 
     */
    update(table) {
        this._query += `UPDATE ${this._prefix}${table} SET `;
        return this;
    }

    /**
     * Adds a SET clause for the UPDATE query.
     * 
     * @param {string[]} columns - The columns to update. 
     * @param {Array<any>} values - The values to set in those columns.
     * @returns {QueryBuilder} The QueryBuilder instance to allow for chaining.  
     */
    set(columns, values) {
        if (columns.length !== values.length) {
            throw new Error('Columns and values arrays must have the same length.');
        }

        this._query += columns.map((column, index) => `${column} = ?`).join(', ') + ' ';
        this._values.push(...values);
        return this;
    }

    /**
     * Starts a DELETE query for the specified table.
     * 
     * @param {string} table - The table to delete from.
     * @returns {QueryBuilder} The QueryBuilder instance to allow for chaining. 
     */
    deleteFrom(table) {
        this._query += `DELETE FROM ${this._prefix}${table} `;
        return this;
    }

    /**
     * Adds an ON DUPLICATE KEY UPDATE to the query.
     * 
     * @param {string[]} values - The values to update on duplicate.
     * @returns {QueryBuilder} The QueryBuilder instance to allow for chaining.
     * @throws {Error} When the values array is not of type array.
     */
    onDuplicateKey(values) {
        if (!Array.isArray(values)) {
            throw new Error('values must be an array.');
        }

        this._query += 'ON DUPLICATE KEY UPDATE ';

        values.forEach(value => {
            if (UtilHelper.getIndexInArr(values, value) === values.length - 1) {
                this._query += `${value} = VALUES(${value}); `
            } else {
                this._query += `${value} = VALUES(${value}), `
            }
        });

        return this;
    }

    /**
     * Builds the final query string and returns the query with the values to be substituted.
     * 
     * @returns {Object} An object containing the query string and an array of values.
     */
    build() {
        return {
            query: this._query.trim(),
            values: this._values,
        };
    }

    /**
     * Clears the query string and values.
     */
    clear() {
        this._query = '';
        this._values = [];
        return this;
    }

    /**
     * Get the built query string.
     * 
     * @returns {string} The built query string.
     */
    getQuery() {
        return this._query;
    }

    /**
     * Get the collection of values.
     * 
     * @returns {Array<any>} The values for the query.
     */
    getValues() {
        return this._values;
    }
}

module.exports = QueryBuilder;