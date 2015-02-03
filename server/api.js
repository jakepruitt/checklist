module.exports = function(options) {
  var seneca = this,
      plugin = 'api';

  // Set top-level options for API
  options = seneca.util.deepextend({
    prefix: '/api/1.0'
  });

  // Incorporate all needed plugins
  seneca.use('user');
  seneca.use('auth');
  seneca.use('account');
  seneca.use('project');
  seneca.use('ng-web');
  seneca.use('card');

  // Add all API methods
  seneca.add({ role:plugin, cmd:'project_checklists' }, project_checklists);
  seneca.add({ role:plugin, cmd:'load_checklist' }, load_checklist);
  seneca.add({ role:plugin, cmd:'new_checklist' }, new_checklist);
  /*seneca.add({ role:plugin, cmd:'clone_checklist' }, clone_checklist);
  seneca.add({ role:plugin, cmd:'delete_checklist' }, delete_checklist);
  seneca.add({ role:plugin, cmd:'checklist_entries' }, checklist_entries);
  seneca.add({ role:plugin, cmd:'load_entry' }, load_entry);
  seneca.add({ role:plugin, cmd:'add_entry' }, add_entry);
  seneca.add({ role:plugin, cmd:'complete_entry' }, complete_entry);
  seneca.add({ role:plugin, cmd:'remove_entry' }, remove_entry);
  */

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
      'checklist_entries':{ GET:true },
      'load_entry':{ GET:true, alias:'load_entry/:entry' },
      'add_entry':{ POST:true },
      'complete_entry':{ POST:true },
      'remove_entry':{ POST:true }
    }
  }});

  // BEGIN API DEFINITION

  // role:api, 
  // cmd:project_checklists
  // args:
  //    project: [Object] a project entity object
  // action: Returns all checklists associated with a given project
  function project_checklists(args, done) {
    var project = args.project;
    done(null, project.checklists);
  }

  // role:api,
  // cmd:load_checklist
  // args:
  //    checklist: [String] checklist id
  // action: Returns the checklist associated with given id
  function load_checklist(args, done) {
    var checklist = args.checklist;
    done(null, {checklist:checklist});
  }

  // role:api,
  // cmd:new_checklist
  // args:
  //    project: [Object] a project entity object
  //    title: [String] the title of the checklist
  // action: Creates a new checklist object that is a child
  //    of the given project
  function new_checklist(args, done) {
    var project = args.project,
        title = args.title;

    var cardent = this.make$('card/card');

    var newChecklist = cardent.make$({
      title: title,
      parent: project.id
    });
    
    newChecklist.save$(function(err, checklist) {
      project['checklists'] = project['checklists'] || [];
      project['checklists'].push(checklist.id);

      project.save$(function(err, project) {
        if (err) return done(err);

        done(null, {checklist:checklist, project:project});
      });
    });
  };
}
