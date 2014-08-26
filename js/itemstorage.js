
  var storage = {};
	storage.indexedDB = {};
	storage.indexedDB.db = null;
 
	storage.indexedDB.open = function() {
		var version = 1;
		var request = window.indexedDB.open("GAMEEDITOR", version);

		request.onupgradeneeded = function(e) {
			var db = e.target.result;

			// A versionchange transaction is started automatically.
			e.target.transaction.onerror = storage.indexedDB.onerror;

			if(db.objectStoreNames.contains("GAMEEDITOR")) {
				//db.deleteObjectStore("game");
				db.deleteObjectStore("GAMEEDITOR");
			}

			var store = db.createObjectStore("GAMEEDITOR",
			{keyPath: "key"});//timeStamp;
		};

		request.onsuccess = function(e) {
			storage.indexedDB.db = e.target.result;
			storage.indexedDB.getAllItems();
		};

		request.onerror = storage.indexedDB.onerror;
	};

	storage.indexedDB.setItem = function(key, gamejson) {


		var db = storage.indexedDB.db;
		var trans = db.transaction(["GAMEEDITOR"], "readwrite");
		var store = trans.objectStore("GAMEEDITOR");
		var request = store.put({
			value: gamejson,
			key: key //new Date().getTime()
		});

		request.onsuccess = function(e) {
			// Re-render last game?
			//
			console.log('test');
			storage.indexedDB.getAllItems();
		};

		request.onerror = function(e) {
			console.log(e.value);
		};
	};

	storage.indexedDB.deleteAllItems = function() {
	  var db = storage.indexedDB.db;
	  var trans = db.transaction(["GAMEEDITOR"], "readwrite");
	  var store = trans.objectStore("GAMEEDITOR");

	  // Get everything in the store;
	  var keyRange = IDBKeyRange.lowerBound(0);
	  var cursorRequest = store.openCursor(keyRange);

	  cursorRequest.onsuccess = function(e) {
		var result = e.target.result;
		if(!!result == false)
		  return;

		storage.indexedDB.deleteItem(result.key);
		result.continue();
	  };

	  cursorRequest.onerror = storage.indexedDB.onerror;
	};

	storage.indexedDB.getAllItems = function() {
	  var db = storage.indexedDB.db;
	  var trans = db.transaction(["GAMEEDITOR"], "readwrite");
	  var store = trans.objectStore("GAMEEDITOR");

	  // Get everything in the store;
	  var keyRange = IDBKeyRange.lowerBound(0);
	  var cursorRequest = store.openCursor(keyRange);

	  cursorRequest.onsuccess = function(e) {

		var result = e.target.result;
		if(!!result == false)
		  return;

		console.log(result.value);
		//renderGame(once!);
		result.continue();
	  };

	  cursorRequest.onerror = storage.indexedDB.onerror;
	};

	storage.indexedDB.deleteItem = function(key) {
	  var db = storage.indexedDB.db;
	  var trans = db.transaction(["GAMEEDITOR"], "readwrite");
	  var store = trans.objectStore("GAMEEDITOR");

	  var request = store.delete(key);

	  request.onsuccess = function(e) {
		storage.indexedDB.getAllItems();  // Refresh the screen
	  };

	  request.onerror = function(e) {
		console.log(e);
	  };
	};

	storage.indexedDB.getItem = function(key) {
	  var db = storage.indexedDB.db;
	  var trans = db.transaction(["GAMEEDITOR"], "readwrite");
	  var store = trans.objectStore("GAMEEDITOR");

	  var request = store.get(key);

	  request.onsuccess = function(e) {
		  return request.result; // Refresh the screen
	  };

	  request.onerror = function(e) {
		console.log(e);
      return null;
	  };
	};

  console.log('storage', storage);
