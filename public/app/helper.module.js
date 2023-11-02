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

const helperModule = (function () {

    'use strict';

    let obj = {};

    /**
     * Renders error message
     * @param message
     */
    obj.renderError = function (message) {
        domModule.html('#message', '<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + DOMPurify.sanitize(message) + '</div>');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return false;
    };

    /**
     * Gets url parameter
     * @param name
     * @param url
     * @returns {*}
    */
    obj.getParameterByName = function (name, url) {

        if (!url) {
            url = window.location.href;
        }

        name = name.replace(/[\[\]]/g, "\\$&");

        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);

        if (!results) {
            return null;
        }

        if (!results[2]) {
            return '';
        }

        return decodeURIComponent(DOMPurify.sanitize(results[2].replace(/\+/g, " ")));
    };

    /**
     * Gets current year
     */
    obj.getCurrentYear = function () {
        let cdate = new Date().getFullYear();
        domModule.html('#cdate', DOMPurify.sanitize(cdate));
    };

    /**
     * Formats date
     */
    obj.format_date = function (date) {

        const date_obj = new Date(date);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = months[date_obj.getMonth()];
        const day = date_obj.getDate() + 1;
        const year = date_obj.getFullYear();

        return `${month} ${day}, ${year}`;
    };

    /**
     * Makes content visible only after it is fully rendered on page
     * @param selector
     * @param timeout
     */
    obj.onLoadVisibility = function (selector, timeout) {

        document.addEventListener("DOMContentLoaded", function() {

            setTimeout(function() {

                if (document.querySelector(selector) !== null) {
                    document.querySelector(selector).style.visibility = 'visible';
                }

            }, timeout);
        });
    };

    obj.init = function () {};

    return obj;

}());

helperModule.init();