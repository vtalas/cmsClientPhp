call minify.bat;
xcopy .. _production /I 
copy ../Scripts/libs.min.js _production/Scripts/libs.min.js
copy ../Css/css.min.css _production/Css/css.min.css
