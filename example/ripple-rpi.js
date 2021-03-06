/*

 ----------------------------------------------------------------------------
 | qewd-ripple: QEWD-based Middle Tier for Ripple OSI                       |
 |                                                                          |
 | Copyright (c) 2016-17 Ripple Foundation Community Interest Company       |
 | All rights reserved.                                                     |
 |                                                                          |
 | http://rippleosi.org                                                     |
 | Email: code.custodian@rippleosi.org                                      |
 |                                                                          |
 | Author: Rob Tweed, M/Gateway Developments Ltd                            |
 |                                                                          |
 | Licensed under the Apache License, Version 2.0 (the "License");          |
 | you may not use this file except in compliance with the License.         |
 | You may obtain a copy of the License at                                  |
 |                                                                          |
 |     http://www.apache.org/licenses/LICENSE-2.0                           |
 |                                                                          |
 | Unless required by applicable law or agreed to in writing, software      |
 | distributed under the License is distributed on an "AS IS" BASIS,        |
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. |
 | See the License for the specific language governing permissions and      |
 |  limitations under the License.                                          |
 ----------------------------------------------------------------------------

  12 October 2017

*/

var ewdRipple = require('qewd-ripple/lib/startup');

var config = {
  port: 3000,
  poolSize: 2,
  ripple: {
    mode: 'demo'
  },
  database: {
    type: 'redis'
  },
  bodyParser: require('body-parser') // over-rides default setting for limit
};

config.addMiddleware = function(bodyParser, app) {

  app.use(bodyParser.json({limit: '1mb'}));
  app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));

  require('body-parser-xml')(bodyParser);
  app.use(bodyParser.xml({
     limit: '1MB',
     xmlParseOptions: {
        explicitArray: false
     }
  }));
};

ewdRipple.start(config);
