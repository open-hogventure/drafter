/** 
*/
window.removeExtension_translator = function() {
  getElement('editorbar').removeChild(getElement('translatorButton'));
};

window.translator = {
  default_language : 'en',
  current_language : this.default_language,
  body : 'show available languages<select id="translator_available_languages"></select><br>'+
 'select / set new language<select id="translator_language_choose"></select><br>'+
 'current key <b><span id="translator_key_current">no key selected</span></b> <button '+ 
 'id="translator_add_key_value" onclick="translator.editKeyValue(null);">add</button><br>'+
 '<textarea id="translator_current_language" style="float: left; width: 49%; height: '+
 '100px; border: 1px solid #000;" placeholder="into current language"></textarea>'+
 '<textarea id="translator_default_language" style="float: left; width: 49%; height: '+
 '100px; border: 1px solid #999; background: #ccc;" disabled="disabled"'+
 ' placeholder="from default language"></textarea><br style="clear: both;">'+
 '  <br>'+'  Keys<br>'+'  <select id="translator_key_select" name="key_select" style="width: 49%; max-width: 49%;">'+
 '<option value="">---</option></select> / <input type="text" value=""'+
 ' name="key_input" id="translator_key_input" disabled="disabled"/><button id="translator_key_create" disabled="disabled">'+
 'create</button> text<br><br>  MEDIA<br>  <label><input '+
 'type="file" id="translator_image_files" name="files[]" disabled="disabled"/>upload</label> / '+
 '<button id="translator_" disabled="disabled">show</button> image<br>'+
 '  <label><input type="file" id="translator_audio_files" name="files[]" disabled="disabled"/>'+
 'upload</label> / <button id="translator_" disabled="disabled">play</button> audio -> show length in '+
 'milliseconds<br>  ¿video? as file -> show length in milliseconds<br>'+
 '  <button name="export_button" id="translator_export_button" onclick="exportMedia();">export</button>'+
 '<div id="translator_list"></div>',
  available_languages : [
{'af': 'Afrikaans'}, {'sq': 'Albanian'},
{'ar-sa': 'Arabic (Saudi Arabia)'}, {'ar-iq': 'Arabic (Iraq)'},
{'ar-eg': 'Arabic (Egypt)'}, {'ar-ly': 'Arabic (Libya)'},
{'ar-dz': 'Arabic (Algeria)'}, {'ar-ma': 'Arabic (Morocco)'},
{'ar-tn': 'Arabic (Tunisia)'}, {'ar-om': 'Arabic (Oman)'},
{'ar-ye': 'Arabic (Yemen)'}, {'ar-sy': 'Arabic (Syria)'},
{'ar-jo': 'Arabic (Jordan)'}, {'ar-lb': 'Arabic (Lebanon)'},
{'ar-kw': 'Arabic (Kuwait)'}, {'ar-ae': 'Arabic (U.A.E.)'},
{'ar-bh': 'Arabic (Bahrain)'}, {'ar-qa': 'Arabic (Qatar)'},
{'eu': 'Basque (Basque)'}, {'bg': 'Bulgarian'},
{'be': 'Belarusian'}, {'ca': 'Catalan'},
{'zh-tw': 'Chinese (Taiwan)'}, {'zh-cn': 'Chinese (PRC)'},
{'zh-hk': 'Chinese (Hong Kong SAR)'}, {'zh-sg': 'Chinese (Singapore)'},
{'hr': 'Croatian'}, {'cs': 'Czech'},
{'da': 'Danish'}, {'nl': 'Dutch (Standard)'},
{'nl-be': 'Dutch (Belgium)'}, {'en': 'English'},
{'en-us': 'English (United States)'}, {'en-gb': 'English (United Kingdom)'},
{'en-au': 'English (Australia)'}, {'en-ca': 'English (Canada)'},
{'en-nz': 'English (New Zealand)'}, {'en-ie': 'English (Ireland)'},
{'en-za': 'English (South Africa)'}, {'en-jm': 'English (Jamaica)'},
{'en': 'English (Caribbean)'}, {'en-bz': 'English (Belize)'},
{'en-tt': 'English (Trinidad)'}, {'et': 'Estonian'},
{'fo': 'Faeroese'}, {'fa': 'Farsi'},
{'fi': 'Finnish'}, {'fr': 'French (Standard)'},
{'fr-be': 'French (Belgium)'}, {'fr-ca': 'French (Canada)'},
{'fr-ch': 'French (Switzerland)'}, {'fr-lu': 'French (Luxembourg)'},
{'gd': 'Gaelic (Scotland)'}, {'ga': 'Irish'},
{'de': 'German (Standard)'}, {'de-ch': 'German (Switzerland)'},
{'de-at': 'German (Austria)'}, {'de-lu': 'German (Luxembourg)'},
{'de-li': 'German (Liechtenstein)'}, {'el': 'Greek'},
{'he': 'Hebrew'}, {'hi': 'Hindi'},
{'hu': 'Hungarian'}, {'is': 'Icelandic'},
{'id': 'Indonesian'}, {'it': 'Italian (Standard)'},
{'it-ch': 'Italian (Switzerland)'}, {'ja': 'Japanese'},
{'ko': 'Korean'}, {'ko': 'Korean (Johab)'},
{'lv': 'Latvian'}, {'lt': 'Lithuanian'},
{'mk': 'Macedonian (FYROM)'}, {'ms': 'Malaysian'},
{'mt': 'Maltese'}, {'no': 'Norwegian (Bokmal)'},
{'no': 'Norwegian (Nynorsk)'}, {'pl': 'Polish'},
{'pt-br': 'Portuguese (Brazil)'}, {'pt': 'Portuguese (Portugal)'},
{'rm': 'Rhaeto-Romanic'}, {'ro': 'Romanian'},
{'ro-mo': 'Romanian (Republic of Moldova)'}, {'ru': 'Russian'},
{'ru-mo': 'Russian (Republic of Moldova)'}, {'sz': 'Sami (Lappish)'},
{'sr': 'Serbian (Cyrillic)'}, {'sr': 'Serbian (Latin)'},
{'sk': 'Slovak'}, {'sl': 'Slovenian'},
{'sb': 'Sorbian'}, {'es': 'Spanish (Spain)'},
{'es-mx': 'Spanish (Mexico)'}, {'es-gt': 'Spanish (Guatemala)'},
{'es-cr': 'Spanish (Costa Rica)'}, {'es-pa': 'Spanish (Panama)'},
{'es-do': 'Spanish (Dominican Republic)'}, {'es-ve': 'Spanish (Venezuela)'},
{'es-co': 'Spanish (Colombia)'}, {'es-pe': 'Spanish (Peru)'},
{'es-ar': 'Spanish (Argentina)'}, {'es-ec': 'Spanish (Ecuador)'},
{'es-cl': 'Spanish (Chile)'}, {'es-uy': 'Spanish (Uruguay)'},
{'es-py': 'Spanish (Paraguay)'}, {'es-bo': 'Spanish (Bolivia)'},
{'es-sv': 'Spanish (El Salvador)'}, {'es-hn': 'Spanish (Honduras)'},
{'es-ni': 'Spanish (Nicaragua)'}, {'es-pr': 'Spanish (Puerto Rico)'},
{'sx': 'Sutu'}, {'sv': 'Swedish'},
{'sv-fi': 'Swedish (Finland)'}, {'th': 'Thai'},
{'ts': 'Tsonga'}, {'tn': 'Tswana'},
{'tr': 'Turkish'}, {'uk': 'Ukrainian'},
{'ur': 'Urdu'}, {'ve': 'Venda'},
{'vi': 'Vietnamese'}, {'xh': 'Xhosa'},
{'ji': 'Yiddish'}, {'zu': 'Zulu'}
 ],
 /**

 */
 mediamanager : (new Game()).mediamanager,
 /**
 @method init
 */
 init : function () {
  var transDiv = document.createElement('div');
  transDiv.setAttribute('id','translator_div');
  transDiv.style.width = '100%';
  transDiv.style.height = '90%';
  transDiv.style.position = 'absolute';
  transDiv.style.top = '10%';
  transDiv.style.zIndex = '1000';
  transDiv.style.background='white';
  //console.log(transDiv);
  document.body.appendChild(transDiv);
  transDiv.innerHTML = translator.body;
  var element = getElement('translator_available_languages');
  var htm = '';
  for (var i = 0; i < translator.available_languages.length; i++) {
    for (key in translator.available_languages[i]) {
      htm = htm + '<option value="'+key+'">'+key+' '+translator.available_languages[i][key]+'</option>';
    }
  }
  element.innerHTML = htm;
  element = getElement('translator_language_choose');
  htm = '';
  translator.mediamanager = (new Game()).mediamanager;
  translator.mediamanager.load(JSON.parse(JSON.stringify(editor.game.mediamanager) ) );
  for (var i = 0; i < translator.mediamanager.languages.length; i++) {
    htm = htm + '<option value="'+translator.mediamanager.languages[i]+'">'+
      translator.mediamanager.languages[i]+'</option>';
  }
  element.innerHTML = htm;
  element = getElement('translator_key_select');
  htm = '';
  console.log('get keys');
  var keys = translator.mediamanager.getKeys();
  var defaultLanguage = translator.mediamanager.getLanguage(translator.mediamanager.defaultLanguage);
  console.log(keys.length);

  for (var i = 0; i < keys.length; i++) {
    htm = htm + '<option value="'+keys[i]+'">'+
      defaultLanguage.getTextMedia(keys[i])+'</option>';
  }
  element.innerHTML = element.innerHTML + htm;

  getElement('translator_available_languages').addEventListener('change', translator.addLanguage, false);
  getElement('translator_language_choose').addEventListener('change', translator.setCurrentLanguage, false);
  getElement('translator_key_select').addEventListener('change', translator.selectKey, false);
  //getElement('translator_image_files').addEventListener('change', translator.handleFileSelect, false);
  //getElement('translator_audio_files').addEventListener('change', translator.handleFileSelect, false);
  //getElement('translator_key_create').addEventListener('click', translator.createKey, false);
  getElement('translator_current_language').addEventListener('keyup', translator.editKeyValue, false);
  //getElement('translator_key_input').addEventListener('keyup', translator.createKey, false);
  
 },
 /**
 @method editKeyValue

 @param {Event} evt
 */
 editKeyValue : function (evt) {
   console.log(getElement('translator_language_choose').value);
   var key = getElement('translator_key_current').innerHTML;
   var value = getElement('translator_current_language').value;
   console.log(key + ' -> ' + value);
   translator.mediamanager.setTextMedia(key, value);
 },
 /**
 @method addKeyValue

 @param {Event} evt
 */
 addKeyValue : function (evt) {
    var key = getElement('translator_key_current').innerHTML;
    var value = getElement('translator_current_language').value;
    console.log(key + ' -> ' + value);
    console.log(key + ' -> ' + value);
    translator.mediamanager.setMedia(key, Base64.encode(value));
    getElement('translator_default_language').value = value;
  },
  /**
  @method createKey

  @param {Event} evt
  */
  createKey : function (evt) {
    console.log('createKey -> ' + evt.keyIdentifier + ' ' + evt.target.id);
    if((evt.keyIdentifier && evt.keyIdentifier.toLowerCase() == 'enter')
        || event.target.id == 'key_create')
    {
      //read the input
      var key = getElement('translator_key_input').value;
      //only if the key is not in the mediamanager keys array
      if (!uidcounter.hasUid(Base64.encode(key)) && key != 'undefined' ) {
        uidcounter.addUid(Base64.encode(key));
      } else {
        key = uidcounter.createNew();
        alert('The key exsits. Instead a new key has been created: "'+key+'".');
        //return;
      }
      var element = getElement('translator_key_select');
      var ele = document.createElement('option');
      ele.innerHTML = key;
      ele.value = key;
      element.appendChild(ele);
    }
  },
  /**
  @method selectKey

  @param {Event} evt
  */
  selectKey : function (evt) {
    console.log('selectKey -> '+evt.target.value);
    var currentKey = evt.target.value;
    getElement('translator_key_current').innerHTML = currentKey;
    translator.mediamanager.setCurrentLanguage(translator.default_language);
    var text = translator.mediamanager.getTextMedia(currentKey);
    translator.mediamanager.setCurrentLanguage(translator.current_language);
    var ctxt = translator.mediamanager.getTextMedia(currentKey);
    console.log(translator.default_language, text, translator.current_language, ctxt);
    getElement('translator_default_language').value = text;
    getElement('translator_current_language').value = ctxt == null ? text : ctxt;
  },
  /**
  @method setCurrentLanguage
  */
  setCurrentLanguage : function (evt) {
    console.log('setCurrentLanguage -> '+evt.target.value);
    translator.current_language = evt.target.value;
    translator.default_language = translator.mediamanager.defaultLanguage;
    translator.mediamanager.setCurrentLanguage( evt.target.value );
  },
  /**
  @method addlanguage

  @param {Event} evt
  */
  addLanguage : function (evt) {
    console.log('addLanguage -> '+evt.target.value);
    var element = getElement('translator_language_choose');
    var ele = document.createElement('option');
    ele.value = evt.target.value;
    ele.innerHTML = evt.target.value;
    element.appendChild(ele);
  }
};

editor.openTranslator = function() {
  if (document.getElementById('translator_div') == null) {  
    try {
      translator.init();
      console.log('translator started');
      //document.getElementById('translatorButton').setAttribute('onclick','');
    } catch(e) {
      console.log(e);
    }
  } else {
    document.body.removeChild(document.getElementById('translator_div'));
  }
};


if (getElement('translatorButton') == null) {
  setTimeout( function() {
   var child = createElement('button');
   child.appendChild(createTextNode('translate'));
   child.style.cssFloat = 'left';
   child.setAttribute('id','translatorButton');
   child.setAttribute('onclick','editor.openTranslator();');
   getElement('editorbar').appendChild(child);
  }, 500);
};
