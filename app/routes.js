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

const CONTROLLER = require('./controller');
const CONFIG = require('../config/config');
const CORS = require('cors');
const ALLOW = [CONFIG.host, 'http://localhost'];
const CORS_OPTIONS = function (req, callback) {

    let cors_options;

    if (ALLOW.indexOf(req.header('Origin')) !== -1) {
        cors_options = {origin: true};
    } else {
        cors_options = {origin: false};
    }

    callback(null, cors_options);
};

module.exports = function (app) {

    /**
     * Renders application home template
     */
    app.route('/jcrs-records')
        .get(CORS(CORS_OPTIONS), CONTROLLER.get_home);

    /**
     * Gets patient records to render on main application template
     */
    app.route('/jcrs-records/api/v1/patients')
        .get(CORS(CORS_OPTIONS), CONTROLLER.get_patient_records);
};
