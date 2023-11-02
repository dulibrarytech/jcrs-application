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

const DB = require('../config/db_config')();
const DB_TABLES = require('../config/db_tables_config')();
const TABLES = DB_TABLES;
const JCRS_RECORD_TASKS = require('../app/tasks/jcrs_record_tasks');
const VALIDATOR = require('../libs/validate');
// const INDEXER_MODEL = require('../indexer/model');
const LOGGER = require('../libs/log4');

/**
 * Gets all patient records
 */
exports.get_records = async function () {

    try {

        const TASK = new JCRS_RECORD_TASKS(DB, TABLES.jcrs);

        return {
            status: 200,
            message: 'JCRS records',
            data: await TASK.get_records()
        };

    } catch (error) {
        LOGGER.module().error('ERROR: [/app/model (get_records)] ' + error.message);
        return {
            status: 400,
            message: error.message
        };
    }
};
