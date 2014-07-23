//first we are extending the Note class,
//because we want add the background property
//background is just a reference

Note.prototype.background = null;
Note.prototype.audio = null;

//also we have to overwrite the Note.load method
//so we can load the background key
Note.prototype.load = function() {
 //console.log(data);
  this.uid = data['uid'];
  this.connections = [];
  for (var i = 0; i < data['connections'].length;i++) {
   var connection = new Connection(data['connections'][i]['uid']);
   connection.load(data['connections'][i]);
   this.connections.push(connection);
  }
  this.text = data['text'];
  this.title = data['title'];
  this.ex = data['ex'];
  this.ey = data['ey'];
  if (typeof data['background'] != 'undefined') {
  	this.background = data['background'];
  }
  if (typeof data['audio'] != 'undefined') {
  	this.audio = data['audio'];
  }
};
//we have to clear the screen
//reload your prototype with save/load or ex/impoert or dropbox
//do not forget to save before testing

/**
*/
editor.openNoteToBackground = function() {
  //instead of this we should do:
  //displaying all available notes of the game in a select
  //with value=uid of a note and textnode the name of that note
  //also add a upload file input here with the label select your background for note
  //once a note is selected
  //add a done button (show only if a note is selected)
  //call the upload image function of the editor
  //which has to be defined next
  var child = createElement('div');
  child.className = 'connectionBox';
  child.setAttribute('id','backgroundBox');
  getElement('editor').appendChild(child);
  child.appendChild(createTextNode('To add a background, select a note:'));
  child.appendChild(createElement('br'));
  var child2 = createElement('select');
  child2.setAttribute('id', 'selectBackground');
  child2.setAttribute('name', 'selectBackground');
  child2.setAttribute('onchange', 
      'getElement(\'backgroundFile\').setAttribute(\'data-uid\',this.value);' );
  for (var i = 0; i < editor.game.notes.length; i++) {
    var child3 = createElement('option');
    child3.setAttribute('value', editor.game.notes[i].uid);
    child3.appendChild(createTextNode(editor.game.notes[i].uid + ' ' + 
         editor.game.mediamanager.getTextMedia(editor.game.notes[i].title)));
    if (editor.game.notes[i].background != null) {
      child3.style.background = '#0b0';
      child3.style.color = '#ff9';
    }
    child2.appendChild(child3);
  }
  child.appendChild(child2);
  child.appendChild(createElement('br'));
  child2 = createElement('input');
  child2.setAttribute('type', 'radio');  
  child2.setAttribute('id', 'background');
  child2.setAttribute('value', 'background');
  child2.setAttribute('onchange', 
      'getElement(\'backgroundFile\').setAttribute(\'data-type\',this.value);' );
  child2.setAttribute('name', 'mediaType');
  child.appendChild(child2);
  child.appendChild(createTextNode(' background '));

  child2 = createElement('input');
  child2.setAttribute('type', 'radio');
  child2.setAttribute('id', 'audio');
  child2.setAttribute('value', 'audio');
  child2.setAttribute('onchange', 
      'getElement(\'backgroundFile\').setAttribute(\'data-type\',this.value);' );
  child2.setAttribute('name', 'mediaType');
  child.appendChild(child2);
  child.appendChild(createTextNode(' audio'));

  child.appendChild(createElement('br'));
  child2 = createElement('input');
  child2.setAttribute('type', 'file');
  child2.setAttribute('id', 'backgroundFile');
  child2.addEventListener('change', function(eve) { 
    editor.media_upload(eve, this.getAttribute('data-uid'), this.getAttribute('data-type') ); }, true);
  child.appendChild(child2);
  child2 = createElement('button');
  child2.appendChild(createTextNode('X'));
  child2.className = 'closeBoxButton';
  child2.setAttribute('onclick', 'editor.closeNoteToBackground();');
  child.appendChild(child2);
  child.appendChild(createElement('br'));
  child2 = createElement('button');
  child2.appendChild(createTextNode('done'));
  child2.setAttribute('onclick','editor.closeNoteToBackground();');
  child.appendChild(child2);
};
/** 
*/
editor.closeNoteToBackground = function() {
  getElement('editor').removeChild(getElement('backgroundBox'));
};
//creating the 'background button' button
if (getElement('backgroundButton') == null) {
setTimeout( function() {
 var child = createElement('button');
 child.appendChild(createTextNode('upload media'));
 child.style.cssFloat = 'left';
 child.setAttribute('id','backgroundButton');
 child.setAttribute('onclick','editor.openNoteToBackground();');
 getElement('editorbar').appendChild(child);
}, 2500);
}
/** 
*/
editor.media_upload = function (eve, _uid, _media_type) {
 if (_uid == null) {
  alert('Select a note first.');
  return;
 }
 if (_media_type == null) {
  alert('Select a media type first.');
  return;
 }
 console.log(_uid+' -,- '+_media_type);
 var files = eve.target.files; // FileList object
 var f = files[0];
 if (!(f.type.match('image.*') && _media_type == 'background') ||  
   !(f.type.match('audio.*') && _media_type == 'audio') ) 
 {
  return;
 }
 var reader = new FileReader();
  reader.onload = (function(theFile) {
   return function(e) {
    console.log(e.target.result);
    editor.media_input(_uid, e.target.result, _media_type);
    console.log(theFile.name);
   };
  })(f);
 reader.readAsDataURL(f);
};
/** 
*/
editor.media_input = function (_uid, _media, _media_type) {
 console.log(_uid+' -> '+_media);
 var note = editor.getNote(_uid);
 //check if the reference already exist
 if (note.background == null &&  _media_type == 'background') {
  note.background = editor.createUid(); 
 } else if (note.audio == null &&  _media_type == 'audio') {
  note.audio = editor.createUid(); 
 }
 //	
 console.log(_uid+' -> '+note.background+' '+note.audio+' '+_media+' '+_media_type);
 if (_media_type == 'background') {
  editor.game.mediamanager.setMedia(note.background, _media);
 } else {
  editor.game.mediamanager.setMedia(note.audio, _media);
 }
 var ele = getElement('selectBackground');
 var selected = ele.children[ele.selectedIndex];
 selected.style.backgroundColor = '#0c0';
 selected.style.color = '#fff';
 //alert('background for note '+_uid);
 // 
};
/**
*/
gameEngine.renderNote = function (uid) {
  var note = gameEngine.getNote(uid);
  var ele = document.getElementById('gameMainView');
  ele.innerHTML = '';
  if (note.background != null) {
    ele.style.backgroundImage = 'url('+gameEngine.game.mediamanager.getMedia(note.background)+')';
    ele.style.backgroundSize = '50% 50%';
    ele.style.backgroundPosition = '50% 0%';
    ele.style.backgroundRepeat = 'no-repeat';
  }
  if (note.audio != null) {
    gameEngine.audio = document.createElement('audio');
    gameEngine.audio.src = gameEngine.game.mediamanager.getMedia(note.audio);
    gameEngine.audio.play();
  }
  var child = document.createElement('h1');
  child.appendChild(document.createTextNode(
                    gameEngine.game.mediamanager.getTextMedia(note.title)));
  ele.appendChild(child);
  //ele.appendChild(document.createElement('br'));
  ele.appendChild(document.createElement('br'));
  var text = gameEngine.game.mediamanager.getTextMedia(note.text);
  texts = text.split(/\n/);
  for (var i = 0; i < texts.length; i++) {
    ele.appendChild(document.createTextNode(texts[i]));
    ele.appendChild(document.createElement('br'));
  }
  ele.appendChild(document.createElement('br'));
  //connections
  var cons = note.connections;
  for (var i = 0; i < cons.length; i++) {
   if (cons[i].from_uid == note.uid) {
    var con_text = gameEngine.game.mediamanager.getTextMedia(cons[i].text);
    child = document.createElement('span');
    child.style.cssFloat = 'right';
    child.style.cursor = 'pointer';
    child.style.color = '#00c';
    child.style.textDecoration = 'underline';
    child.setAttribute('onclick','function() { gameEngine.audio.pause();'+
      ' gameEngine.audio = null; gameEngine.renderNote(\''+cons[i].to_uid+'\'); };');
    child.appendChild(document.createTextNode(con_text));
    ele.appendChild(child);
    ele.appendChild(document.createElement('br'));
   }
  }
};
//always as last?!
//gameEngine.init();
/** 
*/
window.removeExtension_background_image = function() {
  getElement('editorbar').removeChild(getElement('backgroundButton'));
};
/** 
*/
window.removeExtension_mediae_for_note = function() {
  getElement('editorbar').removeChild(getElement('backgroundButton'));
};