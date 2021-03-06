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
 | Author: Will Weatherill                                                  |
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

 19 October 2017

*/
var get = require('./repository/get');
var post = require('./repository/post');
var q;

const path = './';

var types = {
  referrals: require(path + 'referrals'),
  discharges: require(path + 'discharge')
};

function getAllByNhsNumber(nhsNum, callback) {
  get.get(nhsNum, types, callback);
}

function postOne(nhsNum, openEhrDocument, host, template, callback) {
  //const templateId = getDocumentHandler(openEhrDocument).getTemplateId();

  post.post.call(q, nhsNum, openEhrDocument, template, host, callback);
}

function getDocumentHandler(openEhrDocument) {
  var document;

  const properties = Object.keys(types);
  var currentDocument;

  for (var p = 0; (p < properties.length && document === undefined); p++) {
    currentDocument = types[properties[p]];

    if (currentDocument.canHandle(openEhrDocument)) {
      document = currentDocument;
    }
  }

  return document;
}

module.exports = {
  init: function () {
    get.init.call(this);
    q = this;
  },
  getAllByNhsNumber: getAllByNhsNumber,
  postOne: postOne
};
