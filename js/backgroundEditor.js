//first we are extending the Note class,
//because we want add the background property
//background is just a reference

Note.prototype.background = null;

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
};
//we have to cleare the screen
//reload your prototype with sava/load or ex/impoert or dropbox
//do not forget to save before testing

/**
a new function
just show an alert to show it works
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
    if (editor.game.notes[i].uid != editor.game.startNote) {
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
  }
  child.appendChild(child2);
  child.appendChild(createElement('br'));
  child2 = createElement('input');
  child2.setAttribute('type', 'file');
  child2.setAttribute('id', 'backgroundFile');
  child2.addEventListener('change', function(eve) { 
    editor.background_upload(eve, this.getAttribute('data-uid') ); }, true);
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
editor.closeNoteToBackground = function() {
  getElement('editor').removeChild(getElement('backgroundBox'));
};
//creating the 'background button' button
if (getElement('backgroundButton') == null) {
setTimeout( function() {
 var child = createElement('button');
 child.appendChild(createTextNode('background'));
 child.style.cssFloat = 'left';
 child.setAttribute('id','backgroundButton');
 child.setAttribute('onclick','editor.openNoteToBackground();');
 getElement('editorbar').appendChild(child);
}, 2500);
}

editor.background_upload = function (eve, _uid) {
 if (_uid == null) {
  alert('Select a note first.');
  return;
 }
 var files = eve.target.files; // FileList object
 var f = files[0];
 if (!f.type.match('image.*') ) {
  return;
 }
 var reader = new FileReader();
  reader.onload = (function(theFile) {
   return function(e) {
    console.log(e.target.result);
    editor.background_input(_uid, e.target.result);
    console.log(theFile.name);
   };
  })(f);
 reader.readAsDataURL(f);
};

editor.background_input = function (_uid, _media) {
 console.log(_uid+' -> '+_media);
 var note = editor.getNote(_uid);
 //check if the reference already exist
 if (note.background == null) {
  note.background = editor.createUid(); 
 }
 //	
 console.log(_uid+' -> '+note.background+' '+_media);
 editor.game.mediamanager.setMedia(note.background, _media);
 var ele = getElement('selectBackground');
 var selected = ele.children[ele.selectedIndex];
 selected.style.backgroundColor = '#0c0';
 selected.style.color = '#fff';
 //alert('background for note '+_uid);
 // 
};
//always as last?!
//gameEngine.init();

window.removeExtension_background_image = function() {
  getElement('editorbar').removeChild(getElement('backgroundButton'));
};