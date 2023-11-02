/**

 Copyright 2023 University of Denver

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 */

'use strict';

const HELPER = require('../../libs/helper');
const LOGGER = require('../../libs/log4');

/**
 * Object contains tasks used to manage exhibit records
 * @param DB
 * @param TABLE
 * @type {Jcrs_record_tasks}
 */
const Jcrs_record_tasks = class {

    constructor(DB, TABLE) {
        this.DB = DB;
        this.TABLE = TABLE;
    }

    /**
     * Gets all records
     */
    async get_records() {

        try {

            return await this.DB(this.TABLE.records)
            .select('*');

        } catch (error) {
            LOGGER.module().error('ERROR: [/app/jcrs_record_tasks (get_records)] unable to get records ' + error.message);
        }
    }

    /**
     * Gets record by id
     * @param id
     */
    async get_record(id) {

        try {

            let data = await this.DB(this.TABLE.records)
            .select('*');

            if (data.length !== 0) {
                return data;
            } else {
                return false;
            }

        } catch (error) {
            LOGGER.module().error('ERROR: [/app/jcrs_record_tasks (get_record)] unable to get records ' + error.message);
        }
    }

    /**
     * Creates record
     * @param data
     */
    async create_record(data) {

        try {

            const result = await this.DB.transaction((trx) => {
                this.DB.insert(data)
                .into(this.TABLE.records)
                .transacting(trx)
                .then(trx.commit)
                .catch(trx.rollback);
            });

            if (result.length !== 1) {
                LOGGER.module().info('INFO: [/app/jcrs_record_tasks (create_record)] Unable to create JCRS record.');
                return false;
            } else {
                LOGGER.module().info('INFO: [/app/jcrs_record_tasks (create_record)] ' + result.length + ' JCRS record created.');
                return true;
            }

        } catch (error) {
            LOGGER.module().error('ERROR: [/app/jcrs_record_tasks (create_record)] unable to create record ' + error.message);
        }
    }

    /**
     * Updates record
     * @param data
     */
    async update_record(data) {

        try {

            await this.DB(this.TABLE.records)
            .where({
                uuid: data.id
            })
            .update(data);

            LOGGER.module().info('INFO: [/app/jcrs_record_tasks (update_record)] JCRS record updated.');
            return true;

        } catch (error) {
            LOGGER.module().error('ERROR: [/app/jcrs_record_tasks (update_record)] unable to update record ' + error.message);
        }
    }

    /**
     * Deletes record
     * @param id
     */
    async delete_record(id) {

        try {

            await this.DB(this.TABLE.records)
            .where({
                id: id
            })
            .update({
                is_deleted: 1
            });

            LOGGER.module().info('INFO: [/app/jcrs_record_tasks (delete_record)] JCRS record deleted.');
            return true;

        } catch (error) {
            LOGGER.module().error('ERROR: [/app/jcrs_record_tasks (delete_record)] unable to delete record ' + error.message);
        }
    }
};

module.exports = Jcrs_record_tasks;
