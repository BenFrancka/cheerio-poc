
import pool from '../utils/pool.js';

export default class MHCrisis {
    id;
    county;
    info;
    
    constructor(row) {
        this.id = row.id;
        this.county = row.county;
        this.info = row.info;
    }

    static async insert({ county, info }) {
        const { rows } = await pool.query(
            `INSERT INTO mh_crisis_lines (county, info)
            VALUES ($1, $2)
            RETURNING *`, [county, info]
        );
        return new MHCrisis(rows[0]);
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM mh_crisis_lines WHERE id=$1', [id]);

            return new MHCrisis(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * from mh_crisis_lines');

        return rows.map((row) => new MHCrisis(row));
    }

    static async updateById(id, { county, info }) {
        const existingService = await MHCrisis.getById(id);
        const newCounty = county ?? existingService.county;
        const newInfo = info ?? existingService.info;

        const { rows } = await pool.query(
            'UPDATE mh_crisis_lines SET county=$1, info=$2 WHERE id=$3 RETURNING *',
            [newCounty, newInfo, id]
            );

        return new MHCrisis(rows[0]);
    }

    static async deleteById(id) {
        const { rows } = await pool.query(
            'DELETE FROM mh_crisis_lines WHERE id=$1 RETURNING *', [id]);

            return new MHCrisis(rows[0]);
    }

};