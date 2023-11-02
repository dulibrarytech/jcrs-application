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

const CONFIG = require('../config/config');
const MODEL = require('./model');
const HTTP = require('axios');
const LOGGER = require('../libs/log4');
const CACHE = require('../libs/cache');

exports.get_home = function (req, res) {
    res.renderStatic('jcrs-home', {
        appname: CONFIG.appName,
        appversion: CONFIG.appVersion,
        organization: CONFIG.organization
    });
};

exports.get_patient_records = async function (req, res) {

    let cache = CACHE.get_cache(req);

    if (cache) {
        res.send(cache);
    } else {

        try {
            const data = await MODEL.get_records();
            res.status(data.status).send(data.data);
        } catch (error) {
            res.status(500).send({});
        }

    }
};

/*
exports.get_patient_record = function (req, res) {

    let cache = CACHE.get_cache(req);

    if (cache) {
        res.send(cache);
    } else {

        let id = req.query.id;

        MODEL.get_patient_record(id, function (data) {
            res.status(data.status).send(data.data);
        });
    }
};
*/

/*
exports.get_images = function (req, res) {

    if (req.query.filename === undefined || req.query.filename.length === 0) {
        res.status(400).send({
            message: 'Bad Request.'
        });

        return false;
    }

    let filename = req.query.filename;

    (async () => {

        try {

            let endpoint = CONFIG.repoImagesEndpoint + '?filename=' + filename + '&api_key=' + CONFIG.repoApiKey;
            let response = await HTTP.get(endpoint, {
                timeout: 60000,
                responseType: 'arraybuffer'
            });

            if (response.status === 200) {
                res.set('Content-Type', 'image/jpeg');
                res.end(response.data, 'binary');
            }

            return false;

        } catch (error) {
            LOGGER.module().error('ERROR: [/app/controller module (get_images)] Unable to get image: ' + error);
        }

    })();
};

 */