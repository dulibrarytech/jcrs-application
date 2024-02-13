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

const HTTP = require('axios');
const CONFIG = require('../config/config');
const DB = require('../config/db_config')();
const DB_TABLES = require('../config/db_tables_config')();
const RECORDS = DB_TABLES.jcrs.records;
const LOGGER = require('../libs/log4');

/**
 * Gets record uuids from digital du repository
 * @param callback
 */
exports.get_record_uuids = function (callback) {

    HTTP.get(CONFIG.repoEndpoint, {
        params: {
            sip_uuid: 'a5efb5d1-0484-429c-95a5-15c12ff40ca0',
            type: 'collection',
            api_key: CONFIG.repoApiKey
        }
    })
        .then(function (response) {

            let timer = setInterval(function() {

                if (response.data.length === 0) {
                    console.log('Complete');
                    clearInterval(timer);
                    return false;
                }

                let record = response.data.pop();
                let json = JSON.parse(record.mods);

                if (json === null) {
                    console.log('display record not available');
                    return false;
                }

                let call_number = json.identifiers[0].identifier;

                DB(RECORDS)
                    .where({
                        call_number: call_number
                    })
                    .update({
                        handle: 'http://hdl.handle.net/10176/' + record.sip_uuid
                    })
                    .then(function (data) {

                        if (data === 1) {
                            console.log(call_number + ' updated.');
                        } else {
                            console.log(call_number + ' not in JCRS app.');
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }, 150);

        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
        });

    callback({
        status: 200,
        message: 'Process running...'
    });
};