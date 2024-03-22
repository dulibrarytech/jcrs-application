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

module.exports = {
    host: process.env.HOST,
    appName: process.env.APP_NAME,
    appVersion: process.env.APP_VERSION,
    organization: process.env.ORGANIZATION,
    tokenSecret: process.env.TOKEN_SECRET,
    tokenAlgo: process.env.TOKEN_ALGO,
    tokenExpires: process.env.TOKEN_EXPIRES,
    tokenIssuer: process.env.TOKEN_ISSUER,
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    apiUrl: process.env.API_URL,
    repoEndpoint: process.env.REPO_ENDPOINT,
    repoApiKey: process.env.REPO_API_KEY,
    repoHandleUrl: process.env.REPO_HANDLE_URL,
    repoImagesEndpoint: process.env.REPO_IMAGES_ENDPOINT,
    nodeEnv: process.env.NODE_ENV
};