call build.bat
call minify ../build/app.js ../build/app.js
call minify ../build/app.css ../build/app.css
call minify ../build/app.libs.css ../build/app.libs.css
call build_libs.bat .min
