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

    const jcrs_search = 'http://hdl.handle.net/10176/a5efb5d1-0484-429c-95a5-15c12ff40ca0';
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
                url: '/api/v1/patients',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': ''
                }
            });

            if (response !== undefined && response.status === 200) {
                return response.data;
            }

        } catch (error) {
            // TODO: DOM
            console.log('ERROR: ', error.message);
        }
    }

    /**
     * Creates HTML display
     * @param records
     */
    function create_display(records) {

        document.querySelector('#loading-message').innerHTML = 'Loading records...';

        let html = '';
        html += `<thead>
            <tr>
            <th>Patient Information</th>
            </tr>
            </thead><tbody>`;

        for (let i = 0; i < records.length; i++) {

            let repo_handle = '';
            let search_archives = `<a href="${jcrs_search}" target="_blank" title="Jewish Consumptives' Relief Society"><i class="fa fa-search pr-1"></i>&nbsp; Search Digital Archive</a><br>`;
            let patient_name = `<i class="fa fa-user"></i>&nbsp;&nbsp;&nbsp;${records[i].last_name}, ${records[i].first_name}`;
            let patient_id = `Patient ID:  ${records[i].pid}<br>`;
            let name_variation = '';
            let date_of_application = '';
            let sex = `Sex: ${records[i].sex}<br>`;
            let age = `Age: ${records[i].age}<br>`;
            let birth_city = '';
            let birth_state = '';
            let place_of_birth = '';
            let arrival_in_us = '';
            let occupation = '';
            let marital_status = '';
            let number_of_children = '';
            let ages_of_children = '';
            let former_address = '';
            let date_of_admission = '';
            let date_of_discharge = '';
            let date_of_death = '';
            let address_at_time_of_application = '';
            let disease_duration = '';
            let location_where_contracted = '';
            let notes = '';

            if (records[i].handle !== null) {
                let handle = records[i].handle;
                repo_handle = `<a href="${handle}" target="_blank" title="Archived Patient Documents"><i class="fa fa-archive pr-i"></i>&nbsp; Archived Patient Documents</a><br>`;
            }

            if (records[i].name_variation.length > 0) {
                name_variation = `(${records[i].name_variation})`;
            }

            if (records[i].date_of_application.length > 0) {
                let date = helperModule.format_date(records[i].date_of_application);
                date_of_application = `Date of Application: ${date}<br>`;
            }

            if (records[i].birth_city.length > 0) {
                birth_city = `Birth City: ${records[i].birth_city}<br>`;
            }

            if (records[i].birth_state.length > 0) {
                birth_state = `Birth State: ${records[i].birth_state}<br>`;
            }

            if (records[i].place_of_birth.length > 0) {
                place_of_birth = `Place of Birth: ${records[i].place_of_birth}<br>`;
            }

            if (records[i].arrival_in_us.length > 0) {
                arrival_in_us = `Arrival in US: ${records[i].arrival_in_us}<br>`;
            }

            if (records[i].occupation.length > 0) {
                occupation = `Occupation: ${records[i].occupation}<br>`;
            }

            if (records[i].marital_status.length > 0) {
                marital_status = `Marital Status: ${records[i].marital_status}<br>`;
            }

            if (records[i].number_of_children.length > 0) {
                number_of_children = `Number of Children: ${records[i].number_of_children}<br>`;
            }

            if (records[i].ages_of_children.length > 0) {
                ages_of_children = `Ages of Children: ${records[i].ages_of_children}<br>`;
            }

            if (records[i].former_address.length > 0) {

                former_address = `<br>Former Address:<br> ${records[i].address_at_time_of_application}<br>`;

                if (records[i].former_city.length > 0 || records[i].former_state > 0) {
                    former_address += `${records[i].former_city}, ${records[i].former_state}`;
                }
            }

            if (records[i].date_of_admission.length > 0) {
                let date = helperModule.format_date(records[i].date_of_admission);
                date_of_admission = `Date of Admission: ${date}<br>`;

            }

            if (records[i].date_of_discharge.length > 0) {
                let date = helperModule.format_date(records[i].date_of_discharge);
                date_of_discharge = `Date of Discharge: ${date}<br>`;
            }

            if (records[i].date_of_death.length > 0) {
                let date = helperModule.format_date(records[i].date_of_death);
                date_of_death = `Date of Death: ${date}<br>`;
            }

            if (records[i].address_at_time_of_application.length > 0) {

                address_at_time_of_application = `<br>Address at the time of Application:<br> ${records[i].address_at_time_of_application}<br>`;

                if (records[i].city.length > 0 || records[i].state > 0) {
                    address_at_time_of_application += `${records[i].city}, ${records[i].state}<br><br>`;
                }
            }

            if (records[i].disease_duration.length > 0) {
                disease_duration = `Duration of Disease: ${records[i].disease_duration}<br>`;
            }

            if (records[i].contracted_city.length > 0 || records[i].contracted_state.length > 0 || records[i].contracted_country.length > 0) {
                location_where_contracted = `Disease contracted in ${records[i].contracted_city}, ${records[i].contracted_state} ${records[i].contracted_country} <br>`;
            }

            if (records[i].notes !== null && records[i].notes.length > 0) {
                notes = `Notes: ${records[i].notes}<br><hr>`;
            } else {
                notes = 'No notes available<br><hr>';
            }

            html += `<tr style="padding: 50px">
                <td>
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">${patient_name} ${name_variation}</h2>
                        </div>
                    <div class="card-body">
                    <div class="row">
                        <div class="col-sm">
                            <p>
                                ${patient_id}
                                ${sex}
                                ${age}
                                ${occupation}
                                ${birth_city}
                                ${birth_state}
                                ${place_of_birth}
                                ${arrival_in_us}
                                ${marital_status}
                                ${number_of_children}
                                ${ages_of_children}
                                ${former_address}
                            </p>
                        </div>
                        <div class="col-sm">
                            <p>
                                ${date_of_application}
                                ${date_of_admission}
                                ${date_of_discharge}
                                ${date_of_death}
                                ${disease_duration}
                                ${location_where_contracted}
                                ${address_at_time_of_application}
                            </p>
                        </div>
                    <div class="col-sm">
                           ${notes}                 
                           <p>
                           ${repo_handle}
                           </p>
                           <p>
                            ${search_archives}
                           </p>
                    </div>
                    </div>
                    </div>
                </td>
                </tr>`;
        }

        html += `</tbody>`;

        return html;
    }

    /**
     * Renders patient records
     */
    async function render_records() {

        const records = await get_records();
        let html = '';

        if (records.length === 0) {
            html = '<div class="alert alert-info"><strong><i class="fa fa-info-circle"></i>&nbsp; No Records found.</strong></div>';
            domModule.html('#records', html);
            return false;
        }

        html = create_display(records);
        document.querySelector('#patient-records').innerHTML = html;
        // domModule.html('#patient-records', html);

        setTimeout(() => {

            $('#patient-records').DataTable({
                'lengthMenu': [[10, 25, 100, -1], [10, 25, 100, 'All']],
                responsive: true
            });

            hide_loader();

        }, 75);
    };

    obj.init = async function () {
        await render_records();
    };

    return obj;

}());