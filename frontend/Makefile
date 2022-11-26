all: run


run: compile ./dist/main.js
	node ./dist/main.js

compile: ./src/main.ts
	./node_modules/gulp/node_modules/.bin/gulp
