## Getting Started

To get you started you can simply clone MusicLibBackend

### Prerequisites

You need git to clone repository. You can get git from
(http://git-scm.com/).

We also use a number of node.js tools to initialize and test angular-seed. You must have node.js and
its package manager (npm) installed.  You can get them from (http://nodejs.org/).

For installing all dependencies run this in MusicLibBackend-Folder

npm install

### Set Up DB

The MusicLibBackend is based on top of a NEO4J-GraphDB. Before running the Backend-server the installation of NEO4J is necessary.

Goto (http://neo4j.com/) and download the latest version of NEO4J (development used 2.2)

and run the installation

### start and config DB

Follow the instruction under (http://neo4j.com/docs/milestone/server-installation.html) to start NEO4J under your OS.

Start the server and naivgate to the server-page (default http://localhost:7474) create your credentials

### Running the App during Development

Then provide the credentials and the neo4j adress in the config.ja. Afterwards you can start your own development backend server by running:

node server.js

### Insert testdata

copy content of 






