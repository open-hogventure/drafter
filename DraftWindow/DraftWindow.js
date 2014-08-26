var gui = require("nw.gui");
var win = null;
var isMaximum = false; 
var tray = null;
/**
@method window.onload
*/
window.onload = function() { 
  gui = require("nw.gui");
  win = gui.Window.get();
  document.body.style.overflow = 'hidden';
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  document.body.style.background = '#333';
  var plat = navigator.platform;
  //alert(plat);
  onResize();
  //plat = 'MacIntel';
  if (plat == 'MacIntel') {
    //change the appearence and place of the window icons
    document.getElementById("mac-close").onclick = function()
    {
      closeWindow();
    }
    document.getElementById("mac-mini").onclick = function() {
      minimizeWindow();
    }
    document.getElementById("mac-maxi").onclick = function() {
      maximizeWindow();
    }
    document.getElementById("mac-fullsize").onclick = function() {
      fullscreen();
    }
    document.getElementById("mac-window-debug").className = "mac";
    document.getElementById("icon_logo").style.display = "none";
    document.getElementById("window-button-group").style.display = "none";
    document.getElementById("mac-fullsize").style.display = "block";
  } else {
    document.getElementById("mac-button-group").style.display = "none";
    document.getElementById("close-window-button").onclick = function() {
      closeWindow();
    }
    document.getElementById("mini-window-button").onclick = function() {
      minimizeWindow();
    }
    document.getElementById("maxi-window-button").onclick = function() {
      maximizeWindow();
    }
    document.getElementById("mac-fullsize").style.display = "none";
  }
  tray = new gui.Tray({ title: 'Tray', icon: 'icon_logo24.png' });
  win.show();
  win.focus();
};  
/**
@method closeWindow
*/
function closeWindow() {
  win.close();
};
/**
@method minimizeWindow
*/
function minimizeWindow() {
  win.minimize();
}
/**
@method maximizeWindow
*/
function maximizeWindow() {
  if (isMaximum) {
    isMaximum = false;
    document.getElementById("maxi-window-button").className = 'icon-doc-landscape';
    win.unmaximize();
  } else {
    isMaximum = true;
    document.getElementById("maxi-window-button").className = 'icon-popup';
    win.maximize();
  }
}
/**
@method window.onfocus
*/
window.onfocus = function() { 
  console.log("focus");
};
/**
@method window.onblur
*/
window.onblur = function() { 
  console.log("blur");
};
/**
@method window.onrize
*/
window.onresize = onResize;
/**
@method onResize
@param {Event} eve
*/
function onResize(eve) {
  var w = window.innerWidth;
  var h = window.innerHeight;
  var e = document.querySelector('iframe');
  e.style.border = '0';
  e.style.margin = '0';
  e.style.padding = '0';
  e.style.width = w + 'px';
  e.style.height = (h - 25) + 'px';
};
/**
@method dev
*/
function dev() {
  if (win.isDevToolsOpen()) {
    win.closeDevTools();
  } else {
    win.showDevTools(document.querySelector('iframe'));
  }
}
/**
@method fullscreen
*/
function fullscreen() {
  win.toggleFullscreen();
}
