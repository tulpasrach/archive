
try {
  (function (w, d) {



  var widgetsCfg = {
   "w8LCPNMSyjDKh4eH" : {
      "id" : "w8LCPNMSyjDKh4eH",
      "is_enabled" : true,
      "domain_id" : "ZuPeOg",
      "payload" : {
         "gaClickAction" : "",
         "headLinesCount" : "2",
         "illustrationType" : "standard",
         "gaLoadAction" : "",
         "font" : "arial",
         "descriptionLineHeight" : "",
         "gaShowAction" : "",
         "with_block_title" : "1",
         "cutTextUntilThumbnailBottom" : 0,
         "titleFontSize" : "17px",
         "blockTitleFontSize" : "0.8em;",
         "with_linkless_brand" : 0,
         "gaShowLabel" : "",
         "with_description" : 0,
         "gaClickCategory" : "",
         "gaLoadOnce" : 1,
         "blockTitleFontWeight" : "100",
         "title" : "Смотрите также",
         "blockTitleFontStyle" : "normal",
         "loadPriority" : 200,
         "descriptionFontSize" : "",
         "gaClickOnce" : 0,
         "titleFontWeight" : "400",
         "utm_from" : "",
         "gaClickValueType" : "none",
         "adLabel" : "",
         "view" : "strings",
         "gaLoadCategory" : "",
         "cols" : "3",
         "insertBeforeElemSelect" : "",
         "noAnchorNeeded" : 1,
         "presetName" : "footerStrings",
         "waitForElemTimeout" : 1,
         "rows" : "3",
         "gaShowCategory" : "",
         "descriptionFont" : "arial",
         "gaShowOnce" : 1,
         "currentTestVariant" : null,
         "underHeaderLine" : "1",
         "with_footer" : 0,
         "clickableItem" : "1",
         "gaLoadLabel" : "",
         "descLinesCount" : "5",
         "illustrationSize" : "1",
         "titleFont" : "arial",
         "descriptionFontStyle" : "normal",
         "with_brand" : 1,
         "no_image" : 0,
         "descriptionFontWeight" : "400",
         "titleFontStyle" : "normal",
         "descriptionMarginTop" : "",
         "openInNewTab" : 0,
         "blockTitleFont" : "arial",
         "hasImages" : "1",
         "windowMaxWidth" : "",
         "titleLineHeight" : "",
         "utm_hash_from" : "",
         "theme" : "default",
         "titleMarginTop" : "",
         "widgetType" : "plain",
         "onlyAdsNeeded" : 0,
         "gaClickLabel" : "",
         "blockTitleLineHeight" : "",
         "hasPreloader" : 0,
         "with_title" : "1",
         "advBlocksCount" : 6,
         "responsiveTitleFont" : 0,
         "preserve_rows_quantity" : 0,
         "windowMinWidth" : ""
      },
      "user_id" : "RT1F-3_7usQ5MomM"
   }
}
;
  var widgetKeys = [];

  for (var key in widgetsCfg) {
    widgetKeys[key] = null;
  }

  
  var extConfig = {
   "tns" : {
      "timeout" : 10,
      "type" : "img",
      "src" : "https://www.tns-counter.ru/V13a****adwatch_ru/ru/UTF-8/tmsec=adwatch_cid1004729-posid1136557/114.055636162846"
   },
   "9lo-pQ" : {
      "timeout" : 1000,
      "src" : "https://cm.marketgid.com/i.gif?rurl=https%3A%2F%2Frelap.io%2Fapi%2Fpartners%2Fmgcs.gif%3F_s%3DWlfYFA",
      "type" : "img"
   }
}
;
  


  var optsParam = '';
  var opts;

  try {
    opts = decodeURIComponent(optsParam);
    var tmpElem = d.createElement('div');
    tmpElem.innerHTML = opts;

    opts = JSON.parse(tmpElem.textContent);
  } catch (e) {
    opts = {};
  }

  
  if (opts.restart) {
    delete w.relap;
    delete w.relapStatGathered;
  }

  
  if (w.relap) {
    debugLog("head.js should be one", "warn");
    log('In the End, there can be only one');
    return;
  }

  log('widgetsCfg');
  log(widgetsCfg);
  log('extConfig');
  log(extConfig);

  var targetUrl = 'https://2ch.hk/mlp/res/3534987.html';
  getTargetUrl();

  debugLog(targetUrl, "url");

  var seed = 'lYU4klUBCdiOIn-v8zo';

  var extParamsReady = false;
  var extParams = [];

  var relap = {
    callbackRegistry: {},
    onLoadImages: makeImgQueue(),
    onShowImages: makeImgQueue(),
    gaEventStatus: {}
  };

  w.relap = relap;

  if (!w.relapStatGathered) {
    w.relapStatGathered = true;
    var img = new Image();
    img.src = 'https://relap.io/api/v1/pixel.gif' +
    '?event=hit' +
    '&url=' + encodeURIComponent(w.location.href) +
    '&referrer=' + encodeURIComponent(d.referrer) +
    '&_s=WlfYFA'
    ;
  }

  relap.ar = function(id) {
    

    
    return;

    if (!checkWidgetActive(id) ||
        (widgetsCfg[id].payload.noAnchorNeeded &&
        widgetsCfg[id].payload.insertBeforeElemSelect)) {
      return;
    }

    widgetsQueue.push(id);
  };

  relap.getWidgetCfg = function(id) {
    if (!widgetsCfg[id]) {
      log('relap: wrong anchor id');
      return null;
    }

    return widgetsCfg[id];
  };

  var syncLoader = {
    'queue': [],
    'init': function () {
      var self = this;
      self.queue.push = function (task) {
        Array.prototype.push.apply(self.queue, [task]);
        if (self.queue.length == 1) task();
      }

      self.queue.next = function () {
        self.queue.shift();
        if (self.queue.length > 0) self.queue[0]();
      }
    }
  };
  syncLoader.init();

  var widgetsQueue = (function() {
    var queue = [];

    var processFirstItem = function() {
      if (!queue.length) return;

      var id = queue[0];
      var src = buildSrcString(id);
      log('widgetsQueue next: ' + widgetsCfg[id].payload.widgetType + ', id: ' + id);
      addWidgetScript(id, src);
    };

    var pubObj = {
      queue: queue,
      push: function(widgetId) {
        if (widgetsCfg[widgetId].isQueued) return;

        widgetsCfg[widgetId].isQueued = true;
        queue.push(widgetId);

        if (!extParamsReady || !queue.length) return;

        if (queue.length == 1) {
          processFirstItem();
        }
      },
      next: function() {
        queue.shift();
        if (queue.length) processFirstItem();
      },
      process: function() {
        processFirstItem();
      }
    };

    return pubObj;
  })();

  var extConfigurer = new ExtConfigurer({
    cfg: extConfig,
    callbackRegPath: 'window.relap.callbackRegistry',
    callbackReg: relap.callbackRegistry,
    extParams: extParams,
    complete: function() {
      log('extParamsReady');
      log(extParams);
      extParamsReady = true;
      widgetsQueue.process();
    }
  });

  w.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);
  
  var docReadyState = d.readyState;
  log('document readyState: ' + d.readyState);
  if (docReadyState == 'complete' ||
      docReadyState == 'loaded' ||
      docReadyState == 'interactive') {
    onDOMContentLoaded();
  }

  function getTargetUrl() {
    if (targetUrl) return;

    var relapUrlEl = d.querySelector('meta[name=relap-url]');

    if (relapUrlEl) {
      var relapUrl = relapUrlEl.getAttribute('content');
    }

    if (relapUrl) {
      targetUrl = relapUrl;
      return;
    }

    var canonicalEl = d.querySelector('link[rel=canonical]');

    if (canonicalEl) {
      var canonicalUrl = canonicalEl.getAttribute('href');
    }

    if (canonicalUrl) {
      targetUrl = canonicalUrl;
      return;
    }

    var ogUrlEl = d.querySelector('meta[property=\"og:url\"]');

    if (ogUrlEl) {
      var ogUrl = ogUrlEl.getAttribute('content');
    }

    if (ogUrl) {
      targetUrl = ogUrl;
      return;
    }

    if (w.location.href) {
      targetUrl = w.location.href;
      return;
    }
  }

  function onDOMContentLoaded() {
    var arr = [];

    for (var id in widgetsCfg) {
      var payload = widgetsCfg[id].payload;
      var testVariants = payload.testVariants;
      var currentTestVariant = payload.currentTestVariant;
      
      if (testVariants &&
          currentTestVariant &&
          testVariants[currentTestVariant] &&
          testVariants[currentTestVariant].cfg) {
        mixInPayload(testVariants[currentTestVariant].cfg);
      }
      var widgetType = payload.widgetType;

      switch(widgetType) {
        case 'inset':
          payload.loadPriority = payload.loadPriority || 300;
          break;
        case 'plain':
        case 'side':
          payload.loadPriority = payload.loadPriority || 200;
          break;
        case 'toster':
        default:
          payload.loadPriority = payload.loadPriority || 100;
          break;
      }

      arr.push(widgetsCfg[id]);
    }

    arr.sort(compareByLoadPriority);

    for (var i = 0; i < arr.length; i++) {
      var id = arr[i].id;
      var anchorEl = d.getElementById(id);

      if (!anchorEl && (!widgetsCfg[id].payload.noAnchorNeeded ||
          !widgetsCfg[id].payload.insertBeforeElemSelect) &&
          (widgetsCfg[id].payload.widgetType != 'inset' &&
          widgetsCfg[id].payload.widgetType != 'toster')) {

        debugStatus(id, "warn", "widget_not_required");
        debugEnd(id);
        continue;
      }

      log('widgetsQueue.push: ' + widgetsCfg[id].payload.widgetType + ', id: '+ id);
      widgetsQueue.push(id);
    }

    function compareByLoadPriority(a, b) {
      return b.payload.loadPriority - a.payload.loadPriority;
    }

    function mixInPayload(obj) {
      for (var key in obj) {
        if (!obj.hasOwnProperty(key) || !obj[key]) continue;
        payload[key] = obj[key];
      }
    }
  }

  function checkWidgetActive(id) {
    if (!widgetsCfg[id]) {
      log('relap: wrong anchor id: ' + id);
      return false;
    }

    if (!widgetsCfg[id].is_enabled) {
      return false;
    }

    return true;
  }

  function makeImgQueue() {
    var arr = [];
    arr.queue = function(newArr) {
      for (var i = 0; i < newArr.length; i++) {
        if (!checkIsUnique(newArr[i])) continue;
        arr.push(newArr[i]);
      }

      process();
    };

    return arr;

    function checkIsUnique(imgObj) {
      for (var i = 0; i < arr.length; i++) {
        if (imgObj.src == arr[i].src) return false;
      }

      return true;
    }

    function process() {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].loadComplete || arr[i].loadStarted) continue;
        loadImg(arr[i]);
      }

      function loadImg(imgObj) {
        var timeout = imgObj.timeout || 500;
        imgObj.loadStarted = true;

        var timeoutId = setTimeout(function() {
          imgObj.loadComplete = true;
        }, timeout);

        var img = new Image();
        img.onload = img.onerror = function() {
          log('extStat img loaded/error: ' + imgObj.src);
          clearTimeout(timeoutId);
          imgObj.loadComplete = true;
        };

        img.src = imgObj.src;
      }
    }
  }

  function buildSrcString(id) {
    if (!widgetsCfg[id]) return;

    var payload = widgetsCfg[id].payload;
    payload.anchorId = id;
    payload.seed = seed;
    payload.widget_id = id;

    if (targetUrl) {
      payload.url = targetUrl;
    }

    var URLStart = 'https://relap.io/api/v6/similar_pages.js';
    var src = buildRequestURL(URLStart, payload);
    return src;
  }

  function buildRequestURL(URLStart, payload) {
    var paramStr = [];
    var string = '';

    for (var key in payload) {
      paramStr.push(key + '=' + encodeURIComponent(payload[key]));
    }

    var url = URLStart + '?' + paramStr.join('&');

    if (extParams.length) url += '&' + extParams.join('&');

    return url;
  }

  function addWidgetScript(id, src) {
    log('addWidgetScript: ' + widgetsCfg[id].payload.widgetType + ', id: ' + id);
    positionScript({
      id: id,
      src: src,
      onComplete: function(scriptPosObj, id, src) {
        log('onPositionScriptComplete: ' + widgetsCfg[id].payload.widgetType + ', id: ' + id);
        var anchor = scriptPosObj.anchor;
        var scriptParent = scriptPosObj.scriptParent;
        var insertBeforeElem = scriptPosObj.insertBeforeElem;

        if (!scriptParent) {
          log('no scriptParent for id: ' + id);
          widgetsQueue.next();
          debugStatus(id, "error", "script_parent_not_found");
          debugEnd(id);
          return;
        }

        if (scriptPosObj.forbiddenElemInArticleFound) {
          log('forbidden element in article found for id: ' + id);
          widgetsQueue.next();
          debugStatus(id, "error", "forbidden_elem_in_article_found");
          debugEnd(id);
          return;
        }

        if (scriptPosObj.articleToShort) {
          log('article is too short for id: ' + id);
          widgetsQueue.next();
          debugStatus(id, "error", "article_is_too_short");
          debugEnd(id);
          return;
        }

        if (scriptPosObj.noParagraphsFound) {
          log('no paragraphs found for id: ' + id);
          widgetsQueue.next();
          debugStatus(id, "error", "no_paragraphs_found");
          debugEnd(id);
          return;
        }

        if (scriptPosObj.paragraphIsNotFound) {
          log('paragraph by number is not found for id: ' + id);
          widgetsQueue.next();
          debugStatus(id, "error", "paragraph_by_number_is_not_found");
          debugEnd(id);
          return;
        }

        if (scriptPosObj.noAnchorOrInsertBeforeElemSelect) {
          log('no anchor or insertBeforeElemSelect present for id: ' + id);
          widgetsQueue.next();
          debugStatus(id, "error", "no_anchor_or_insertBeforeElemSelect_present");
          debugEnd(id);
          return;
        }

        var syncTask = function() {
          var script = d.createElement('script');
          script.id = 'relap-sp_' + id;
          script.onload = script.onerror = function() {
            widgetsQueue.next();
            syncLoader.queue.next();
          };
          script.src = src;

          if (insertBeforeElem) {
            log('insertBeforeElem id: ' + id);
            scriptParent.insertBefore(script, insertBeforeElem);
            return;
          }

          if (anchor) {
            log('insert before anchor id: ' + id);
            scriptParent.insertBefore(script, anchor);
            return;
          }

          log('append to body id: ' + id);
          scriptParent.appendChild(script);
        };

        syncLoader.queue.push(syncTask);
      }
    });

    function positionScript(opt) {
      var id = opt.id;
      var src = opt.src;
      var onPositioningComplete = opt.onComplete;

      var positioning = {};
      var scriptParent = d.body;

      var anchor = d.getElementById(id);

      if (anchor) {
        scriptParent = anchor.parentNode;
        positioning.anchor = anchor;
        debugStatus(id, "success", "anchor_script_found");
      }

      positioning.scriptParent = scriptParent;

      var payload = widgetsCfg[id].payload;
      var articleSelect = payload.articleSelect;
      var articleMinHeight = payload.articleMinHeight;
      var paragraphSelect = payload.paragraphSelect;
      var paragraphMinHeight = payload.paragraphMinHeight;
      var insertBeforePercent = payload.insertBeforePercent;
      var forbiddenElemInArticleSelect = payload.forbiddenElemInArticleSelect;
      var waitForElemTimeout = payload.waitForElemTimeout || 1;
      var isPreview = payload.isPreview;

      if (typeof payload.insertBeforeParagraphNum == 'number') {
        var insertBeforeParagraphNum = payload.insertBeforeParagraphNum - 1;
      }

      debugWidget(id, "widget_type", payload.widgetType);
      debugWidget(id, "widget_theme", payload.theme);
      debugWidget(id, "recommendations_requested", payload.cols*payload.rows);

      if (payload.widgetType == 'inset') {
        debugWidget(id, "article_select", payload.articleSelect);
        debugWidget(id, "paragraph_select", payload.paragraphSelect);
        debugWidget(id, "insert_before_percent", payload.insertBeforePercent);
        debugWidget(id, "insert_before_paragraph_num", payload.insertBeforeParagraphNum);
      }

      if (!isPreview &&
          articleSelect &&
          paragraphSelect &&
          (typeof insertBeforePercent == 'number' ||
           typeof insertBeforeParagraphNum == 'number')) {
        waitForElem({
          cssSelect: articleSelect,
          onError: (function(id) {
            return function() {
              debugEnd(id);
            };
          })(id),
          onComplete: (function(positioning) {
            return onArticleElemFound;
          })(positioning),
          timeout: waitForElemTimeout * 1000
        });

        return;
      }

      var widgetType = payload.widgetType;

      if (!isPreview && widgetType == 'inset') {
        positioning.scriptParent = null;
        onPositioningComplete(positioning, id, src)
        return;
      }

      var insertBeforeElemSelect = payload.insertBeforeElemSelect;

      if (!isPreview && insertBeforeElemSelect) {
        waitForElem({
          cssSelect: insertBeforeElemSelect,
          onError: (function(id) {
            return function() {
              debugEnd(id);
            };
          })(id),
          onComplete: (function(positioning) {
            return onInsertBeforeElemFound;
          })(positioning),
          timeout: waitForElemTimeout * 1000
        });

        return;
      }

      if ((widgetType == 'plain' || widgetType == 'side') &&
          !insertBeforeElemSelect && !anchor) {
        positioning.noAnchorOrInsertBeforeElemSelect = true;
      }

      onPositioningComplete(positioning, id, src)


      function waitForElem(opt) {
        var cssSelect = opt.cssSelect;
        var interval = opt.interval || 500;
        var onError = opt.onError;
        var onComplete = opt.onComplete;
        var timeout = opt.timeout || 10000;

        var el;
        intervalFunc();

        if (!el) {
          var intervalId = setInterval(intervalFunc, interval);
        }

        var timeoutId = setTimeout(function() {
          if (el) return;

          log('waitForElem: timed out');
          clearInterval(intervalId);
          onError();
          onComplete(el);
        }, timeout);

        function intervalFunc() {
          el = d.querySelector(cssSelect);

          if (!el) return;

          log('waitForElem: elem found');
          clearInterval(intervalId);
          onComplete(el);
        }
      }

      function onArticleElemFound(articleEl) {
        log('article elem found or timed out, id: ' + id);
        if (!articleEl) {
          positioning.scriptParent = null;
          onPositioningComplete(positioning, id, src)
          return;
        }

        if (forbiddenElemInArticleSelect) {
          var forbiddenElemInArticle = articleEl
            .querySelector(forbiddenElemInArticleSelect);

          if (forbiddenElemInArticle) {
            positioning.forbiddenElemInArticleFound = true;
            onPositioningComplete(positioning, id, src)
            return;
          }
        }

        onImagesComplete({
          imgElems: articleEl.getElementsByTagName('img'),
          onComplete: function() {
            var articleHeight = articleEl.offsetHeight;

            if (articleHeight < articleMinHeight) {
              positioning.articleToShort = true;
            }

            var paragraphs = articleEl.querySelectorAll(paragraphSelect);

            debugWidget(id, "article_height", articleHeight);
            debugWidget(id, "article_min_height", articleMinHeight);
            debugWidget(id, "paragraphs_found", paragraphs.length);

            if (typeof paragraphMinHeight == 'number') {
              var tmpArr = [];

              for (var i = 0; i < paragraphs.length; i++) {
                var paragraphHeight = paragraphs[i].offsetHeight;

                if (paragraphHeight < paragraphMinHeight) continue;

                tmpArr.push(paragraphs[i]);
              }

              paragraphs = tmpArr;
            }

            if (!paragraphs.length) {
              positioning.noParagraphsFound = true;
            }

            var articleElTop = getElemCoords(articleEl).top;

            if (typeof insertBeforePercent == 'number') {
              var widgetApproximateTop = articleHeight *
                insertBeforePercent / 100 + articleElTop;

              for (var i = 0; i < paragraphs.length; i++) {
                var paragraphTop = getElemCoords(paragraphs[i]).top;
                if (paragraphTop >= widgetApproximateTop) {
                  positioning.insertBeforeElem = paragraphs[i];
                  positioning.scriptParent = paragraphs[i].parentNode;
                  break;
                }
              }

              if (!positioning.insertBeforeElem && paragraphs.length) {
                
                positioning.insertBeforeElem = paragraphs[paragraphs.length - 1];
                positioning.scriptParent = paragraphs[paragraphs.length - 1].parentNode;
              }

              if (!positioning.insertBeforeElem && !paragraphs.length) {
                
                positioning.noParagraphsFound = true;
              }
            }

            if (typeof insertBeforeParagraphNum == 'number') {
              if (paragraphs[insertBeforeParagraphNum]) {
                positioning.scriptParent =
                  paragraphs[insertBeforeParagraphNum].parentNode;
                positioning.insertBeforeElem =
                  paragraphs[insertBeforeParagraphNum];
              } else {
                positioning.paragraphIsNotFound = true;
              }
            }

            onPositioningComplete(positioning, id, src)
          }
        });
      }

      function onInsertBeforeElemFound(insertBeforeElem) {
        if (!insertBeforeElem) {
          positioning.scriptParent = null;
          onPositioningComplete(positioning, id, src)
          return;
        }

        positioning.scriptParent = insertBeforeElem.parentNode;
        positioning.insertBeforeElem = insertBeforeElem;
        onPositioningComplete(positioning, id, src)
      }
    }
  }

  function log(message) {
    if (false) w.console.log(message);
  }

  function debugLog(message, prefix_modifier) {
    if (prefix_modifier) {
      prefix_modifier = "--" + prefix_modifier + "--";
    } else {
      prefix_modifier = "";
    }
    log("__relap.io__" + prefix_modifier + message, true);
  }

  function debugEnd(id) {
    delete widgetKeys[id];
    if (getWidgetKeysSize() === 0) debugLog("end");

    function getWidgetKeysSize() {
      var count = 0;
      for (var key in widgetKeys) {
        if (widgetKeys.hasOwnProperty(key)) count++;
      }
      return count;
    }
  }

  function debugWidget(widget_id, key, value) {
    var message = {};
    message[widget_id] = {};
    message[widget_id][key] = value;
    debugLog(JSON.stringify(message));
  }

  function debugStatus(widget_id, status, msg) {
    var message = {};
    message[widget_id] = {status: status, message: msg};
    debugLog(JSON.stringify(message));
  }

  
