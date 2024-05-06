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

const recordsModule = (function () {

    'use strict';

    let obj = {};

    function hide_loader () {
        document.querySelector('#loading').style.display = 'none';
    }

    /**
     * Gets all patient records
     */
    async function get_records() {

        try {

            let response = await httpModule.req({
                method: 'GET',
                url: '/records/api/v1/patients',
                headers: {
                    'Content-Type': 'text/html',
                    'x-access-token': ''
                }
            });

            if (response !== undefined && response.status === 200) {
                return response.data;
            }

        } catch (error) {
            document.querySelector('#patient-records').innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        }
    }

    async function create_display() {

        try {

            document.querySelector('#loading-message').innerHTML = 'Loading records...';
            const records = await get_records();
            const records_worker = new Worker('/records/static/app/records_worker.js');

            records_worker.onmessage = function (event) {

                document.querySelector('#patient-records').innerHTML = event.data;

                setTimeout(() => {

                    $('#patient-records').DataTable({
                        'lengthMenu': [[10, 25, 100, -1], [10, 25, 100, 'All']],
                        responsive: true
                    });

                    hide_loader();

                }, 0);
            };

            records_worker.postMessage(records);

        } catch (error) {
            document.querySelector('#patient-records').innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        }
    }

    obj.init = async function () {
        await create_display();
    };

    return obj;

}());