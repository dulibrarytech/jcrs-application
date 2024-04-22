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
const MINIFY = require('html-minifier').minify;
const HTTP = require('axios');
const LOGGER = require('../libs/log4');


exports.get_home = function (req, res) {

    res.renderStatic('jcrs-home', {
        appname: CONFIG.appName,
        appversion: CONFIG.appVersion,
        organization: CONFIG.organization
    });
};

exports.get_patient_records = async function (req, res) {

    try {
        const data = await MODEL.get_records();
        res.status(data.status).send(data.data);
    } catch (error) {
        res.status(500).send({});
    }
};

exports.get_patient_records_ss = async function (req, res) {

    try {
        const data = await MODEL.get_records();
        const html = build_html(data.data);
        res.status(data.status).send(html);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({});
    }
};

/**
 * Constructs HTML table
 * @param records
 * @return {string}
 */
function build_html(records) {

    const jcrs_search = 'http://hdl.handle.net/10176/a5efb5d1-0484-429c-95a5-15c12ff40ca0';
    const number_of_records = records.length;
    let html = '';
    html += `<thead>
            <tr>
            <th>Patient Information</th>
            </tr>
            </thead><tbody>`;

    for (let i = 0; i < number_of_records; i++) {

        let repo_handle = '';
        let search_archives = `<a href="${jcrs_search}" target="_blank" title="Jewish Consumptives' Relief Society"><i class="fa fa-search pr-1"></i>&nbsp; Search Digital Archive</a><br>`;
        let patient_name = `<i class="fa fa-user"></i>&nbsp;&nbsp;&nbsp;${records[i].last_name}, ${records[i].first_name}`;
        let patient_id = `<label style="font-weight: bold; font-size: small;">Patient ID:</label>  ${records[i].pid}<br>`;
        let name_variation = '';
        let date_of_application = '';
        let sex = `<label style="font-weight: bold; font-size: small">Sex:</label> ${records[i].sex}<br>`;
        let age = `<label style="font-weight: bold; font-size: small">Age:</label> ${records[i].age}<br>`;
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
            // let date = helperModule.format_date(records[i].date_of_application);
            let date = records[i].date_of_application;
            date_of_application = `<label style="font-weight: bold; font-size: small">Date of Application:</label> ${date}<br>`;
        }

        if (records[i].birth_city.length > 0) {
            birth_city = `<label style="font-weight: bold; font-size: small">Birth City:</label> ${records[i].birth_city}<br>`;
        }

        if (records[i].birth_state.length > 0) {
            birth_state = `<label style="font-weight: bold; font-size: small">Birth State:</label> ${records[i].birth_state}<br>`;
        }

        if (records[i].place_of_birth.length > 0) {
            place_of_birth = `<label style="font-weight: bold; font-size: small">Place of Birth:</label> ${records[i].place_of_birth}<br>`;
        }

        if (records[i].arrival_in_us.length > 0) {
            arrival_in_us = `<label style="font-weight: bold; font-size: small">Arrival in US:</label> ${records[i].arrival_in_us}<br>`;
        }

        if (records[i].occupation.length > 0) {
            occupation = `<label style="font-weight: bold; font-size: small">Occupation:</label> ${records[i].occupation}<br>`;
        }

        if (records[i].marital_status.length > 0) {
            marital_status = `<label style="font-weight: bold; font-size: small">Marital Status:</label> ${records[i].marital_status}<br>`;
        }

        if (records[i].number_of_children.length > 0) {
            number_of_children = `<label style="font-weight: bold; font-size: small">Number of Children:</label> ${records[i].number_of_children}<br>`;
        }

        if (records[i].ages_of_children.length > 0) {
            ages_of_children = `<label style="font-weight: bold; font-size: small">Ages of Children:</label> ${records[i].ages_of_children}<br>`;
        }

        if (records[i].former_address.length > 0) {

            former_address = `<br><label style="font-weight: bold; font-size: small">Former Address:</label><br> ${records[i].address_at_time_of_application}<br>`;

            if (records[i].former_city.length > 0 || records[i].former_state > 0) {
                former_address += `${records[i].former_city}, ${records[i].former_state}`;
            }
        }

        if (records[i].date_of_admission.length > 0) {
            // let date = helperModule.format_date(records[i].date_of_admission);
            let date = records[i].date_of_admission;
            date_of_admission = `<label style="font-weight: bold; font-size: small">Date of Admission:</label> ${date}<br>`;
        }

        if (records[i].date_of_discharge.length > 0) {
            // let date = helperModule.format_date(records[i].date_of_discharge);
            let date = records[i].date_of_discharge;
            date_of_discharge = `<label style="font-weight: bold; font-size: small">Date of Discharge:</label> ${date}<br>`;
        }

        if (records[i].date_of_death.length > 0) {
            // let date = helperModule.format_date(records[i].date_of_death);
            let date = records[i].date_of_death;
            date_of_death = `<label style="font-weight: bold; font-size: small">Date of Death:</label> ${date}<br>`;
        }

        if (records[i].address_at_time_of_application.length > 0) {

            address_at_time_of_application = `<br><label style="font-weight: bold; font-size: small">Address at the time of Application:</label><br> ${records[i].address_at_time_of_application}<br>`;

            if (records[i].city.length > 0 || records[i].state > 0) {
                address_at_time_of_application += `${records[i].city}, ${records[i].state}<br><br>`;
            }
        }

        if (records[i].disease_duration.length > 0) {
            disease_duration = `<label style="font-weight: bold; font-size: small">Duration of Disease:</label> ${records[i].disease_duration}<br>`;
        }

        if (records[i].contracted_city.length > 0 || records[i].contracted_state.length > 0 || records[i].contracted_country.length > 0) {
            location_where_contracted = `Disease contracted in ${records[i].contracted_city}, ${records[i].contracted_state} ${records[i].contracted_country} <br>`;
        }

        if (records[i].notes !== null && records[i].notes.length > 0) {
            notes = `<label style="font-weight: bold; font-size: small">Notes:</label> ${records[i].notes}<br><hr>`;
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

    return MINIFY(html, {
        removeAttributeQuotes: true,
        collapseWhitespace: true
    });
    //return result; // html.trim();
}