function ExtConfigurer(opt) {
  var cfg = opt.cfg;
  var callbackRegPath = opt.callbackRegPath;
  var callbackReg = opt.callbackReg;
  var extParams = opt.extParams;
  var onExtConfigurerComplete = opt.complete;

  var params = [];
  var firedAway = false;

  var i = 0;

  for (var key in cfg) {
    var cfgItem = cfg[key];

    switch (cfgItem.type) {
      case 'jsonp':
        scriptRequest({
          url: cfgItem.src,
          callbackParamName: cfgItem.callbackParamName,
          success: makeOnSuccessFunc(key),
          error: makeOnErrorFunc(key),
          complete: makeOnCompleteFunc(key),
          timeout: cfgItem.timeout
        });
        break;
      case 'img':
        loadImg(key);
    }

    i++;
  }

  if (i == 0 && onExtConfigurerComplete) onExtConfigurerComplete();

  function scriptRequest(opt) {
    var url = opt.url || '';
    var callbackParamName = opt.callbackParamName || 'callback';
    var success = opt.success;
    var error = opt.error;
    var complete = opt.complete;
    var timeout = opt.timeout || 500;

    var requestSuccess = false;
    var requestCancelled = false;
    var resp = {};

    var callbackName = 'relapCb' + String(Math.random()).slice(-6);

    url += ~url.indexOf('?') ? '&' : '?';
    url += callbackParamName + '=' + callbackRegPath + '.' + callbackName;
    resp.url = url;

    callbackReg[callbackName] = function(data) {
      delete callbackReg[callbackName];
      requestSuccess = true;

      if (requestCancelled) return;

      resp.data = data;

      if (success) success(resp);
      if (complete) complete(resp);
    };

    var scriptEl = d.createElement('script');

        scriptEl.onreadystatechange = function() {
      if (this.readyState == 'complete' || this.readyState == 'loaded') {
        this.onreadystatechange = null;
                setTimeout(cleanCallback, 0); 
      }
    };

        scriptEl.onload = scriptEl.onerror = cleanCallback;
    scriptEl.id = callbackName;
    scriptEl.src = url;

    var headEl = d.getElementsByTagName('head')[0];
    if (headEl) headEl.appendChild(scriptEl);
    if (!scriptEl.parentNode) fallbackAppend(scriptEl);

    var timeoutId = setTimeout(cancelRequest, timeout);

    function cleanCallback() {
            removeScriptEl();

      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      if (requestSuccess) return;

      delete callbackReg[callbackName];

      if (requestCancelled) return;

      if (error) error(resp);
      if (complete) complete(resp);
    }

    function removeScriptEl() {
      var scriptEl = d.getElementById(callbackName);

      if (scriptEl) {
        scriptEl.parentNode.removeChild(scriptEl);
      }
    }

    function cancelRequest() {
      log('JSONP request cancelled for url: ' + url);
      removeScriptEl();

      timeoutId = null;
      requestCancelled = true;

      if (error) error(resp);
      if (complete) complete(resp);
    }

    function fallbackAppend(scriptEl) {
      log('JSONP fallbackAppend');

      tryToAppend();
      var intervalId = setInterval(tryToAppend, 100);

      function tryToAppend() {
        var divs = d.getElementsByTagName('div');

        for (var i = 0; i < divs.length; i++) {
          divs[i].appendChild(scriptEl);
          if (scriptEl.parentNode) {
            clearInterval(intervalId);
            return;
          }
        }
      }
    }
  }

  function makeOnSuccessFunc(cfgId) {
    return function(resp) {
      if (!resp.data) return;
      log('jsonp success: ' + cfgId);

      var param = {
        'name': 'ext_json_' + cfgId,
        'value': JSON.stringify(resp.data)
      };

      params.push(param);
    };
  }

  function makeOnErrorFunc(cfgId) {
    return function(resp) {
      log('jsonp error: ' + cfgId);
    };
  }

  function makeOnCompleteFunc(cfgId) {
    return function(resp) {
      log('jsonp complete: ' + cfgId);
      cfg[cfgId].loadComplete = true;
      clearTimeout(cfg[cfgId].timeoutId);
      tryToStartWidgetsLoad();
    };
  }

  function loadImg(cfgId) {
    var timeout = cfg[cfgId].timeout || 500;

    var timeoutId = setTimeout(function() {
      cfg[cfgId].loadComplete = true;
      tryToStartWidgetsLoad();
    }, timeout);

    var img = new Image();
    img.onload = img.onerror = function() {
      log('extConfig img loaded/error: ' + cfgId);
      clearTimeout(timeoutId);
      cfg[cfgId].loadComplete = true;
      tryToStartWidgetsLoad();
    };

    img.src = cfg[cfgId].src;
  }

  function tryToStartWidgetsLoad() {
    if (!checkAllRequestsComplete() || firedAway) return;

    firedAway = true;

    for (var i = 0; i < params.length; i++) {
      extParams.push(params[i].name + '=' +
        encodeURIComponent(params[i].value));
    }

    if (onExtConfigurerComplete) onExtConfigurerComplete();

    function checkAllRequestsComplete() {
      for (var key in cfg) {
        if (!cfg[key].loadComplete) {
          return false;
        }
      }

      return true;
    }
  }
}

  
function onImagesComplete(opt) {
  var imgElems = opt.imgElems;
  var onComplete = opt.onComplete;
  var timeout;
  var interval = opt.interval || 500;

  if (opt.timeout && isFinite(opt.timeout)) {
    timeout = opt.timeout;
  }

  var complete = false;

  var intervalId = setInterval(function() {
    if (checkImagesComplete(imgElems)) {
      clearInterval(intervalId);

      if (complete) return;

      complete = true;
      log('onImagesComplete: images loaded');
      onComplete(imgElems);
    }
  }, interval);

  if (timeout) {
    setTimeout(function() {
      if (complete) return;

      log('onImagesComplete: images considered complete because of timeout');
      clearInterval(intervalId);
      onComplete(imgElems);
    }, timeout);
  }

  function checkImagesComplete(imgElems) {
    for (var i = 0; i < imgElems.length; i++) {
      var isComplete = imgElems[i].complete;

      if (!isComplete) {
        return false;
      }
    }

    return true;
  }
}

  
function getElemCoords(elem) {
  var box = elem.getBoundingClientRect();

  var body = d.body;
  var docEl = d.documentElement;

  var scrollTop = w.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = w.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return {
    top: top,
    left: left
  };
}

  
function onFuncReady(opt) {
  var funcName = opt.funcName;
  var args = opt.args;
  var onSuccess = opt.onSuccess;
  var onError = opt.onError;
  var onComplete = opt.onComplete;
  var interval = opt.interval || 500;
  var timeout = opt.timeout || (6 * 1000);

  var complete = false;
  intervalFunc();

  if (!complete) {
    var intervalId = setInterval(intervalFunc, interval);
  }

  var timeoutId = setTimeout(function() {
    if (complete) return;

    log('onFuncReady: timed out, gave up');

    try {
      onError();
      onComplete();
    } catch(e) {
    }
    clearInterval(intervalId);
  }, timeout);

  function intervalFunc() {
    if (checkFuncReady()) {
      clearInterval(intervalId);

      if (complete) return;

      complete = true;
      log('onFuncReady: function is ready');

      try {
        w[funcName].apply(this, args);
        onSuccess();
        onComplete();
      } catch(e) {
      }
    }
  }

  function checkFuncReady() {
    if (!w[funcName]) return false;
    if (typeof w[funcName] !== 'function') return false;

    return true;
  }
}

  
relap.ProtoWidget = ProtoWidget;

