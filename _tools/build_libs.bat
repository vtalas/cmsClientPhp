set MINIFY=%1

type ^
..\libs\js\jquery%MINIFY%.js,^
..\libs\js\angular%MINIFY%.js,^
..\libs\js\angular-route%MINIFY%.js,^
..\libs\js\angular-resource%MINIFY%.js,^
..\libs\js\angular-ui\event%MINIFY%.js,^
..\libs\js\angular-ui\angular.keypress%MINIFY%.js,^
..\libs\js\showdown%MINIFY%.js,^
..\libs\js\angular-bootstrap\ui-bootstrap-custom-tpls-0.3.0.min.js^
 > ..\build\app.libs.js

 pause