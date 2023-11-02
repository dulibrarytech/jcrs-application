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

module.exports = function (app) {

    const CORSOPTIONS = {
        'origin': CONFIG.corsOrigin,
        'methods': 'GET',
        'preflightContinue': true,
        'optionsSuccessStatus': 204
    };

    /**
     * Renders application home template
     */
    app.route('/')
        .get(CONTROLLER.get_home);

    /** TODO: check token
     * Gets patient records to render on main application template
     */
    app.route('/api/v1/patients')
        .get(CORS(CORSOPTIONS), CONTROLLER.get_patient_records);

    /**
     * Gets patient record details by id
     * @param id
     */
    /*
    app.route('/api/v1/patient')
        .get(CORS(CORSOPTIONS), CONTROLLER.get_patient_record);
    */

    /**
     * Gets patient images (scanned documents) from digitaldu repository image service
     */
    /*
    app.route('/api/v1/images')
        .get(CORS(CORSOPTIONS), CONTROLLER.get_images);
    */
};
