node-proxyflip
==============

Experimental HTTP proxy that flips all PNG/JPEG images 180 degrees. Think of it as an April's Fools gag.

### Setup
#### Install dependencies
```
$ npm install
```
#### Start up proxy server
```
$ node proxy.js
```
#### Configure a web browser to use the proxy
#### Load a page

### Notes
- Does not work with HTTPS
- It requires ImageMagick to be installed on the system. Unfortunately, there did not seem to be other good native options.
