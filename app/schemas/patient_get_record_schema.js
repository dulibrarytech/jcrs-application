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

module.exports = () => {

    return {
        id: {type: 'number'},
        handle: {type: 'string'},
        pid: {type: 'number'},
        call_number: {type: 'string'},
        last_name: {type: 'string'},
        first_name: {type: 'string'},
        name_variation: {type: 'string'},
        sex: {type: 'string'},
        age: {type: 'string'},
        date_of_application: {type: 'string'},
        date_of_admission: {type: 'string'},
        date_of_discharge: {type: 'string'},
        date_of_death: {type: 'string'},
        birth_city: {type: 'string'},
        birth_state: {type: 'string'},
        place_of_birth: {type: 'string'},
        arrival_in_us: {type: 'string'},
        occupation: {type: 'string'},
        address_at_time_of_application: {type: 'string'},
        city: {type: 'string'},
        state: {type: 'string'},
        former_address: {type: 'string'},
        former_city: {type: 'string'},
        former_state: {type: 'string'},
        disease_duration: {type: 'string'},
        contracted_city: {type: 'string'},
        contracted_state: {type: 'string'},
        contracted_country: {type: 'string'},
        marital_status: {type: 'string'},
        number_of_children: {type: 'string'},
        ages_of_children: {type: 'string'},
        notes: {type: 'string'},
    };
};