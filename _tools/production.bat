call minifyCssJs.bat;
xcopy ..\*.html ..\_production /I /Y
xcopy ..\.htaccess ..\_production /I /Y
xcopy ..\Css\images ..\_production\Css\images /I /E /Y
xcopy ..\Css\loaders ..\_production\Css\loaders /I /Y
xcopy ..\Templates ..\_production\Templates /I /Y
xcopy ..\Scripts\libs ..\_production\Scripts\libs /I /E /Y

xcopy ..\Service\cmsClientPHPService ..\_production\Service\cmsClientPHPService /I /Y
xcopy ..\Service\cmsClientPHPService\libs ..\_production\Service\cmsClientPHPService\libs /I /Y

call minifyHtml "..\_production\*.html"
call minifyHtml "..\_production\Templates\*.html"