function ProtoWidget(opt) {
  var widgetId = opt.widgetId;
  var widgetHTML = opt.widgetHTML;
  var widgetParams = opt.widgetParams;
  var noHandlers = opt.noHandlers;
  var viewPixelSrc = opt.viewPixelSrc;
  var noAnchorNeeded = opt.noAnchorNeeded || false;
  var executeOnWidgetScriptLoad = opt.executeOnWidgetScriptLoad;
  var executeOnWidgetPreloaderShow = opt.executeOnWidgetPreloaderShow;
  var executeOnWidgetReady = opt.executeOnWidgetReady;
  var executeOnWidgetShown = opt.executeOnWidgetShown;
  var executeOnItemClick = opt.executeOnItemClick;
  var pixelSrcStart = opt.pixelSrcStart;
  var pixelClickParamName = opt.pixelClickParamName;
  var pixelSecretSessionParamName = opt.pixelSecretSessionParamName;
  var pixelSecretSessionParam = opt.pixelSecretSessionParam;
  var gaCfg = {
    onLoad: {
      once: widgetParams.gaLoadOnce,
      category: widgetParams.gaLoadCategory,
      action: widgetParams.gaLoadAction,
      label: widgetParams.gaLoadLabel
    },
    onShow: {
      once: widgetParams.gaShowOnce,
      category: widgetParams.gaShowCategory,
      action: widgetParams.gaShowAction,
      label: widgetParams.gaShowLabel
    },
    onClick: {
      once: widgetParams.gaClickOnce,
      category: widgetParams.gaClickCategory,
      action: widgetParams.gaClickAction,
      label: widgetParams.gaClickLabel,
      valueType: widgetParams.gaClickValueType
    }
  };
  
  log('gaCfg');
  log(gaCfg);

  var el;
  var elParent;
  var anchorEl;
  var links;
  var topContainerEl;
  var items;
  var fakeItems;
  var elParentWidth;
  var maxColumnQuantity;
  var scrollHeight;
  var elTop;
  var debouncedOnScrollFunc;
  var debouncedResizeHandler;
  var ellipsizers = [];
  var imgResizers = [];
  var widgetReady = false;

  
  var ROWS;
  var WIDGET_TYPE;
  var RESPONSIVE_TITLE_FONT;
  var HEAD_LINES_COUNT;
  var DESC_LINES_COUNT;
  var CUT_TEXT_UNTIL_THUMBNAIL_BOTTOM;
  var FULL_ITEM_CLICKABLE;
  var PRESERVE_ROWS_QUANTITY;
  var UTM_FROM;
  var UTM_HASH_FROM;
  var TOSTER_SHOW_AT_PERCENT_OF_HEIGHT;
  var FIXED_WIDTH;
  var IS_PREVIEW;
  var HORIZONTAL_ALIGN_EL_SELECT;
  var POSITION;
  var CLIENT_SIDE_CROP;
  

  init();

  function init() {
    ROWS = widgetParams.rows;
    WIDGET_TYPE = widgetParams.widgetType;
    RESPONSIVE_TITLE_FONT = widgetParams.responsiveTitleFont || false;
    HEAD_LINES_COUNT = widgetParams.headLinesCount || 0;
    DESC_LINES_COUNT = widgetParams.descLinesCount || 0;
    CUT_TEXT_UNTIL_THUMBNAIL_BOTTOM = widgetParams.cutTextUntilThumbnailBottom || false
    FULL_ITEM_CLICKABLE = widgetParams.clickableItem || false;
    PRESERVE_ROWS_QUANTITY = widgetParams.preserve_rows_quantity || false;
    UTM_FROM = unescapeHTML(widgetParams.utm_from || '');
    UTM_HASH_FROM = unescapeHTML(widgetParams.utm_hash_from || '');
    FIXED_WIDTH = parseFloat(widgetParams.fixedWidth) || null;
    IS_PREVIEW = widgetParams.isPreview || false;
    HORIZONTAL_ALIGN_EL_SELECT = widgetParams.horizontalAlignElSelect || '';
    POSITION = widgetParams.position || '';
    CLIENT_SIDE_CROP = widgetParams.betaClientSideCrop || false;

    anchorEl = d.getElementById(widgetId);

    if (!anchorEl && !noAnchorNeeded) {
      log('relap: no widget anchor in html is found for widget: ' + widgetId + ', exit');
      return;
    }

    el = d.createElement('div');
    el.innerHTML = widgetHTML;

    debugWidget(widgetId, "recommendations_showed", el.getElementsByClassName("js-relap__item").length);
    debugStatus(widgetId, "success", "widget_showed");
    debugEnd(widgetId);

    if (executeOnWidgetScriptLoad) {
      try {
        executeOnWidgetScriptLoad(widgetId);
      } catch(e) {
      }
    }

    if (FIXED_WIDTH) {
      el.style.width = FIXED_WIDTH + 'px';
    }

    switch(WIDGET_TYPE) {
      case 'toster':
        handlePopupWidget();
        break;
      case 'plain':
      case 'side':
      case 'inset':
        handleInlineWidget();
        break;
    }

    links = el.getElementsByClassName('js-relap__item-link');

    if (!links.length) {
      log('relap: no js-relap__item-link in html is found for widget: ' + widgetId + ', exit');
      return;
    }

    topContainerEl = el.getElementsByClassName('js-relap__top-container')[0];

    if (!topContainerEl) {
      log('relap: no relap__top-container in html is found for widget: ' + widgetId + ', exit');
      return;
    }

    maxColumnQuantity = parseFloat(topContainerEl.getAttribute('data-relap-max-column-quantity'));

    if (WIDGET_TYPE == 'plain' || 
        WIDGET_TYPE == 'side' ||
        WIDGET_TYPE == 'inset') {
      handleBlockScrolledTo(topContainerEl);
    }

    items = el.getElementsByClassName('js-relap__item');
    fakeItems = el.getElementsByClassName('js-relap__fake-item');

    if (UTM_FROM || UTM_HASH_FROM) {
      addUTMToLinks();
    }

    for (var i = 0; i < links.length; i++) {
      if (IS_PREVIEW) {
        links[i].addEventListener('click', previewClickHandler, false);
      } else {
        links[i].addEventListener('mouseup', clickHandler, false);
        links[i].addEventListener('click', clickHandler, false);
        if (links[i].hasAttribute('data-inline-video')) {
          var inlineVideoIframe = links[i].querySelector('iframe');
          if (inlineVideoIframe) {
            /* отправка сообщений ифрейму */
            links[i].addEventListener('mouseenter', function (event) {
              inlineVideoIframe.contentWindow.postMessage('mouseenter', inlineVideoIframe.src);
            }, false);
            links[i].addEventListener('mouseleave', function (event) {
              inlineVideoIframe.contentWindow.postMessage('mouseleave', inlineVideoIframe.src);
            }, false);
            /* включить видео в ифрейме, когда он окажется во viewport */
            function checkIframeInViewport() {
              if (rectsIntersectPercentage(getElementRect(inlineVideoIframe), getPageRect()) >= 0.5) {
                inlineVideoIframe.contentWindow.postMessage('play', inlineVideoIframe.src);
              } else {
                inlineVideoIframe.contentWindow.postMessage('pause', inlineVideoIframe.src);
              }
            }
            /*
                принять сообщение от ифрейма (и начать проверять, нельзя ли начать
                воспроизведение видео).
                в функцию всё завернуто, чтобы сохранить значение links[i] в
                текущей итерации цикла.
            */
            (function (link) {
              window.addEventListener('message', function (event) {
                if (event.data == 'relap_video_ad_iframe_ready') {
                  w.addEventListener('scroll', checkIframeInViewport, false);
                  w.addEventListener('resize', checkIframeInViewport, false);
                  checkIframeInViewport();
                } else if (event.data == 'relap_video_ad_iframe_plays') {
                  /*
                    так как сейчас мы выключаем видео, если перекрытие плеера
                    и окна браузера падает ниже 50%, то не убираем эти листенеры
                  w.removeEventListener('scroll', checkIframeInViewport, false);
                  w.removeEventListener('resize', checkIframeInViewport, false);
                  */
                } else if (event.data == 'click') {
                  /*
                    FIXME :( по-хорошему - надо как-то детектить, что новый таб
                    не открылся и только тогда открывать ссылку в текущем окне.
                  */
                  /*
                    FIXME 2: FF блокирует открытие таба эмуляцией клика при помощи
                    link.click(), поэтому оставляем только октрытие в текущем окне
                  */
                  /*if ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ) {*/
                    /*
                        эмуляция клика на ios работает так, что event handler
                        срабатывает, но открытия ссылки - не происходит.
                        поэтому вызываем хендлер вручную в таком режиме, что он
                        открывает рекламную ссылку в текущем окне.
                    */
                    clickHandler.call(link, { 'fake': true });
                  /*} else {
                    link.click();
                  }*/
                }
              }, false);
            })(links[i]);
            /* дополнительно - добавить проверку в widgetShown; а то ифрейм может
               прислать сообщение о готовности раньше, чем виджет прогрузился
               и занял место на экране */
            var oldExecuteOnWidgetShown = executeOnWidgetShown || function () {};
            executeOnWidgetShown = function (el) {
              checkIframeInViewport();
              oldExecuteOnWidgetShown(el);
            };

          } else {
            log('relap: no iframe found in video ad widget');
          }
        }
      }
    }

    var innerLinks = el.getElementsByClassName('js-relap-extended-offer-inner-link');

    for (var i = 0; i < innerLinks.length; i++) {
      if (IS_PREVIEW) {
        innerLinks[i].addEventListener('click', previewClickHandler, false);
      } else {
        innerLinks[i].addEventListener('click', handleInnerLinkClick, false);
      }
    }

    var logoLink = el.getElementsByClassName('js-relap__logo')[0];

    if (logoLink && IS_PREVIEW) {
      logoLink.addEventListener('click', previewClickHandler, false);
    }

    if (!FIXED_WIDTH) {
      w.addEventListener('resize', resizeHandler, false);
    }

    if (WIDGET_TYPE === 'toster'){
      w.addEventListener('scroll', onWindowScroll, false);
    }

    /*событые очистки handler'ов*/
    d.body.addEventListener('destroyPreview', handleClearHandlers, false);

    initEllipsizers();

    debouncedOnScrollFunc = debounce(onWindowScrollInternal, 250);
    debouncedResizeHandler = debounce(resizeWidget, 250);

    handleOnLoadStatImages();
    prepareWidgetBeforeShow();


    function handlePopupWidget() {
      switch (WIDGET_TYPE) {
        case 'toster':
          el.className = 'relap-' + widgetParams.theme + '__popup-container';

          if (widgetParams.shadow) {
            addClassName(el, 'relap-' + widgetParams.theme + '__with-shadow');
          }

          if (widgetParams.position === 'right') {
            addClassName(el, 'relap-' + widgetParams.theme + '__pos-right');
          }

          if (widgetParams.position === 'left') {
            addClassName(el, 'relap-' + widgetParams.theme + '__pos-left');
          }

          /*навешиваем анимацию*/
          addClassName(el, 'relap-' + widgetParams.theme + '__animate');

          elParent = d.body;
          elParent.appendChild(el);

          TOSTER_SHOW_AT_PERCENT_OF_HEIGHT = widgetParams.showPosPercent ||
            100;
          break;
      }
    }

    function handleInlineWidget() {
      switch (WIDGET_TYPE) {
        case 'plain':
        case 'side':
        case 'inset':
        default:
          el.className = 'relap-' + widgetParams.theme + '-wrapper';
      }

      var similarPagesScript = d.getElementById('relap-sp_' + widgetId);

      if (similarPagesScript) {
        elParent = similarPagesScript.parentNode;
        elParent.insertBefore(el, similarPagesScript);
      } else {
        elParent = anchorEl.parentNode;
        elParent.insertBefore(el, anchorEl);
      }
    }

    function handleOnLoadStatImages() {
      for (var i = 0; i < links.length; i++) {
        var onLoadAttr = links[i].getAttribute('data-onload-images');
        if (!onLoadAttr) continue;

        try {
          onLoadArr = JSON.parse(onLoadAttr);
          w.relap.onLoadImages.queue(onLoadArr);
        } catch(e) {
        }
      }

      sendOnLoadGA();


      function sendOnLoadGA() {
        if (!gaCfg.onLoad.category || !gaCfg.onLoad.action) return;
        if (gaCfg.onLoad.once && w.relap.gaEventStatus.onLoad) return;

        w.relap.gaEventStatus.onLoad = true;

        onFuncReady({
          funcName: 'ga',
          args: ['send', {
            'hitType': 'event',
            'eventCategory': gaCfg.onLoad.category,
            'eventAction': gaCfg.onLoad.action,
            'eventLabel': gaCfg.onLoad.label,
            'hitCallback': function() {
              log('ga onLoad sent success!!!');
            }
          }],
          onError: function() {
            log('ga onLoad failed because func is not found for id: ' + widgetId);
          }
        });
      }
    }

    function prepareWidgetBeforeShow() {
      var preloaderEl;

      if (widgetParams.hasPreloader) {
        preloaderEl = createPreloader();
      }

      hideWidget();

      if (executeOnWidgetPreloaderShow) {
        try {
          executeOnWidgetPreloaderShow(preloaderEl);
        } catch(e) {
        }
      }

      onImagesComplete({
        imgElems: el.getElementsByTagName('img'),
        onComplete: function() {
          showWidget();
          onWidgetReady();
          setTimeout(function() {
            resizeWidget(true);
          }, 500);
          setTimeout(function() {
            resizeWidget(true);
          }, 1000);
        },
        timeout: Infinity
      });

      function createPreloader() {
        var el = d.createElement('div');
        var spinnerEl = d.createElement('span');

        el.className = 'relap-' + widgetParams.theme + '__preloader';
        spinnerEl.className = 'relap-' + widgetParams.theme +
          '__preloader-spinner';

        el.appendChild(spinnerEl);

        return el;
      }

      function hideWidget() {
        el.style.visibility = 'hidden';
        el.style.position = 'absolute';
        el.style.left = '-99999px';

        if (!preloaderEl) return;

        try {
          el.parentNode.insertBefore(preloaderEl, el);
        } catch(e) {
        }
      }

      function showWidget() {
        el.style.visibility = '';
        el.style.position = '';
        el.style.left = '';

        if (!preloaderEl || !preloaderEl.parentNode) return;

        try {
          preloaderEl.parentNode.removeChild(preloaderEl);
        } catch(e) {
        }
      }
    }
  }

  function handleBlockScrolledTo(block) {
    if (!block) return;

    w.addEventListener('scroll', checkBlockScrolledTo, false);
    w.addEventListener('resize', checkBlockScrolledTo, false);
    checkBlockScrolledTo();
  }

  function checkBlockScrolledTo() {
    if (!widgetReady) return;
    if (WIDGET_TYPE == 'toster') return;

    try {
      var recGroup = topContainerEl.getAttribute('data');

      if (!recGroup || !rectsIntersect(getPageRect(), getElementRect(topContainerEl))) return;

      w.removeEventListener('scroll', checkBlockScrolledTo, false);
      w.removeEventListener('resize', checkBlockScrolledTo, false);

      handleWidgetShown();
    } catch(e) { }
  }

  function handleWidgetShown() {
    var recGroup = topContainerEl.getAttribute('data');

    if (!recGroup) return;

    log('widget shown: ' + WIDGET_TYPE + ', id: ' + widgetId);
    topContainerEl.removeAttribute('data');

    for (var i = 0; i < links.length; i++) {
      var onShowAttr = links[i].getAttribute('data-onshow-images');

      try {
        var onShowArr = JSON.parse(onShowAttr);
      } catch(e) {
        onShowArr = [];
      }

      onShowArr.push({
        src: viewPixelSrc,
        timeout: 1000
      });

      w.relap.onShowImages.queue(onShowArr);
    }

    if (executeOnWidgetShown) {
      try {
        executeOnWidgetShown(el);
      } catch(e) {
      }
    }
    sendOnShowGA();

    function sendOnShowGA() {
      if (!gaCfg.onShow.category || !gaCfg.onShow.action) return;
      if (gaCfg.onShow.once && w.relap.gaEventStatus.onShow) return;

      w.relap.gaEventStatus.onShow = true;

      onFuncReady({
        funcName: 'ga',
        args: ['send', {
          'hitType': 'event',
          'eventCategory': gaCfg.onShow.category,
          'eventAction': gaCfg.onShow.action,
          'eventLabel': gaCfg.onShow.label,
          'hitCallback': function() {
            log('ga onShow sent success!!!');
          }
        }],
        onError: function() {
          log('ga onShow failed because func is not found for id: ' + widgetId);
        }
      });
    }
  }

  function getPageRect() {
    var page = d.body;
    var x = getDocScrollLeft();
    var y = getDocScrollTop();
    var width = d.documentElement.clientWidth;
    var height = d.documentElement.clientHeight;
    return [x, y, x+width, y+height];
  }

  function getElementRect(element) {
    var x = 0, y = 0;
    var width = element.offsetWidth, height = element.offsetHeight;
    while (element.offsetParent !== null) {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent;
    }
    return [x, y, x+width, y+height];
  }

  function rectsIntersect(a, b) {
    return a[0] < b[2] && a[2] > b[0] && a[1] < b[3] && a[3] > b[1];
  }

  /* на сколько процентов своей площади первый прямоугольник (small) попадает во второй (big) */
  function rectsIntersectPercentage(small, big) {
    var x_overlap = Math.max(0, Math.min(small[2], big[2]) - Math.max(small[0], big[0]));
    var y_overlap = Math.max(0, Math.min(small[3], big[3]) - Math.max(small[1], big[1]));
    return (x_overlap * y_overlap) / ( (small[2]-small[0]) * (small[3]-small[1]) );
  }

  function previewClickHandler(event) {
    event.preventDefault();
  }

  function clickHandler(event) {
    var self = this;
    var href = this.getAttribute('href');
    var sbrid = this.getAttribute('data');
    var position = this.getAttribute('data-position');
    var eType = event.type;
    var which = event.which;
    var fake  = event.fake;
    var ctrlPushed = event.ctrlKey || event.metaKey;
    var videoSrc = this.getAttribute('data-link-video');
    var seedrSID = this.getAttribute('data-seedr-sid');
    var isTargetBlank = this.getAttribute('target') === '_blank';
    var onClickAttr = this.getAttribute('data-onclick-images');

    if (fake) {
      sendClick(true);
      return;
    }

    switch(eType) {
      case 'mouseup':
        if (which == 2) {
          sendClick();
        }
        break;
      case 'click':
        if (isTargetBlank || ctrlPushed) {
          sendClick();
          break;
        }

        if (which == 1) {
          event.preventDefault();

          if (seedrSID || videoSrc) {
            sendClick();
            createVideoPopup();
          } else {
            sendClick(true);
          }
        }
        break;
    }

    function sendClick(locationChange) {
      if (!href) return;

      if (sbrid) {
        self.removeAttribute('data');
        removeItemSbrid(self);

        if (executeOnItemClick) {
          try {
            executeOnItemClick(self, el);
          } catch(e) {
          }
        }

        sendClickToServer(locationChange);

      } else if (locationChange) {
          w.location = href;
      }

      function removeItemSbrid(link) {
        var parentNode = link.parentNode;

        while (parentNode) {

          if (hasClassName(parentNode, 'js-relap__item') ||
          hasClassName(parentNode, 'js-relap__top-container') ||
          parentNode === d.body) {
            break;
          }

          parentNode = parentNode.parentNode;
        }

        if (!hasClassName(parentNode, 'js-relap__item')) return;

        var links = parentNode.getElementsByClassName('js-relap__item-link');
        for (var i = 0; i < links.length; i++) {
          links[i].removeAttribute('data');
        }

        function hasClassName(el, className) {
          if (!el) return false;
          var elClassName = el.className ? el.className : ' ';
          var classes = elClassName.split(' ');

          for (var i = 0; i < classes.length; i++) {
            if (classes[i] == className) return true;
          }

          return false;
        }
      }

      function sendClickToServer(locationChange) {
        var requestStatus = {
          gaComplete: false,
          imgStatComplete: false
        };

        var params = {};
        params.event = 'click';
        params[pixelClickParamName] = sbrid;
        params.url = href;
        params.referrer = w.location.href;
        params[pixelSecretSessionParamName] = pixelSecretSessionParam;

        var finalize = (function(location, locationShouldBeChanged) {
          return function() {
            if (!requestStatus.gaComplete ||
                !requestStatus.imgStatComplete) {
              return;
            }

            log('all stat on click complete');

            if (locationShouldBeChanged) {
              w.location = location;
            }
          }
        })(href, locationChange);

        sendOnClickGA();

        try {
          var onClickArr = JSON.parse(onClickAttr);
        } catch(e) {
          onClickArr = [];
        }

        onClickArr.push({
          src: buildRequestURL(pixelSrcStart, params),
          timeout: 1000
        });

        loadImages({
          imagesArr: onClickArr,
          onComplete: function() {
            log('images on click complete');
            requestStatus.imgStatComplete = true;
            finalize();
          }
        });

        function sendOnClickGA() {
          var timeoutId;
          var gaObj;

          if (!gaCfg.onClick.category || !gaCfg.onClick.action) {
            requestStatus.gaComplete = true;
            finalize();
            return;
          }

          if (gaCfg.onClick.once && w.relap.gaEventStatus.onClick) {
            requestStatus.gaComplete = true;
            finalize();
            return;
          }

          w.relap.gaEventStatus.onClick = true;

          timeoutId = setTimeout(function() {
            requestStatus.gaComplete = true;
            finalize();
          }, 1000);

          gaObj = {
            'hitType': 'event',
            'eventCategory': gaCfg.onClick.category,
            'eventAction': gaCfg.onClick.action,
            'eventLabel': gaCfg.onClick.label,
            'hitCallback': function() {
              log('ga onClick sent success!!!');
              clearTimeout(timeoutId);
              requestStatus.gaComplete = true;
              finalize();
            }
          };

          if (gaCfg.onClick.valueType === 'position') {
            gaObj.eventValue = position;
          }

          onFuncReady({
            funcName: 'ga',
            args: ['send', gaObj],
            onError: function() {
              log('ga onLoad failed because func is not found for id: ' + widgetId);
            }
          });
        }

        function loadImages(opt) {
          var imagesArr = opt.imagesArr;
          var onComplete = opt.onComplete;
          
          var firedAway = false;

          for (var i = 0; i < imagesArr.length; i++) {
            loadImage(imagesArr[i]);
          }

          function loadImage(item) {
            var timeout = item.timeout || 500;

            var timeoutId = setTimeout(function() {
              log('extStat img completed by timeout: ' + item.src);
              item.loadComplete = true;
              tryToComplete();
            }, timeout);

            var img = new Image();
            img.onload = img.onerror = function() {
              log('extStat img loaded/error: ' + item.src);
              clearTimeout(timeoutId);
              item.loadComplete = true;
              tryToComplete();
            };

            img.src = item.src;
          }

          function tryToComplete() {
            if (!checkAllImagesComplete() || firedAway) return;

            firedAway = true;

            if (onComplete) onComplete();

            function checkAllImagesComplete() {
              for (var i = 0; i < imagesArr.length; i++) {
                if (!imagesArr[i].loadComplete) return false;
              }

              return true;
            }
          }
        }
      }
    }

    function createVideoPopup() {
      var popupEl = d.createElement('div');
      popupEl.className = 'relap-' + widgetParams.theme + '__popup-centered';
      popupEl.innerHTML = '<div class=\"relap-' + widgetParams.theme +
        '__popup-centered__bg js-relap__popup-bg\"></div>' +
      '<div class=\"relap-' + widgetParams.theme + '__popup-centered__content\">' +
        '<div class=\"relap-' + widgetParams.theme + '__popup-centered__content__close-link ' +
        'js-relap__popup-close\"></div>' +
        '<div class=\"relap-' + widgetParams.theme +
          '__popup-centered__content__video-iframe-container' +
          ' js-relap__popup-video-container\">' +
        '</div>' +
      '</div>';

      d.body.appendChild(popupEl);

      popupEl.addEventListener('click', onVideoPopupCloseClick, false);

      if (seedrSID) {
        createSeedrPlayer(seedrSID);
        return;
      }

      if (videoSrc) {
        createVideoIframe(videoSrc);
        return;
      }

      function onVideoPopupCloseClick(e) {
        var target = e.target;

        while (target != this) {
          if (hasClassName(target, 'js-relap__popup-bg') ||
              hasClassName(target, 'js-relap__popup-close')) {
            destroyVideoPopup();
          }

          target = target.parentNode;
        }

        function destroyVideoPopup() {
          popupEl.removeEventListener('click', onVideoPopupCloseClick, false);
          d.body.removeChild(popupEl);
        }
      }

      function createSeedrPlayer(seedrSID) {
        var videoContainerEl = popupEl
          .querySelector('.js-relap__popup-video-container');

        if (!videoContainerEl) return;

        var seedrPlayerContainerEl = d.createElement('div');
        seedrPlayerContainerEl.id = '___seedrPlayerContainer';
        seedrPlayerContainerEl.setAttribute('data-gid', seedrSID);

        videoContainerEl.appendChild(seedrPlayerContainerEl);
        initPlayer();

        function initPlayer() {
          w.seedrPlayer = {
            surl: w.top.location.href
          };

          w.onSeedrPlayerAPIPlay = function() {
            
            var img = new Image();
            img.src = href;
          };

          (function (a, b, c, d, e, f, g, h) {
            g = b.createElement(c);
            g.src = d;
            g.type = "application/javascript";
            g.async = !0;
            h = b.getElementsByTagName(c)[0];
            h.parentNode.insertBefore(g, h);
            a[f] = [];
            a[e] = function () {
              a[f].push(Array.prototype.slice.apply(arguments));
            }
          }) (w, d, "script", (d.location.protocol === "https:" ? "https:" : "http:") + "//seedr.com/js/seedr-player.min.js", "SeedrPlayer", "seedrInit");
        }
      }

      function createVideoIframe(iframeSrc) {
        var videoContainerEl = popupEl
          .querySelector('.js-relap__popup-video-container');

        if (!videoContainerEl) return;

        var iframeEl = d.createElement('iframe');
        iframeEl.src = iframeSrc;
        iframeEl.setAttribute('frameborder', 0);
        iframeEl.setAttribute('webkitallowfullscreen', '');
        iframeEl.setAttribute('mozallowfullscreen', '');
        iframeEl.setAttribute('allowfullscreen', '');
        addClassName(iframeEl, 'relap-' + widgetParams.theme +
          '__popup-centered__content__video-iframe');
        addClassName(iframeEl, 'js-relap__popup-video-iframe');

        videoContainerEl.appendChild(iframeEl);
      }
    }
  }

  function initEllipsizers() {
    if (HEAD_LINES_COUNT || CUT_TEXT_UNTIL_THUMBNAIL_BOTTOM) {
      for (var i = 0; i < items.length; i++) {
        var title = items[i]
          .getElementsByClassName('js-relap__item-title-text')[0];

        if (!title) continue;

        var thumbnail = items[i]
          .getElementsByClassName('js-relap__item-thumbnail')[0];

        var ellipsizerOpts = {
          maxLines: HEAD_LINES_COUNT
        };

        if (CUT_TEXT_UNTIL_THUMBNAIL_BOTTOM && thumbnail) {
          ellipsizerOpts.cutUntilEl = thumbnail;
        }

        if (title.getAttribute('data-ellipsizer-hide-overflowing-items') == 'false') {
          ellipsizerOpts.ellipsizeOverflowingItems = false;
        } else {
          ellipsizerOpts.ellipsizeOverflowingItems = true;
        }

        if (title) {
          ellipsizers.push(new Ellipsizer(title, ellipsizerOpts));
        }
      }
    }

    if (DESC_LINES_COUNT || CUT_TEXT_UNTIL_THUMBNAIL_BOTTOM) {
      for (var i = 0; i < items.length; i++) {
        var descr = items[i]
          .getElementsByClassName('js-relap__item-description')[0];

        if (!descr) continue;

        var thumbnail = items[i]
          .getElementsByClassName('js-relap__item-thumbnail')[0];

        var ellipsizerOpts = {
          maxLines: DESC_LINES_COUNT
        };

        if (CUT_TEXT_UNTIL_THUMBNAIL_BOTTOM && thumbnail) {
          ellipsizerOpts.cutUntilEl = thumbnail;
        }

        if (descr) {
          ellipsizers.push(new Ellipsizer(descr, ellipsizerOpts));
        }
      }
    }
  }

  function unescapeHTML(str) {
    if (!str) return;

    var div = document.createElement('div');
    div.innerHTML = str;
    return div.firstChild.data;
  }

  function addUTMToLinks() {
    var useHash = false;
    var from = UTM_FROM;

    if (UTM_HASH_FROM) {
      useHash = true;
      from = UTM_HASH_FROM;
    }

    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      var appex;

      if (useHash) {
        appex = '#';
      } else {
        appex = '?';

        if (~href.indexOf('?')) {
          appex = '&';
        }
      }

      href += appex + from;
      links[i].setAttribute('href', href);
    }
  }

  function resizeHandler() {
    debouncedResizeHandler();
  }

  function handleClearHandlers(event) {
    if (widgetId !== 'preview') return;

    w.removeEventListener('resize', resizeHandler, false);
    w.removeEventListener('scroll', onWindowScroll, false);
    d.body.removeEventListener('destroyPreview', handleClearHandlers, false);
  }

  function onWidgetReady() {
    widgetReady = true;
    resizeWidget(true);
    initImgResizers();
    resizeWidget(true);

    if (executeOnWidgetReady) {
      try {
        executeOnWidgetReady(el);
      } catch(e) {
      }
    }

    if (WIDGET_TYPE == 'toster') {
      onWindowScroll();
    } else {
      checkBlockScrolledTo();
    }

    function initImgResizers() {
      if (!CLIENT_SIDE_CROP) return;

      var imgElems = el.getElementsByClassName('js-relap__item-thumbnail__img');

      for (var i = 0; i < imgElems.length; i++) {
        imgResizers.push(new ImgResizer({
          img: imgElems[i],
          fullWidth: true
        }));
      }
    }
  }

  function resizeWidget(forced) {
    var windowMinWidth = widgetParams.windowMinWidth;
    var windowMaxWidth = widgetParams.windowMaxWidth;
    var windowWidth = w.innerWidth;
    var shouldBeHidden = false;

    if (!IS_PREVIEW &&
        ((windowMinWidth && windowWidth < windowMinWidth) ||
        (windowMaxWidth && windowWidth > windowMaxWidth))) {
      shouldBeHidden = true;
    }

    if (shouldBeHidden) {
      el.style.display = 'none';
      return;
    } else {
      el.style.display = '';
    }

    elParentNewWidth = elParent.clientWidth;

    if (elParentWidth === elParentNewWidth && !forced) return;

    elParentWidth = elParentNewWidth;

    var rowLength = getRowLength();

    setWidgetWidth();

    if (RESPONSIVE_TITLE_FONT) {
      setFontSize();
    }

    if (FULL_ITEM_CLICKABLE) {
      removeItemMinHeight();
    }

    refreshImgResizers();
    cutTextBlocks();

    if (FULL_ITEM_CLICKABLE) {
      setItemMinHeight();
    }

    if (WIDGET_TYPE == 'toster') {
      alignElHorizontally();
    }

    function setWidgetWidth() {
      var maxColumnQuantity = parseFloat(topContainerEl.getAttribute('data-relap-max-column-quantity'));
      var orphans = 0;
      var fakeItemsNeeded = 0;

      setColumnQuantity(maxColumnQuantity);
      rowLength = getRowLength();
      orphans = items.length % rowLength;

      if (rowLength > maxColumnQuantity) return;

      setColumnQuantity(rowLength);

      if (orphans && !PRESERVE_ROWS_QUANTITY) {
        fakeItemsNeeded = rowLength - orphans;
      }

      hideAllFakeItems();
      showFakeItemsNeeded();

      if (PRESERVE_ROWS_QUANTITY) hideOtherRows();

      function setColumnQuantity(num) {
        topContainerEl.setAttribute('data-column-quantity', num);
        removePreviousClasses();
        addClassName(topContainerEl, 'relap-' + widgetParams.theme + '-column-quantity-' + num);

        function removePreviousClasses() {
          var classes = topContainerEl.className.split(' ');
          var classesToRemove = [];

          for (var i = 0; i < classes.length; i++) {
            if (~classes[i].indexOf('relap-' + widgetParams.theme + '-column-quantity-')) {
              classesToRemove.push(classes[i]);
            }
          }

          for (var i = 0; i < classesToRemove.length; i++) {
            removeClassName(topContainerEl, classesToRemove[i]);
          }
        }
      }

      function hideOtherRows() {
        for (var i = 0; i < items.length; i++) {
          if (i < rowLength * ROWS) continue;
          items[i].style.display = 'none';
        }
      }

      function hideAllFakeItems() {
        for (var i = 0; i < fakeItems.length; i++) {
          fakeItems[i].style.display = 'none';
        }
      }

      function showFakeItemsNeeded() {
        for (var i = 0; i < fakeItemsNeeded; i++) {
          fakeItems[i].style.display = 'inline-block';
        }
      }
    }

    function getRowLength() {
      if (PRESERVE_ROWS_QUANTITY) showAllItems();

      var firstOffsetTop = items[0].getBoundingClientRect().top;

      for (var i = 0; i < items.length; i++) {
        if (firstOffsetTop !=
          items[i].getBoundingClientRect().top) {
          break;
        }
      }

      return i;

      function showAllItems() {
        for (var i = 0; i < items.length; i++) {
          items[i].style.display = '';
        }
      }
    }

    function removeItemMinHeight() {
      for (var i = 0; i < links.length; i++) {
        links[i].style.minHeight = '';
      }
    }

    function setItemMinHeight() {
      var maxHeight = 0;
      var maxHeightArr = [];

      for (var i = 0; i < links.length; i++) {
        if (i && !(i % rowLength)) {
          maxHeightArr.push(maxHeight);
          maxHeight = 0;
        }

        if (links[i].clientHeight > maxHeight) {
          maxHeight = links[i].clientHeight;
        }
      }

      maxHeightArr.push(maxHeight);

      for (var j = 0, rowIndex = 0; j < links.length; j++) {
        var compStyles = getComputedStyle(links[j]);

        if (j && !(j % rowLength)) rowIndex++;

        links[j].style.minHeight = (maxHeightArr[rowIndex]) + 'px';
      }
    }

    function setFontSize() {
      var titleElems = el.getElementsByClassName('js-relap__item-title');
      var parentWidth = titleElems[0].parentNode.clientWidth;
      var fontSize = parseFloat(topContainerEl.getAttribute('data-relap-percent-font-size')) / 100;
      var minFontSizeInPx = parseFloat(topContainerEl.getAttribute('data-relap-px-min-font-size'));

      for (var i = 0; i < titleElems.length; i++) {

        var fontSizeInPx = parentWidth * fontSize;

        if (fontSizeInPx < minFontSizeInPx) {
          fontSizeInPx = minFontSizeInPx;
        }

        titleElems[i].style.fontSize = fontSizeInPx + 'px';
      }
    }

    function alignElHorizontally() {
      if (!HORIZONTAL_ALIGN_EL_SELECT) return;

      var alignEl = d.querySelector(HORIZONTAL_ALIGN_EL_SELECT);
      if (!alignEl) return;

      var alignElCoords = alignEl.getBoundingClientRect();

      switch(POSITION) {
        case 'left':
          el.style.left = alignElCoords.left + 'px';
          break;
        case 'right':
          var windowWidth = d.documentElement.clientWidth;
          el.style.right = windowWidth - alignElCoords.right + 'px';
          break;
      }
    }
  }

  function refreshImgResizers() {
    for (var i = 0; i < imgResizers.length; i++) {
      imgResizers[i].update();
    }
  }

  function cutTextBlocks(){
    for (var i = 0; i < ellipsizers.length; i++) {
      ellipsizers[i].update();
    }
  }

  function onWindowScroll(e) {
    debouncedOnScrollFunc();
  }

  function debounce(func, wait, immediate) {
    var timeoutId;

    return function() {
      var context = this, args = arguments;

      if (timeoutId) {
        return;
      }

      if (immediate) {
        execute();
        return;
      }

      timeoutId = setTimeout(execute, wait);

      function execute() {
        func.apply(context, args);
        timeoutId = null;
      }
    };
  }

  function onWindowScrollInternal(e) {
    scrollTop = getDocScrollTop();

    scrollHeight = getDocScrollHeight();
    var windowHeight = getWindowHeight();
    var scrolledToHeight = scrollTop + windowHeight;
    var showAtHeight = (TOSTER_SHOW_AT_PERCENT_OF_HEIGHT / 100) *
      scrollHeight;

    if (scrolledToHeight >= showAtHeight) {
      showTosterPopup();
      w.removeEventListener('scroll', onWindowScroll, false);
    }
  }

  function showTosterPopup() {
    var tosterCollapsed = false;

    addClassName(el, 'relap-' + widgetParams.theme + '__visible');

    handleWidgetShown();
    refreshImgResizers();
    cutTextBlocks();

    var showHideBtn = el.getElementsByClassName('js-relap__visibility-toggle-btn')[0];
    /*вешаем клик*/
    showHideBtn.addEventListener('click', tosterShowHideHandler, false);

    function tosterShowHideHandler(e){
      var collapsedHeight = showHideBtn.offsetHeight - 10;
      var collapsedBottom = - (el.offsetHeight - collapsedHeight);

      if (tosterCollapsed) {
        /*разворачиваем*/
        el.style.bottom = '';
        tosterCollapsed = false;
        this.removeAttribute('data-collapsed');
      } else {
        /*сворачиваем*/
        el.style.bottom = collapsedBottom + 'px';
        tosterCollapsed = true;
        this.setAttribute('data-collapsed', '');
      }
    }
  }

  function handleInnerLinkClick(e) {
    e.preventDefault();
    e.stopPropagation();
    var innerLink = e.currentTarget;
    var href = innerLink.getAttribute('data-href');
    var target = innerLink.getAttribute('data-target');
    if (target == '_blank') {
      w.open(href);
    } else {
      w.location = href;
    }
  }

  function getDocScrollTop() {
    var html = d.documentElement;
    var body = d.body;
    var scrollTop = html.scrollTop || body && body.scrollTop || 0;
    scrollTop -= html.clientTop;

    return scrollTop;
  }

  function getDocScrollLeft() {
    var html = d.documentElement;
    var body = d.body;
    var scrollLeft = html.scrollLeft || body && body.scrollLeft || 0;

    return scrollLeft;
  }

  function getDocScrollHeight() {
    var scrollHeight = document.documentElement.scrollHeight;
    var clientHeight = document.documentElement.clientHeight;
    scrollHeight = Math.max(scrollHeight, clientHeight);

    return scrollHeight;
  }

  function getWindowHeight() {
    var windowHeight = d.documentElement.clientHeight || 0;

    return windowHeight;
  }

  function addClassName(el, className) {
    var classes = el.className ? el.className.split(' ') : [];

    for (var i = 0; i < classes.length; i++) {
      if (classes[i] == className) return;
    }

    classes.push(className);
    el.className = classes.join(' ');
  }

  function removeClassName(el, className) {
    var classes = el.className.split(' ');

    for (var i = 0; i < classes.length; i++) {
      if (classes[i] == className) classes.splice(i--, 1);
    }
             
    el.className = classes.join(' ');
  }

  function hasClassName(el, className) {
    var classes = el.className.split(' ');

    for (var i = 0; i < classes.length; i++) {
      if (classes[i] == className) return true;
    }

    return false;
  }

  function toggleClassName(el, className) {
    if (hasClassName(el, className)) {
      removeClassName(el, className);
    } else {
      addClassName(el, className);
    }
  }

  
  
