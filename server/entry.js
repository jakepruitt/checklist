var async = require('async');
module.exports = function(options) {
  var seneca = this,
      plugin = 'entry';

  options = seneca.util.deepextend({
    prefix: '/entry/'
  });

  seneca.add({ role:plugin, cmd:'checklist_entries' }, checklist_entries);
  seneca.add({ role:plugin, cmd:'load_entry' }, load_entry);
  seneca.add({ role:plugin, cmd:'add_entry' }, add_entry);
  seneca.add({ role:plugin, cmd:'set_complete' }, set_complete);
  seneca.add({ role:plugin, cmd:'remove_entry' }, remove_entry);
  

  // Add all necessary routes to REST API
  seneca.act('role: web', { use:{
    prefix: options.prefix,
    pin:{ role:plugin, cmd:'*' },
    map:{
      'checklist_entries':{ GET:true },
      'load_entry':{ GET:true, alias:'load_entry/:entry' },
      'add_entry':{ POST:true },
      'set_complete':{ POST:true },
      'remove_entry':{ POST:true }
    }
  }});

  // BEGIN API DEFINITION
  
  // role:entry
  // cmd:checklist_entries
  // args:
  //    checklist: [String] a checklist entity id
  // action: Returns all entries associated with a given project
  function checklist_entries(args, done) {
    var checklist = args.checklist;
    var cardent = seneca.make$('card/card');

    cardent.load$(checklist, function(err, out) {
      if (err) return done(err);
      async.map(out.children, loadEntry, function(err, children) {
        if (err) return done(err);

        done(null, {entries: children});
      });

      function loadEntry(entry, cb) {
        seneca.act('role:entry, cmd:load_entry', {entry:entry}, function(err, entry) {
          if (err) return cb(err);
          cb(err, entry.entry);
        });
      }
    });
  }

  // role:entry
  // cmd:load_entry
  // args:
  //    entry: [String] entry id
  // action: Returns the entry associated with given id
  function load_entry(args, done) {
    var entry = args.entry;
    var entryent = this.make('card/entry');

    entryent.load$(entry, function(err, entry) {
      if (err) return done(err);
      done(null, {entry:entry});
    });
  }

  // role:entry
  // cmd:add_entry
  // args:
  //    checklist: [String] a checklist entity id
  //    title: [String] the title of the entry
  // action: Creates a new checklist entry that belongs
  //    to the given checklist
  function add_entry(args, done) {
    var checklistId = args.checklist,
        title = args.title;

    var entryent = this.make$('card/entry');
    var checklistent = this.make$('card/card');

    checklistent.load$(checklistId, function(err, checklist) {
      if (err) return done(err);
      console.log('made it this far');

      var newEntry = seneca.make$('card/entry',{
        title: title,
        complete: false,
        parent: checklist
      });
      
      newEntry.data$({
        complete: false
      });

      newEntry.save$(function(err, entry) {
        console.log('made it through the save process');
        if (err) return done(err);
        checklist.save$(function(err, checklist) {
          if (err) return done(err);

          return done(null, {entry:entry, checklist:checklist});
        });
      });
    });
  }

  // role: entry,
  // cmd: set_complete
  // args:
  //    entry: [String] entry id to be completed
  // action: Marks an entry as complete
  function set_complete(args, done) {
    var entryId = args.entry;
    var newComplete = args.complete;

    var entryent = this.make$('card/entry');

    entryent.load$(entryId, function(err, entry) {
      if (err) return done(err);

      entry.complete = newComplete;
      entry.save$(function(err, entry) {
        if (err) return done(err);

        return done(null, entry);
      });
    });
  }

  // role: entry,
  // cmd: remove_entry
  // args:
  //    entry: [String] entry id to be removed
  // action: Removes an entry from a checklist
  function remove_entry(args, done) {
    var entryId = args.entry;

    var entryent = this.make$('card/entry');
    var checklistent = this.make$('card/card');

    entryent.load$(entryId, function(err, entry) {
      if (err) return done(err);
      checklistent.load$(entry.parent, function(err, checklist) {
        if (err) return done(err);
        checklist.children = checklist.children.filter(function(entryIter) {
          return entryIter !== entryId;
        });
        checklist.save$();
      });
      entry.remove$({id:entryId}, function(err, out) {
        done(null, {deleted:true});
      });
    });
  }
};
