import pool from '../utils/pool.js';

export default class MHCrisis {
    id;
    county;
    info;
    
    constructor(row) {
        this.id = row.id;
        this.county = row.county;;
        this.info = row.info;
    }

    static async insert({ county, info }) {
        const { rows } = await pool.query(
            `INSERT INTO crisis_lines (county, info)
            VALUES ($1, $2)
            RETURNING *`, [county, info]
        );
        return new MHCrisis(rows[0]);
    }
};