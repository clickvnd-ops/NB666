/* DHQL offline guard: blocks all remote network access. Local game files remain available. */
(function () {
  'use strict';
  window.DHQL_OFFLINE = true;
  function isRemote(url) { return /^(?:https?:)?\/\//i.test(String(url || '')) || /^wss?:/i.test(String(url || '')); }
  if (window.jQuery && jQuery.ajax) {
    var originalAjax = jQuery.ajax;
    jQuery.ajax = function (options) {
      var url = typeof options === 'string' ? options : options && options.url;
      if (!isRemote(url)) return originalAjax.apply(this, arguments);
      console.warn('[OFFLINE] Blocked remote request:', url);
      var d = jQuery.Deferred();
      if (options && typeof options.error === 'function') options.error(null, 'offline', 'Remote access disabled');
      d.reject(null, 'offline', 'Remote access disabled');
      return d.promise();
    };
  }
  var NativeXHR = window.XMLHttpRequest;
  if (NativeXHR) {
    var nativeOpen = NativeXHR.prototype.open;
    var nativeSend = NativeXHR.prototype.send;
    NativeXHR.prototype.open = function(method, url) {
      this.__dhqlRemoteBlocked = isRemote(url);
      this.__dhqlUrl = url;
      if (this.__dhqlRemoteBlocked) return;
      return nativeOpen.apply(this, arguments);
    };
    NativeXHR.prototype.send = function() {
      if (this.__dhqlRemoteBlocked) {
        console.warn('[OFFLINE] Blocked remote XHR:', this.__dhqlUrl);
        if (typeof this.onerror === 'function') setTimeout(this.onerror.bind(this), 0);
        return;
      }
      return nativeSend.apply(this, arguments);
    };
  }
  window.WebSocket = function () { throw new Error('Remote WebSocket disabled in offline build'); };
})();
