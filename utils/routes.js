/**

 Copyright 2021 University of Denver

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

const CONTROLLER = require('./controller'),
    CONFIG = require('../config/config'),
    CORS = require('cors');

module.exports = function (app) {

    let corsOptions = {
        'origin': CONFIG.corsOrigin,
        'methods': 'GET',
        'preflightContinue': true,
        'optionsSuccessStatus': 204
    };

    /**
     * Gets sip_uuid's from digitaldu repository and matches them up with JCRS call numbers
     */
    app.route('/api/v1/utils/uuids')
        .get(CORS(corsOptions), CONTROLLER.get_record_uuids);
};