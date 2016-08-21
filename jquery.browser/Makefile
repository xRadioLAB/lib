# make all

.PHONY: js
js:
	mkdir -p bundle
	babel --watch js/jquery.browser.js --out-file dist/jquery.browser.js

.PHONY: server
server:
	browser-sync start --server --files='index.html, dist, js'

.PHONY: clean
clean:
	rm -r bundle

.PHONY: all
all:
	make js & make server & wait
