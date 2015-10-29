#node-trello-to-slides
This is a small node application that creates a presentation deck from a Trello board with the use of [reveal.js](https://github.com/hakimel/reveal.js).

## Prerequisites:
1. Node and npm should already be installed
2. Install application dependencies. Execute `npm install` while inside the application directory.
3. Create a dist folder in the application directory to contain the *reveal.js* artifacts.

## Usage:
1. Export Trello board to JSON and save to a file. (or you can use [node-trello-backup](https://github.com/olynvalencia/node-trello-backup) to export your boards to .json files).
2. Update the *index_template.html* file to configure the theme and other *reveal.js* initializations to your liking.
3. Execute `node app <Board Export File Path>` to create/update the */dist/index.html* file.
4. Execute `node server/bootstrap.js` to serve your slides. The server is started at port 8080 by default.