checklist
=========

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/jrpruit1/checklist?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Checklist web app for projects

Requirements
------------
Data Model:

Checklists contains an ordered set of checks.
Use the seneca-card plugin to provide this structure.
https://github.com/rjrodger/seneca-card
This gives you the ability to have sub-checklists.
Have a card that is a checklist.
Another card that is a checklist entry - these are the children of the checklist card.
seneca-card gives you ordering as well.

Checklists are organised into projects.
Use https://github.com/rjrodger/seneca-account and https://github.com/rjrodger/seneca-project as per seneca-mvp
Projects are organised into accounts, and you can only see projects in your account - this is done for you by the above plugins.

Checklists are NOT instances of "types" of checklist. Instead, new checklists are created simply by cloning existing ones.
Of course it must be possible to create entirely new checklists - these are then used as templates for cloning.

API and Web framework:

Use seneca-web to define an API, as per https://github.com/rjrodger/nodezoo-web lib/api.js

Use hapijs as the webframework - you will need to write a hapi.js plugin for seneca - call it hapi-seneca

Use Cases:

1. Create new project: create an entirely new project, with no checklists.
Note: checklists cannot be created outside of a project. Users can use some projects as "storage" to define checklist templates for cloning.

2. Clone project: some projects are template projects, containing a bunch of template checklists. These are cloned to start new, actual, projects.
This is a primary use case. When a new customer arrives, the project manager will clone an appropriate template project

3. Create new checklist: checklist fields: name, description
Can only be done inside a project

4. Clone checklist: clone a checklist from another project into the current project
Will need some sort of easy-to-use selection interface for the UI.

5. Tick off a checklist entry.


UI Pages:
- list of projects
- list of checklists inside project, should show status in some way (i.e. are all items complete)
- checklist description, and list of entries in the checklist
- editor for checklists to add new entries


Setup
-----

Clone the project and run `npm install` to get all of the necessary dependencies. Run `npm start` to start the hapi.js server, and point your browser to `http://localhost:4000` to see the app. While the server is running, you can perform the functionality tests by running `npm test`.
