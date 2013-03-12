/**
 * jquery.tutor.js
 * Copyright (c) 2013 Crocos Inc., All rights reserved.
 *
 * @author Keisuke SATO <sato@crocos.co.jp>
 * @license BSD License
 */

;(function($) {

  'use strict';

  var tutor = function(options) {
    var steps = []
      , options = $.extend({
          steps: []
        }, options ? options : {})
      , createOverlay = function($target, offset) {
          var $body = $('body')
            , targetWidth = $target.outerWidth()
            , targetHeight = $target.outerHeight()
            , pageWidth = $body.outerWidth()
            , pageHeight = $body.outerHeight()
            , borderTop = offset.top
            , borderRight = pageWidth - targetWidth - offset.left
            , borderBottom = pageHeight - targetHeight - offset.top
            , borderLeft = offset.left
            , borderWidth = $.map([borderTop, borderRight, borderBottom, borderLeft], function(n, i) {
                return (n < 0 ? 0 : n) + 'px';
              });

          return $('<div />').addClass('tutor-overlay').css({
            width: targetWidth,
            height: targetHeight,
            borderWidth: borderWidth.join(' ')
          });
        }
      , createMessage = function(message) {
          var $el = $('<div />').addClass('tutor-message');

          $el
            .append($('<div />').addClass('tutor-message-header'))
            .append($('<div />').addClass('tutor-message-body').append($('<p />').text(message)))
            .append($('<div />').addClass('tutor-message-footer').append($('<button />').addClass('tutor-message-btn-next').text('Next')));

          return $el;
        }
      , doStep = function(steps, i) {
          if (steps[i] && $.isFunction(steps[i])) {
            steps[i].apply(null, []).done(function() {
              doStep(steps, i + 1);
            });
          }
        };

    $.each(options.steps, function(i, def) {
      if ($.isFunction(def)) {
        steps[steps.length] = function() {
          var dfd = $.Deferred()
            , response = def.apply(null, [dfd]);

          if (response && $.isFunction(response.promise)) {
            dfd = response;
          } else {
            setTimeout(function() {
              dfd.resolve();
            }, 0);
          }

          return dfd.promise();
        };
      } else {
        steps[steps.length] = function() {
          var dfd = $.Deferred()
            , $body = $('body')
            , $target
            , $message
            , $overlay
            , targetOffset;

          if ($.isPlainObject(def) && def['target'] && def['message']) {
            $target = $(def.target);
            targetOffset = $target.offset();
            $message = createMessage(def['message']);
            $overlay = createOverlay($target, targetOffset);

            $body.animate({scrollTop: targetOffset.top > 50 ? targetOffset.top -50 : 0});
            $overlay.appendTo($body).show();
            $message.appendTo($body).css({
              top: targetOffset.top + $target.height() + 50,
              left: targetOffset.left
            }).fadeIn(100);

            $message.on('click', '.tutor-message-btn-next', function() {
              $message.fadeOut(100, function() {
                $overlay.remove();
                $message.remove();
                dfd.resolve();
              });
            });
          }

          return dfd.promise();
        };
      }
    });

    doStep(steps, 0);
  };

  // register plugin
  $.tutor = tutor;

}(jQuery));

