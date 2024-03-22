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

const HTTP = require('http'),
    EXPRESS = require('express'),
    COMPRESS = require('compression'),
    BODYPARSER = require('body-parser'),
    METHODOVERRIDE = require('method-override'),
    HELMET = require('helmet'),
    XSS = require('../libs/dom'),
    CACHE = require('../libs/cache'),
    TEMPLATE_CACHE = require('express-template-cache');

module.exports = function() {

    const APP = EXPRESS(),
        SERVER = HTTP.createServer(APP);

    let view_cache = true;

    if (process.env.NODE_ENV === 'development') {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
        view_cache = false;
    } else if (process.env.NODE_ENV === 'production') {
        APP.use(COMPRESS());
    }

    APP.use(BODYPARSER.json());
    APP.use(METHODOVERRIDE());
    APP.use(HELMET());
    APP.use('/jcrs-records/static', EXPRESS.static('./public'));
    APP.use(XSS.sanitize_req_query);
    APP.use(XSS.sanitize_req_body);
    APP.set('views', './views');
    APP.set('view engine', 'ejs');
    APP.set('view cache', view_cache);

    require('../app/routes.js')(APP);
    require('../utils/routes.js')(APP);

    APP.get('*', function(req, res){
        res.status(404).send('Resource Not Found');
    });

    CACHE.clear_cache();
    SERVER.listen(process.env.APP_PORT);

    return APP;
};