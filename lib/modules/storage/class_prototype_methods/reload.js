let classPrototypeMethods = Astro.Module.modules.storage.classPrototypeMethods;

classPrototypeMethods.reload = function() {
  let doc = this;
  let Class = doc.constructor;
  let Collection = Class.getCollection();

  // The document has to be already saved in the collection.
  if (doc._id) {
    // Get a document from the collection without the transformation.
    let plainDoc = Collection.findOne(doc._id, {
      transform: null,
    });

    // Init instance with the new values from the collection.
    Class.call(doc, plainDoc);

    // Set the "_isNew" flag back to false.
    doc._isNew = false;
  }
};