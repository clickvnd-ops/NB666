/* Offline compatibility shim for the original XR server API. */
(function (g) {
  'use strict';
  function offlineResult(message) {
    if (g.SD) { SD.server_code = 0; SD.server_msg = message || 'OFFLINE'; SD.server_VIP = true; }
  }
  var names = ['XrServer_captcha','XrServer_login','XrServer_Lud','XrServer_Ulg','XrServer_signup',
    'XrServer_Usc','XrServer_Dsc','XrServer_Fgi','XrServer_Gatl','XrServer_Getl','XrServer_Ghtl',
    'XrServer_Grtl','XrServer_Gwtl','XrServer_Ngi','XrServer_TP','XrServer_Wgi','XrServer_ZXLW'];
  names.forEach(function (name) { g[name] = function () { offlineResult('OFFLINE: server function disabled'); }; });
  offlineResult('OFFLINE MODE');
})(window);