function Ellipsizer(el, opt) {
  if (!el) {
    console.warn('ellipsizer: no el given');
    this.update = function() {
      console.warn('ellipsizer: no el to resize');
    };
    return;
  }

  var items = [];
  var ellipsisChar = opt.ellipsisChar || '&hellip;';
  var maxLines = +opt.maxLines || Infinity;
  var cutUntilEl = opt.cutUntilEl;
  var updateOnWindowResize = opt.updateOnWindowResize || false;
  var ellipsizeOverflowingItems;

  if (opt.hasOwnProperty('ellipsizeOverflowingItems')) {
    ellipsizeOverflowingItems = opt.ellipsizeOverflowingItems;
  } else {
    ellipsizeOverflowingItems = false;
  }

  var elRect;
  var cutUntilLine = Infinity;
  var self = this;

  this.update = update;

  init();

  function init() {
    var text = el.innerText || el.textContent || '';
    text = trim(text);
    parseText();
    prepareHTML();
    updateElRect();

    if (updateOnWindowResize) {
      window.addEventListener('resize', self.update, false);
    }

    function trim(text) {
      if (text.trim) {
        return text.trim();
      } else {
        return text.replace(/^\s+|\s+$/gm, '');
      }
    }

    function parseText() {
      var words = text.split(' ');
      extractPunctuationMarks(words);

      function extractPunctuationMarks(words) {
        for (var i = 0; i < words.length; i++) {
          var lastChar = words[i][words[i].length - 1];

          if (checkLastCharIsPunctuationMark(words[i])) {
            items.push({
              text: words[i].slice(0, -1)
            });

            items.push({
              text: lastChar,
              isPunctuationMark: true
            });

            continue;
          } 

          items.push({
            text: words[i]
          });

          if (checkGlyph(words[i])) {
            items[items.length - 1].isGlyph = true;
          }
        }

        function checkLastCharIsPunctuationMark(word) {
          var lastChar = word[word.length - 1];

          if (lastChar == '.' || lastChar == ',' ||
              lastChar == ':' || lastChar == '?' ||
              lastChar == '!') {
            return true;
          }

          
          if (lastChar == ';' && !checkGlyph(word)) return true;

          return false;
        }

        function checkGlyph(word) {
          var lastChar = word[word.length - 1];

          if (lastChar == ';' && ~word.lastIndexOf('&')) {
            return true;
          }

          if (word == '—') {
            return true;
          }

          return false;
        }
      }
    }

    function prepareHTML() {
      for (var i = 0; i < items.length; i++) {
        var span = document.createElement('span');

        var text = items[i].text;

        if (i != 0 && !items[i].isPunctuationMark) {
          text = ' ' + text;
        }

        span.innerHTML = text;
        items[i].el = span;
      }

      var ellipsis = document.createElement('span');
      ellipsis.innerHTML = ellipsisChar;

      items.push({
        text: ellipsisChar,
        el: ellipsis,
        isEllipsis: true
      });

      el.innerHTML = '';

      for (var i = 0; i < items.length; i++) {
        el.appendChild(items[i].el);
      }
    }
  }

  function updateElRect() {
    elRect = el.getBoundingClientRect();
  }

  function checkRectsOverflowed(parentRect, childRect) {
    if (childRect.right > parentRect.right ||
        childRect.left < parentRect.left) {
      return true;
    }

    return false;
  }

  function update() {
    showAllWords();
    updateElRect();
    updateItemsInfo();
    hideExcessiveWords();

    function showAllWords() {
      for (var i = 0; i < items.length; i++) {
        items[i].isOverflowed = false;
        items[i].isNotInParent = false;

        
        if (items[i].isEllipsis) {
          items[i].isHidden = true;
          items[i].el.style.display = 'none';
          continue;
        }

        items[i].isHidden = false;
        items[i].el.style.display = '';
      }
    }

    function updateItemsInfo() {
      var top = 0;
      var line = 0;

      if (cutUntilEl) {
        cutUntilLine = cutUntilEl.getBoundingClientRect().bottom;
      }

      for (var i = 0; i < items.length; i++) {
        var rect = items[i].el.getBoundingClientRect();
        items[i].rect = rect;

        if (rect.top !== top) {
          line++;
          top = rect.top;
        }

        items[i].line = line;

        if (rect.bottom > cutUntilLine) {
          items[i].isOverflowed = true;
        }

        if (checkRectsOverflowed(elRect, items[i].rect)) {
          items[i].isNotInParent = true;
        }
      }
    }

    function hideExcessiveWords() {
      var isAnyWordHidden = false;
      var ellipsis = items[items.length - 1];
      var notInParentStart;

      if (ellipsizeOverflowingItems) {
        for (var i = 0; i < items.length; i++) {
          if (!notInParentStart && items[i].isNotInParent &&
              !items[i].isEllipsis) {
            notInParentStart = i;
          }

          if (i >= notInParentStart) {
            items[i].isHidden = true;
            isAnyWordHidden = true;
          }
        }
      }

      for (var i = items.length - 1; i >= 0; i--) {
        if (items[i].line > maxLines &&
            !items[i].isEllipsis) {
          items[i].isHidden = true;
          isAnyWordHidden = true;
        }

        if (items[i].isOverflowed &&
            !items[i].isEllipsis) {
          items[i].isHidden = true;
          isAnyWordHidden = true;
        }
      }

      if (isAnyWordHidden) {
        ellipsis.isHidden = false;
        ellipsis.el.style.display = '';

        for (var i = items.length - 1; i >= 0; i--) {
          if (items[i].isHidden) {
            items[i].el.style.display = 'none';
          }
        }

        makeSureEllipsisFits();
      }

      function makeSureEllipsisFits() {
        var lastLineTop = getLastLineTop();

        if (!lastLineTop && !cutUntilLine) return;

        var lastVisibleItemIndex = getLastVisibleItemIndex();

        if (!lastVisibleItemIndex) return;

        updateCutUntilLine();
        updateItemInfo(lastVisibleItemIndex);
        updateEllipsisInfo();
        updateElRect();

        while (items[lastVisibleItemIndex].isOverflowed ||
          items[lastVisibleItemIndex].isNotInParent ||
          ellipsis.rect.top > lastLineTop ||
          items[lastVisibleItemIndex].isPunctuationMark ||
          items[lastVisibleItemIndex].isGlyph) {

          items[lastVisibleItemIndex].isHidden = true;
          items[lastVisibleItemIndex].el.style.display = 'none';

          lastLineTop = getLastLineTop();
          lastVisibleItemIndex = getLastVisibleItemIndex();

          if (!lastVisibleItemIndex) break;

          updateCutUntilLine();
          updateItemInfo(lastVisibleItemIndex);
          updateEllipsisInfo();
          updateElRect();
        }

        function updateEllipsisInfo() {
          updateItemInfo(items.length - 1);
        }

        function updateItemInfo(i) {
          items[i].rect = items[i].el.getBoundingClientRect();

          if (items[i].rect.bottom > cutUntilLine) {
            items[i].isOverflowed = true;
          } else {
            items[i].isOverflowed = false;
          }

          if (!items[i].isHidden &&
              checkRectsOverflowed(elRect, items[i].rect)) {
            items[i].isNotInParent = true;
          } else {
            items[i].isNotInParent = false;
          }
        }

        function updateCutUntilLine() {
          if (cutUntilEl) {
            cutUntilLine = cutUntilEl.getBoundingClientRect().bottom;
          }
        }

        function getLastLineTop() {
          for (var i = 0; i < items.length; i++) {
            if (items[i].line == maxLines &&
                !items[i].isHidden) {
              updateItemInfo(i);
              return items[i].rect.top;
            }
          }

          return Infinity;
        }

        function getLastVisibleItemIndex() {
          for (var i = items.length - 1; i >= 0; i--) {
            if (!items[i].isHidden &&
                !items[i].isEllipsis) {
              return i;
            }
          }

          return null;
        }
      }
    }
  }
}

  
function ImgResizer(opt) {
  var img = opt.img;
  var newAR = opt.aspectRatio || 1;
  var fullWidth = opt.fullWidth;
  var oldAR;
  var focusXpercent = opt.focusXpercent || 50;
  var focusYpercent = opt.focusYpercent || 50;

  var self = this;
  var wrapper;

  this.isReady;
  this.init = init;
  this.update = update;

  init();

  function init() {
    getOldAR();

    var intervalId = setInterval(function() {
      if (oldAR) {
        clearInterval(intervalId);
        self.update();
        self.isReady = true;
        return;
      }

      getOldAR();
    }, 50);

    wrapper = document.createElement('span');
    var imgParent = img.parentNode;
    wrapper.className = 'img-resizer-wrapper';
    wrapper.style.overflow = 'hidden';
    wrapper.style.display = 'inline-block';
    wrapper.style.fontSize = 0;
    
    if (fullWidth) wrapper.style.width = '100%';

    imgParent.insertBefore(wrapper, img);
    wrapper.appendChild(img);

    var arWidth = img.getAttribute('data-img-resizer-ar-width');
    var arHeight = img.getAttribute('data-img-resizer-ar-height');

    if (arWidth && arHeight) {
      newAR = arWidth / arHeight;
    }

    function getOldAR() {
      if (img.clientWidth && img.clientHeight) {
        oldAR = img.clientWidth / img.clientHeight;
      }
    }
  }

  function update(opt) {
    if (opt) {
      newAR = opt.aspectRatio;
    }

    if (!oldAR) return;

    dropStyles();

    if (newAR > oldAR) {
      makeWider();
      return;
    }

    if (newAR < oldAR) {
      makeTaller();
      return;
    }

    function dropStyles() {
      img.style.marginLeft = '';
      img.style.marginRight = '';
      img.style.marginTop = '';
      img.style.marginBottom = '';
      img.style.width = '';
    }

    function makeWider() {
      var marginTotal = (1 / oldAR - 1 / newAR) * 100;
      var marginTop = marginTotal * focusXpercent / 100;
      var marginBottom = marginTotal - marginTop;

      img.style.marginLeft = 'auto';
      img.style.marginRight = 'auto';
      img.style.marginTop = -marginTop + '%';
      img.style.marginBottom = -marginBottom + '%';
    }

    function makeTaller() {
      var cssWidth = oldAR / newAR * 100;
      var marginTotal = cssWidth - 100;
      var marginLeft = marginTotal * focusYpercent / 100;
      var marginRight = marginTotal - marginLeft;

      img.style.width = cssWidth + '%';
      img.style.marginLeft = -marginLeft + '%';
      img.style.marginRight = -marginRight + '%';
      img.style.marginTop = 'auto';
      img.style.marginBottom = 'auto';
    }
  }
}

}



  })(window, document);
} catch (e) {
  if (window.console && window.console.log && typeof(window.console.log) == 'function') {window.console.log(e);}
}
