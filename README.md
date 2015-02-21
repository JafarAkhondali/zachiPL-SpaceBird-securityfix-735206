Solpeo GameJam
==============

How to build application
------------------------

First time you have to install all needed dependencies.
Make sure you have Nodejs installed and then simply run `npm install`.

All game *JavaScript* files are in ***src*** folder and
are pointed in `package.json` *files* list.

All static files like images, sounds, *SNA* animations, *JSON* files and more
are in the ***static*** folder.

Now just execute `grunt html`
Press `grunt help` for more builder options like engine version.

Start coding in ***src/*** folder.

Your application now is ready to run!
Check next section about running web server.

Good luck!

How to run web server
---------------------

In this package you can find file with simple *node.js* static file web server.

The web server is required to use static assets (like images, sounds etc.)
in your projects.

Execute `npm start` in your command line to run the server.

You can specify custom HTTP port if default one (port 8080) is used:
e.g. `npm config set port 1337`.
