/**
 * Created by eatong on 17-3-23.
 */
const Success = function (data = {}, message = '') {
  return {message, data, success: true};

};
const Failure = function (message = '', data = {}) {
  return {message, data, success: false};
};

module.exports = {Success, Failure};
