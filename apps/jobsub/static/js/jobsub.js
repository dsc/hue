// Licensed to Cloudera, Inc. under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  Cloudera, Inc. licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


//// Helper methods
var format = (function(){
  // Date.format follows python datetime formatting.
  // @see http://docs.python.org/2/library/datetime.html#strftime-and-strptime-behavior
  var WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                  'Thursday', 'Friday', 'Saturday'];
  var MONTH = ['January', 'February', 'March', 'April',
               'May', 'June', 'July', 'August',
               'September', 'October', 'November', 'December'];
  return function(format) {
    var self = this;

    // 'esc' declares whether or not we found an escape character.
    var esc = false;
    var str = '';
    for (var i = 0; i < format.length; ++i) {
      if (esc) {
        // Escape character followed by these characters
        // is a formatting option.
        switch(format[i]) {
          case 'a':
            str += WEEKDAYS[self.getDay()].substring(0,3);
          break;
          case 'A':
            str += WEEKDAYS[self.getDay()];
          break;
          case 'b':
            str += MONTH[self.getMonth()].substring(0,3);
          break;
          case 'B':
            str += MONTH[self.getMonth()];
          break;
          case 'c':
            str += self.toLocaleString();
          break;
          case 'd':
            var tmp = '00' + self.getDate();
            str += tmp.substring(tmp.length - 2, tmp.length);
          break;
          case 'f':
            // TODO: Microsecond as a decimal number [0,999999], zero-padded on the left
          break;
          case 'H':
            var tmp = '00' + self.getHours();
            str += tmp.substring(tmp.length - 2, tmp.length);
          break;
          case 'I':
            var hour = self.getHours() % 12;
            var tmp = '00' + ((hour == 0) ? '12' : hour);
            str += tmp.substring(tmp.length - 2, tmp.length);
          break;
          case 'j':
            // TODO: Day of the year as a decimal number [001,366].
          break;
          case 'm':
            var tmp = '00' + (self.getMonth() + 1);
            str += tmp.substring(tmp.length - 2, tmp.length);
          case 'M':
            var tmp = '00' + self.getMinutes();
            str += tmp.substring(tmp.length - 2, tmp.length);
          break;
          case 'p':
            str += (self.getHours() > 11) ? 'PM' : 'AM';
          break;
          case 'S':
            var tmp = '00' + self.getSeconds();
            str += tmp.substring(tmp.length - 2, tmp.length);
          break;
          case 'U':
            // TODO: Week number of the year [0,53]. Sunday starts.
          break;
          case 'w':
            str += self.getDay();
          break;
          case 'W':
            // TODO: Week number of the year [0,53]. Monday starts.
          break;
          case 'x':
            str += self.toLocaleDateString();
          break;
          case 'X':
            str += self.toLocaleTimeString();
          break;
          case 'y':
            str += self.getFullYear() % 100;
          break;
          case 'Y':
            str += self.getFullYear();
          break;
          case 'z':
            // TODO: UTC offset in the form +HHMM or -HHMM (empty string if the the object is naive)
          break;
          case 'Z':
            // Time zone name (empty string if the object is naive).
          break;
          case '%':
            str += '%'
          break
          default:
            // Bad escape.
            str += '%' + format[i];
          break;
        }
        esc = false;
      } else {
        switch(format[i]) {
          case '%':
            esc = true;
          break;
          default:
            str += format[i];
          break;
        }
      }
    }

    return str;
  };
})();
Date.prototype.format = format;

function showSection(section) {
  $('.section').hide();
  $('#' + section).show();
  $(window).scrollTop(0);

  // Filechooser.
  $(".pathChooserKo").each(function(){
    var self = $(this);
    self.after(getFileBrowseButton(self));
  });
}

function getFileBrowseButton(inputElement) {
  return $("<button>").addClass("btn").addClass("fileChooserBtn").text("..").click(function(e){
    e.preventDefault();
    $("#fileChooserModal").jHueFileChooser({
      initialPath: inputElement.val(),
      onFileChoose: function(filePath) {
        inputElement.val(filePath);
        inputElement.change();
        $("#chooseFile").modal("hide");
      },
      createFolder: false
    });
    $("#chooseFile").modal("show");
  })
}

function addFileBrowseButton() {
  // Filechooser.
  $(".pathChooserKo").each(function(){
    var self = $(this);
    if (!self.siblings().hasClass('fileChooserBtn')) {
      self.after(getFileBrowseButton(self));
    }
  });
}

//// Event handling.
$(document).bind('add.file.workflow', addFileBrowseButton);
$(document).bind('remove.file.workflow', addFileBrowseButton);
$(document).bind('add.property.workflow', addFileBrowseButton);
$(document).bind('remove.property.workflow', addFileBrowseButton);
$(document).bind('add.archive.workflow', addFileBrowseButton);
$(document).bind('remove.archive.workflow', addFileBrowseButton);
$(document).bind('add.arg.workflow', addFileBrowseButton);
$(document).bind('add.argument.workflow', addFileBrowseButton);
$(document).bind('add.envvar.workflow', addFileBrowseButton);
$(document).bind('add.param.workflow', addFileBrowseButton);
$(document).bind('remove.param.workflow', addFileBrowseButton);
$(document).bind('add.prepare_delete.workflow', addFileBrowseButton);
$(document).bind('add.prepare_mkdir.workflow', addFileBrowseButton);
$(document).bind('remove.prepare.workflow', addFileBrowseButton);
$(document).bind('add.delete.workflow', addFileBrowseButton);
$(document).bind('remove.delete.workflow', addFileBrowseButton);
$(document).bind('add.mkdir.workflow', addFileBrowseButton);
$(document).bind('remove.mkdir.workflow', addFileBrowseButton);
$(document).bind('add.chmod.workflow', addFileBrowseButton);
$(document).bind('remove.chmod.workflow', addFileBrowseButton);
$(document).bind('add.move.workflow', addFileBrowseButton);
$(document).bind('remove.move.workflow', addFileBrowseButton);
$(document).bind('add.touchz.workflow', addFileBrowseButton);
$(document).bind('remove.touchz.workflow', addFileBrowseButton);
$(document).bind('error.design', addFileBrowseButton);
$(document).bind('save.design', function() {designs.load();});
$(document).bind('delete.design', function() {designs.load();});
$(document).bind('clone.design', function() {designs.load();});
$(document).bind('load.designs', function() { routie('list-designs'); });