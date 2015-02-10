module.exports = function(options) {
  var seneca = this,
      plugin = 'checklist';

  // Set top-level options for API
  options = seneca.util.deepextend({
    prefix: '/checklist/'
  });


  // Add all API methods
  seneca.add({ role:plugin, cmd:'project_checklists' }, project_checklists);
  seneca.add({ role:plugin, cmd:'load_checklist' }, load_checklist);
  seneca.add({ role:plugin, cmd:'new_checklist' }, new_checklist);
  seneca.add({ role:plugin, cmd:'clone_checklist' }, clone_checklist);
  seneca.add({ role:plugin, cmd:'delete_checklist' }, delete_checklist);

  // Add all necessary routes to REST API
  seneca.act('role: web', { use:{
    prefix: options.prefix,
    pin:{ role:plugin, cmd:'*' },
    map:{
      'project_checklists':{ GET:true },
      'load_checklist':{ GET:true, alias:'load_checklist/:checklist' },
      'new_checklist':{ POST:true },
      'clone_checklist':{ POST:true },
      'delete_checklist':{ POST:true },
    }
  }});

  // BEGIN API DEFINITION

  // role:checklist, 
  // cmd:project_checklists
  // args:
  //    project: [String] a project entity id
  // action: Returns all checklists associated with a given project
  function project_checklists(args, done) {
    var project = args.project;
    var projectent = this.make$('sys/project');
    projectent.load$(project, function(err, project) {
      if (err) return done(err);
      done(null, {checklists:project.checklists});
    });
  }

  // role:checklist,
  // cmd:load_checklist
  // args:
  //    checklist: [String] checklist id
  // action: Returns the checklist associated with given id
  function load_checklist(args, done) {
    var checklist = args.checklist;
    var cardent = this.make$('card/card');
    console.log('load called');

    cardent.load$(checklist, function(err, checklist) {
      if (err) return done(err);
      done(null, {checklist:checklist});
    });
  }

  // role:checklist,
  // cmd:new_checklist
  // args:
  //    project: [String] a project entity id
  //    title: [String] the title of the checklist
  // action: Creates a new checklist object that is a child
  //    of the given project
  function new_checklist(args, done) {
    var projectId = args.project,
        title = args.title;

    var projectent = this.make$('sys/project');

    projectent.load$(projectId, function(err, project) {
      if (err) return done(err);

      seneca.act('role:card, make:top', {
        title: title,
        parent: project
      }, function(err, checklist) {
        project['checklists'] = project['checklists'] || [];
        project['checklists'].push(checklist);

        project.save$(function(err, project) {
          if (err) return done(err);
          return done(null, {checklist:checklist, project:project});
        });
      });
    });
  };

  // role:checklist,
  // cmd:clone_checklist
  // args:
  //    new_project: [String] a project entity id to clone the
  //            checklist to
  //    checklist: [String] the id of the checklist you wish
  //            to clone
  // action: Creates a new checklist object that is a clone
  //    of the given checklist
  function clone_checklist(args, done) {
    var projectId = args.new_project,
        checklist = args.checklist;
  
    var cardent = seneca.make$('card/card');

    cardent.load$(checklist, function(err, out) {
      seneca.act('role:checklist, cmd:new_checklist', {
        title: out.title,
        project: projectId
      }, function(err, out) {
        done(null, out);
      });
    });
  }

  // role:checklist,
  // cmd:delete_checklist
  // args:
  //    checklist: [String] the id of the checklist you wish
  //            to delete
  // action: Deletes the specified checklist and all of its entries
  function delete_checklist(args, done) {
    var checklist = args.checklist;

    var cardent = seneca.make$('card/card');
    var projectent = seneca.make$('sys/project');

    cardent.load$(checklist, function(err, checklist) {
      projectent.load$(checklist.parent, function(err, project) {
        // Remove checklist from project.checklists
        project.checklists = project.checklists.filter(function(checklistId) {
          return checklistId !== checklist.id;
        });

        project.save$();

        cardent.remove$({id:checklist.id}, function(err, out) {
          if (err) return done(err);
          done(null, {deleted:true});
        });
      });
    });
  }
}
