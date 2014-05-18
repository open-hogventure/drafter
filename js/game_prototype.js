var game_cvs = createElement('canvas');
game_cvs.style.width = '450px';
game_cvs.style.height = '300px';
game_cvs.width = 450;
game_cvs.height = 300;
game_cvs.style.background = '#000';
game_cvs.style.position = 'absolute';
game_cvs.style.top = '50px';
game_cvs.style.left = '0px';
document.body.appendChild(game_cvs);

var ctx = game_cvs.getContext('2d');
/**
@class Note
@param _uid
@since 2014-05-17
*/
function Note(_uid) {
 /***/
 this.uid = _uid;
 /***/
 this.text = null;
 /***/
 this.title = null;
 /***/
 this.connections = [];
 /***/
 this.load = function(data) {
  this.uid = data['uid'];
  this.text = data['text'];
  this.title = data['title'];
  for (var i = 0; i < data['connections'].length;i++) {
   var connection = new Note(data['connections'][i]['uid']);
   connection.load(data['connections'][i]);
   game.notes.push(connection);
  }
 };
};
/**
@class Connection
@param _uid
@since 2014-05-17
*/
function Connection(_uid) {
 /***/
 this.uid = _uid;
 /***/
 this.text = null;
 /***/
 this.to_uid = null;
 /***/
 this.load = function(data) {
  this.uid = data['uid'];
  this.text = data['text'];
  this.to_uid = data['to_uid'];
 };
};
/**
@class MediaLanguage
@param _lan
@since 2014-05-18
*/
function MediaLanguage(_lan) {
 this.language = _lan;
 this.medias = [];
 this.setMedia = function(_k, _v) {
  if (this.hasMedia(_k)) {
   this.getMedia(_k).value = Base64.encode(_v);
  } else {
   this.addMedia(_k, _v);
  }
 }
 this.getMedia = function(_k) {
  for (var i = 0; i < this.medias.length; i++) {
   if (this.medias[i].key == _k) {
    return this.medias[i];
   }
  }
  return null;
 }
 this.getMediaValue = function(_k) {
  for (var i = 0; i < this.medias.length; i++) {
   if (this.medias[i].key == _k) {
    return Base64.decode(this.medias[i].value);
   }
  }
  return null;
 }
 this.hasMedia = function(_k, _v) {
  for (var i = 0; i < this.medias.length; i++) {
   if (this.medias[i].key == _k) {
    return true;
   }
  }
  return false;
 }
 this.deleteMedia = function(_k, _v) {
  for (var i = 0; i < this.medias.length; i++) {
   if (this.medias[i].key == _k) {
    return this.medias.splice(i, 1);
   }
  }
 }
 this.addMedia = function(_k, _v) {
  this.medias.push(this.createMedia(_k, _v));
 }
 this.createMedia = function(_k, _v) {
  return { key : _k, value : Base64.encode(_v) };
 }
}
/**
The main singleton
@class game
@since 2014-05-17
*/
var game = {
 /**
 the major data type array
 @parameter notes
 @since 2014-05-17
 */
 notes : [],
 /**
 @method load
 @since 2014-05-17
 */
 load : function() {
  var data = window.localStorage.getItem('game_data');
  data = JSON.parse(data);
  if (data == null) {
   //avoid a cannot read property exception
   console.log(data);
   return;
  }
  for (var i = 0; i < data['notes'].length;i++) {
   var note = new Note(data['notes'][i]['uid']);
   note.load(data['notes'][i]);
   this.notes.push(note);
  }
 },
 /**
 @method save
 @since 2014-05-17
 */
 save : function() {
  var data = JSON.stringify(game);
  console.log('save data:');
  console.log(data);
  console.log(':save data');
  window.localStorage.setItem('game_data', data);
 },
 /**
 @class mediamanager
 @since 2014-05-18
 */
 mediamanager : {
  defaultLanguage : 'en',
  currentLanguage : 'en',
  languages : [],
  mediaLanguages : [],
  setCurrentLanguage : function(_lan) {
   this.currentLanguage = _lan;
   if (!this.hasLanguage(_lan)) {
    this.addLanguage(_lan);
   }
  },
  addLanguage : function(_lan) {
   this.mediaLanguages.push( new MediaLanguage(_lan) );
   this.languages.push(_lan);
  },
  hasLanguage : function(_lan) {
   for (var i = 0; i < this.languages.length; i++) {
    if (this.languages[i] == _lan) {
     return true;
    }
   }
   return false;
  },
  getCurrentLanguage : function() {
   for (var i = 0; i < this.mediaLanguages.length; i++) {
    if (this.mediaLanguages[i].language == this.currentLanguage) {
     return this.mediaLanguages[i];
    }
   }
   this.currentLanguage = this.defaultLanguage;
   var language = new MediaLanguage(this.currentLanguage);
   this.mediaLanguages.push( language );
   this.languages.push(this.currentLanguage);
   return language;
  },
  setMedia : function(_k, _v) {
   //type64=true|false would regulate de/encoding or not
   for (var i = 0; i < this.mediaLanguages.length; i++) {
    this.mediaLanguages[i].setMedia(_k, _v);
   }
  },
  deleteMedia : function(_k) {
   for (var i = 0; i < this.mediaLanguages.length; i++) {
    this.mediaLanguages[i].deleteMedia(_k);
   }
  },
  getMedia : function(_k) {
   this.getCurrentLanguage().getMedia(_k);
  },
  getMediaValue : function(_k) {
   this.getCurrentLanguage().getMediaValue(_k);
  }
 }
};

game.load();
console.log(game);

function updateDraw() {
 drawGame();
 requestAnimationFrame(updateDraw);
};

function drawGame() {
 ctx.fillStyle = '#000';
 ctx.font = '15px sans-serif';
 ctx.fillRect(0,0,300,450);
 ctx.fillStyle = '#fff';
 for (var i = 0; i < game.notes.length; i++) {
  ctx.fillText(game.notes[i].uid, 5, 17);
  ctx.fillText(game.notes[i].text, 5, 34);
  ctx.fillText(game.notes[i].title, 5, 51);
 }
};

updateDraw();
