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

const LOGGER = require('../libs/log4');
const VALIDATOR = require('validator');

/**
 * Object contains helper tasks
 * @type {Helper}
 */
const Helper = class {

    constructor() {}

    /**
     * Checks if required env config values are set
     * @param config
     */
    check_config(config) {

        try {

            let obj = {};
            let keys = Object.keys(config);

            keys.map((prop) => {

                if (config[prop].length === 0) {
                    LOGGER.module().error('ERROR: [/config/app_config] ' + prop + ' env is missing config value');
                    return false;
                }

                if (VALIDATOR.isURL(config[prop]) === true) {
                    obj[prop] = encodeURI(config[prop]);
                }

                obj[prop] = VALIDATOR.trim(config[prop]);
            });

            return obj;

        } catch(error) {
            LOGGER.module().error('ERROR: [/libs/helper (check_config)] unable to check config ' + error.message);
            return false;
        }

    }
};

module.exports = Helper;
