function ngcLazyImage(){var e="resources/loaders/loader16.gif";return{scope:{ngcLazyImage:"="},link:function(t,n,r){void 0!==r.loader&&(e=r.loader),t.$watch("ngcLazyImage",function(e){void 0!==e&&n.attr("src",e)})}}}function ngcOverlay(){return{restrict:"E",transclude:!0,templateUrl:"Templates/template.ngcOverlay.html",compile:function(){return function(){}}}}function simpleDragDirective(){var e=function(e,t,n,r){var i,o;e.pageX&&e.pageY&&(i=e.pageX-n,o=e.pageY-r,t.css("left",i),t.css("top",o))};return{link:function(t,n){var r=0,i=0;n.bind({dragstart:function(t){var o=t.originalEvent;r=o.offsetX,i=o.offsetY,e(o,n,r,i),n.css("position","absolute")},dragover:function(t){var o=t.originalEvent;t.stopPropagation(),t.preventDefault();var a=t.originalEvent.dataTransfer;a.effectAllowed=a.dropEffect="none",e(o,n,r,i)},dragenter:function(e){e.stopPropagation(),e.preventDefault();var t=e.originalEvent.dataTransfer;t.effectAllowed=t.dropEffect="none"}})}}}var EventDispatcher=function(){"use strict";function e(){this._listeners={}}return e.prototype.addEventListener=function(e,t){this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].push(t)},e.prototype.removeEventListener=function(e,t){if(this._listeners[e]){var n=this._listeners[e].indexOf(t);-1!==n&&this._listeners[e].splice(n,1)}},e.prototype.dispatchEvent=function(){var e;if("string"!=typeof arguments[0])console.warn("EventDispatcher","First params must be an event type (String)");else{e=this._listeners[arguments[0]];for(var t in e)e[t](arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6])}},e}();angular.module("appConfigModule",[]).value("appConfig",{});var moduleMaps=angular.module("maps",[]);moduleMaps.directive("ngcGoogleMap",["$sce","$parse","$timeout",function(e,t,n){var r={zoom:18,lat:49.214807,lng:16.570445};return{scope:{ngcGoogleMap:"="},link:function(e,t){var i=function(){var n=angular.extend(r,e.ngcGoogleMap),i={center:new google.maps.LatLng(n.lat,n.lng),zoom:n.zoom},o=new google.maps.Map(t[0],i);e.map=o};n(function(){i()},500)}}}]),angular.module("notifications",[]).provider("$notify",function(){var e=new EventDispatcher;return{$get:function(){return e.trigger=e.dispatchEvent,e}}});var stringUtils=angular.module("stringutils",[]);stringUtils.factory("$markdown",function(){var e=new Showdown.converter;return{toHtml:function(t){return t?e.makeHtml(t):""}}}),stringUtils.directive("ngBindHtmlUnsafe",["$sce","$parse",function(e,t){return function(e,n,r){function i(){return(o(e)||"").toString()}n.addClass("ng-binding").data("$binding",r.ngBindHtmlUnsafe);var o=t(r.ngBindHtmlUnsafe);e.$watch(i,function(e){n.html(e)})}}]);var ItemBrowser=function(){"use strict";function e(e,n){this.settings=angular.extend(t(),n),this.items=e||[],this.currentIndex=0}var t=function(){return{}};return e.prototype.next=function(){return this.currentIndex<this.items.length-1&&this.currentIndex++,this.getCurrent()},e.prototype.previous=function(){return this.currentIndex>0&&this.currentIndex--,this.getCurrent()},e.prototype.selectByIndex=function(e){return e>0&&e<this.items.length&&(this.currentIndex=e),this.getCurrent()},e.prototype.getNext=function(){return-1===this.currentIndex?null:this.items[this.currentIndex+1]||null},e.prototype.getPrevious=function(){return this.items[this.currentIndex-1]||null},e.prototype.getCurrent=function(){return this.items[this.currentIndex]||null},e}(),FitImage=function(){"use strict";var e=function(e,t,n,r){this.iWidth=e||0,this.iHeight=t||0,this.cWidth=n||0,this.cHeight=r||0};return e.prototype.imageWidthCss=function(){return this.boxScale()>=this.imageScale()?"100%":"auto"},e.prototype.imageHeightCss=function(){return this.boxScale()<this.imageScale()?"100%":"auto"},e.prototype.imageScale=function(){return this.iWidth/this.iHeight},e.prototype.boxScale=function(){return this.cWidth/this.cHeight},e}(),Gallery=function(){"use strict";function e(e){this.settings=angular.extend(t(),e),this.data=[],this.currentIndex=-1}var t=function(){return{onLoad:function(){},onChange:function(){}}};return e.prototype.loadData=function(e){void 0===e&&(e=[]),this.isArray(e)?this.data=e:this.data.push(e),this.settings.onLoad()},e.prototype.showByIndex=function(e){this.currentIndex=this.data[e]?Number(e):-1,-1!==this.currentIndex&&this.settings.onChange()},e.prototype.showBy=function(e){for(var t=0;t<this.data.length;t++){var n=this.data[t];if(e(n))return this.currentIndex=t,this.settings.onChange(),void 0}},e.prototype.close=function(){},e.prototype.next=function(){return this.currentIndex<this.data.length-1&&(this.currentIndex++,this.settings.onChange()),this.getCurrent()},e.prototype.prev=function(){return this.currentIndex>0&&(this.currentIndex--,this.settings.onChange()),this.getCurrent()},e.prototype.getPrevious=function(){return this.data[this.currentIndex-1]||null},e.prototype.getNext=function(){return-1===this.currentIndex?null:this.data[this.currentIndex+1]||null},e.prototype.getCurrent=function(){return this.data[this.currentIndex]||null},e.prototype.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)},e}(),galleryModule=angular.module("galleryBrowser",["notifications"]);galleryModule.factory("$gallery",["$notify",function(e){var t={onChange:function(){e.trigger("gallery-changed")},onLoad:function(){e.trigger("gallery-loaded")}};return new Gallery(t)}]),galleryModule.directive("ngcFitToBoxImage",[function(){return{template:'<div ><img class="fit-image" src="{{imageSrc}}" /></div>',replace:!0,scope:{ngcFitToBoxImage:"="},link:function(e,t){e.$watch("ngcFitToBoxImage",function(n){var r,i,o;if(n)if(i=t.find("img"),r=t.width(),o=t.height(),n.Width)console.log("not implemented");else{var a=new Image;a.onload=function(){var e=new FitImage(this.width,this.height,r,o);i.css("height",e.imageHeightCss()),i.css("width",e.imageWidthCss())},a.src=n,e.imageSrc=n}})}}}]),galleryModule.controller("galleryBrowser",["$scope","$api","$location","$rootScope","$timeout","$routeParams","$gallery","$notify",function(e,t,n,r,i,o,a,s){s.addEventListener("gallery-loaded",function(){var t=n.search().galleryIndex;t&&(a.showByIndex(t),e.overlayGalleryShow=a.currentIndex>-1),e.currentItem=a.getCurrent(),e.prevItem=a.getPrevious(),e.nextItem=a.getNext()}),s.addEventListener("gallery-changed",function(){e.overlayGalleryShow=!0,e.currentItem=a.getCurrent(),e.nextItem=a.getNext(),e.prevItem=a.getPrevious(),n.search("galleryIndex",a.currentIndex)});var u=function(){return e.overlayGalleryShow};e.close=function(){e.overlayGalleryShow=!1,n.search("galleryIndex",null)},e.prev=function(){e.currentItem=a.prev(),e.nextItem=a.getNext(),e.prevItem=a.getPrevious(),n.search("galleryIndex",a.currentIndex)},e.next=function(){e.currentItem=a.next(),e.nextItem=a.getNext(),e.prevItem=a.getPrevious(),n.search("galleryIndex",a.currentIndex)},e.$on("global-keydown",function(t,n){if(u()){var r=n.keyCode;switch(r){case 27:e.close();break;case 33:e.prev();break;case 34:e.next()}}})}]);var ApiWrapper=function(){function e(e,t,n){this.cmsApi=e,this.cache=t,this.q=n}return e.prototype.loadFromCache=function(e,t,n){var r=this.cache.get(e);return r?(t.resolve(r),t):(n(),t)},e.prototype.getPage=function(e){var t=this.q.defer(),n="getPage_"+e,r=this;return this.loadFromCache(n,t,function(){r.cmsApi.getJsonData({},function(i){var o=new GridList(i.data).getGridByLink(e);r.cache.put(n,o),t.resolve(o)},function(e){window.location,window.location.hash;403===e.status&&(window.location.hash="!login"),t.reject(e)})}),t.promise},e.prototype.getPages=function(){var e=this.q.defer();return this.cmsApi.getPages(function(t){e.resolve(t)}),e.promise},e.prototype.getJsonData=function(){var e=this.q.defer();return this.cmsApi.getJsonData(function(t){e.resolve(new GridList(t.data))}),e.promise},e.prototype.getAlbum=function(e,t){var n=this.q.defer(),r=t||{};return null===e?(n.resolve(null),n.promise):(r.id=e,this.cmsApi.getAlbum(r,function(e){n.resolve(e)}),n.promise)},e.prototype.getAlbumPhotos=function(e){var t=this.q.defer(),n=e+"getAlbumPhotos",r=this;return e?(this.loadFromCache(n,t,function(){r.cmsApi.getAlbumPhotos({id:e},function(e){r.cache.put(n,e),t.resolve(e)})}),t.promise):(t.resolve([]),t.promise)},e.prototype.getPhotos=function(){var e=this.q.defer(),t="getAlbumPhotosStream",n=this;return this.loadFromCache(t,e,function(){n.cmsApi.getPhotos(function(r){n.cache.put(t,r),e.resolve(r)})}),e.promise},e.prototype.getAlbums=function(){var e=this.q.defer();return this.cmsApi.getAlbums(function(t){e.resolve(t)}),e.promise},e.prototype.snapshot=function(e,t){var n=this.q.defer();return this.cmsApi.putSnapshot({data:e,path:t},function(e){n.resolve(e)}),n.promise},e.prototype.checkForSnapshot=function(e,t){t&&t.snapshot&&e.$emit("page-loaded")},e}();angular.module("apiModule",["ngResource","appConfigModule"]).factory("cmsApi",["$resource",function(e){var t=e("Service/cmsClientPHPService/:service",{service:"serverProxy.php"},{getJsonData:{method:"GET",isArray:!1,params:{action:"getJson"}},getPage:{method:"GET",isArray:!1,params:{action:"getPage"}},getRequestToken:{method:"GET",isArray:!1,params:{action:"getLogin"}},login:{method:"POST",isArray:!1,params:{action:"PostLogin",service:"login.php"}},post:{method:"POST",isArray:!1,params:{action:"getLogin"}},getPages:{method:"GET",isArray:!1,params:{action:"getPages"}},getAlbums:{method:"GET",isArray:!1,params:{action:"getAlbums"}},getAlbum:{method:"GET",isArray:!1,params:{action:"getAlbum"}},getAlbumPhotos:{method:"GET",isArray:!1,params:{action:"getAlbumPhotos"}},getPhotos:{method:"GET",isArray:!1,params:{action:"getPhotos"}},putUserData:{method:"PUT",isArray:!1,params:{service:"postData.php"}},putSnapshot:{method:"PUT",isArray:!1,params:{service:"snapshot.php"}}});return t}]);var repository=angular.module("repo",["apiModule"]);repository.factory("$api",["cmsApi","$cacheFactory","$q",function(e,t,n){return new ApiWrapper(e,t("cmsCache"),n)}]),repository.factory("loadFromCache",["cmsApi","$cacheFactory","$q",function(){return":ashdvjad"}]),repository.factory("loadGridList",["$api","$cacheFactory","$q",function(e){return e.getJsonData()}]);var gridModule=angular.module("grids",[]);gridModule.directive("ngcAspectRatio",[function(){return{templateUrl:"aspectRatio.html",transclude:!0,link:function(e,t,n){function r(e,t){return t/e*100}e.ratioWidth=Number(n.w)||4,e.ratioHeight=Number(n.h)||3,e.$watch("ratioWidth",function(){e.ratioCalculated={"padding-top":r(e.ratioWidth,e.ratioHeight)+"%"}}),e.$watch("ratioHeight",function(){e.ratioCalculated={"padding-top":r(e.ratioWidth,e.ratioHeight)+"%"}})}}}]);var Grid=function(){function e(e){e=e||{},this.GridElements=e.GridElements||[],this.Link=e.Link||null,this.Name=e.Name||"",this.id=e.id||null,this.resources=e.resources||[],this.groups=e.groups||null}return e}(),GridElementsList=function(){function e(e){this.data=e||[]}return e.prototype.getGroups=function(){for(var e=0;e<this.data.length;e++);return""},e.prototype.findById=function(e){for(var t=0;t<this.data.length;t++)if(e===this.data[t].Id)return this.data[t];return null},e.prototype.filter=function(e,t){var n,r,i=[];for(n=0;n<this.data.length;n++)r=this.data[n].resources,r&&r[e]===t&&i.push(this.data[n]);return i},e}(),GridList=function(){function e(e,t){this.data=e||[],this.repo=t}return e.prototype.addGrid=function(e){e.id="grid_"+(this.data.length+1),this.data.push(e),this.repo.set(this.data)},e.prototype.save=function(){this.repo.set(this.data)},e.prototype.update=function(e){var t=this.data.indexOf(e);this.data[t]=e,this.repo.set(this.data)},e.prototype.remove=function(e){this.data.splice(this.data.indexOf(e),1),this.repo.set(this.data)},e.prototype.getGrid=function(e){for(var t=0;t<this.data.length;t++){var n=this.data[t];if(n.id===e)return new Grid(n)}return new Grid},e.prototype.getGridByLink=function(e){for(var t=0;t<this.data.length;t++){var n=this.data[t];if(n.Link===e)return new Grid(n)}return new Grid},e.prototype.getGridsByCategory=function(e){for(var t=[],n=0;n<this.data.length;n++){var r=this.data[n];r.Category===e&&t.push(new Grid(r))}return t},e}(),galleryImageViewerController=["$scope","$routeParams","$api","$location",function(e,t,n,r){function i(){return null!==e.gallery&&void 0!==e.gallery}function o(t,r){return e.gallery?(e.image=e.gallery[r],void 0):(e.newindex=r,n.getAlbumPhotos(t).then(function(t){e.gallery=t.data,e.image=e.gallery[r]}),void 0)}e.$on("galleryImageViewer-display-image",function(t,n,r){e.imageIndex=r,e.galleryId=n,o(n,r)}),e.$on("global-keydown",function(t,n){if(i()){var r=n.keyCode;switch(r){case 27:e.close();break;case 37:e.prev();break;case 32:case 39:e.next()}}}),e.$on("ngc-responsive-image-loading",function(t,n){e.loading=n,"$digest"!==e.$$phase&&e.$digest()}),e.$on("ngc-responsive-image-skipping",function(t,n){e.skipping=n,"$digest"!==e.$$phase&&e.$digest()}),e.close=function(){r.search("gid",null),r.search("i",null),e.gallery=null},e.next=function(){var t=e.gallery.length,n=e.imageIndex;n++,n>=t&&(n=0),r.search("i",n)},e.prev=function(){var t=e.gallery.length,n=e.imageIndex;n--,0>=n&&(n=t-1),r.search("i",n)}}],gridelementKontaktCtrl=["$scope","$api","$routeParams","$location","$rootScope",function(e){function t(e){return r[e]||""}function n(e){return r[e]||null}var r=e.gridelement.resources||{};e.header=t("header"),e.subHeader=t("subheader"),e.valueA=t("valuea"),e.valueB=t("valueb"),e.valueC=t("valuec"),e.valueD=t("valued"),e.valueE=t("valuee"),e.valueF=t("valuef"),e.map=n("map"),e.hasMap=null!==e.map,e.blockSize=e.map?"grid_12":"grid_3"}],gridelementAlbumCtrl=["$scope","$api","$routeParams","$location","$notify","$gallery",function(e,t,n,r,i,o){function a(e,t){return u[e]||t||""}function s(e,t){return l[e]||t||""}var u=e.gridelement.resources||{},l=e.gridelement.Content||{};e.gdataAlbumId=s("gdataAlbumId",null),e.route={link:n.link},e.name=a("name"," "),e.type=a("type"),e.services=a("services"),e.year=a("year"),e.text=a("text"),e.cssRatio=s("ratio","ratio16_9"),t.getAlbum(e.gdataAlbumId,{size:417,isSquare:!1,type:0}).then(function(t){t&&(e.album=t.data)}),e.imageClick=function(){o.showBy(function(t){return e.gridelement.Id===t.Id})}}],gridelementAlbumOverlayCtrlPreview=["$scope","$api","$routeParams","$location","$notify","$gallery","$markdown",function(e,t,n,r,i,o,a){function s(){var t=e.gridelement.Content;return null!==t?t.gdataAlbumId:null}function u(e){return l[e]||""}e.gdataAlbumId=s(),e.route={link:n.link};var l=e.gridelement.resources||{};e.name=u("name"),e.type=u("type"),e.services=u("services"),e.year=u("year"),e.text=a.toHtml(u("text")),e.toHtml=function(e){return a.toHtml(e)},t.getAlbumPhotos(e.gdataAlbumId).then(function(t){t&&(e.albumPhotos=t.data,e.currentImage=e.albumPhotos[0],e.currentImageIndex=0)}),e.showImagePreview=function(t){e.currentImage=e.albumPhotos[t],e.currentImageIndex=t}}],gridelementAlbumOverlayCtrl=["$scope","$api","$routeParams","$location","$notify","$gallery","$markdown",function(e,t,n,r,i,o,a){function s(){var t=e.gridelement.Content;return null!==t?t.gdataAlbumId:""}function u(e){return l[e]||null}e.gdataAlbumId=s(),e.route={link:n.link};var l=e.gridelement.resources||{};e.name=u("name"),e.type=u("type"),e.services=u("services"),e.year=u("year"),e.text=a.toHtml(u("text")),e.map=u("map"),e.hasMap=null!==e.map,e.toHtml=function(e){return a.toHtml(e)};var c;t.getAlbumPhotos(e.gdataAlbumId).then(function(t){t&&(e.albumPhotos=t.data,c=new ItemBrowser(t.data),e.currentImage=c.getCurrent(),e.currentImageIndex=c.currentIndex,e.previousImage=c.getPrevious(),e.nextImg=c.getNext())}),e.showImagePreview=function(t){e.currentImage=c.selectByIndex(t),e.currentImageIndex=c.currentIndex,e.previousImage=c.getPrevious(),e.nextImg=c.getNext()},e.prevImage=function(){e.currentImage=c.previous(),e.currentImageIndex=c.currentIndex,e.previousImage=c.getPrevious(),e.nextImg=c.getNext()},e.nextImage=function(){e.currentImage=c.next(),e.currentImageIndex=c.currentIndex,e.previousImage=c.getPrevious(),e.nextImg=c.getNext()},e.$on("global-keydown",function(t,n){var r=n.keyCode;switch(r){case 37:e.prevImage();break;case 39:e.nextImage()}})}],gridelementGdataAlbumCtrl=["$scope","$api","$routeParams","$location","$rootScope",function(e,t,n,r){function i(){var t=e.gridelement.Content;return null!==t?t.gdataAlbumId:null}e.gdataAlbumId=i(),e.route={link:n.link},e.header=e.gridelement.Resources.header.Value,e.text=e.gridelement.Resources.text.Value,t.getAlbum(e.gdataAlbumId,{size:100,isSquare:!0,type:2}).then(function(t){e.album=t.data}),e.showImage=function(e,t){r.search("i",t),r.search("gid",e)}}],homeController=["$scope","$api",function(e,t){function n(n,r){return t.getAlbumPhotos(r).then(function(t){e.homeData[n].images=t.data[0],e.tempLength++,e.tempLength>e.homeData.length&&(e.loadedImages=!0)})}function r(t,n,r){var i,o,a=t.width(),s=t.height();e.disableAutoFormat||n>a&&(i=a/s,o=Math.floor(i*r-50),t.css("max-width",o))}e.homeData=[],e.nextWorkData=[],e.pageLink="projekty",e.loadedData=!1,e.loadedImages=!1,e.showLoader=!0,e.tempLength=0;var i=$(".page-home");i.hide(),e.$on("windowChanged",function(e,t){r(i,t.width,t.height)}),t.getPage(e.pageLink).then(function(t){return e.homeData=t.data.GridElements,setTimeout(function(){e.loadedData=!0,e.$digest()},1e3),r(i,$(window).width(),$(window).height()),e.$emit("data-loaded"),t.data}).then(function(e){for(var t=[],r=0;r<e.GridElements.length;r++){var i=e.GridElements[r].Content;t.push(n(r,i.gdataAlbumId))}}),e.showNextWork=function(){e.nextWork=!0,e.disableAutoFormat=!0,$("html, body").animate({scrollTop:$(document).height()},1e3)}}],loginController=["$scope","cmsApi",function(e,t){var n=(new ApiWrapper(t),function(t){t&&(e.message=null),e.loading=null===t||"undefined"==typeof t?!0:t});n(),t.getRequestToken(function(t){e.RequestToken=t.RequestToken,n(!1)},function(){e.message="Přihlašovací službe je nedostupná."});var r=function(e){var t;switch(e){case 401:t="Špatné heslo nebo login";break;case 400:case 500:t=".";break;default:t="Vyskytla se neznámá chyba ".status}return t};e.submit=function(){n();var i={};i.UserName=e.UserName,i.Password=e.Password,i.RequestToken=e.RequestToken,t.login(i,function(){window.location.hash="home",n(!1)},function(t){e.message=r(t.status),n(!1)})}}],pController=["$scope","$api","$routeParams","$location","$notify",function(e,t,n,r,i){e.link=n.link;var o=function(){var e,t=r.search().elindex,i=n.elementIndex;return e=isNaN(i)?0:i,isNaN(t)||(e=t),Number(e,10)||0},a=function(t){var n=e.page.GridElements.length;e.isFirst=0===t,e.isLast=t===n-1};e.loading=!0;var s=t.getPage(e.link).then(function(t){var n=o();return e.page=t,a(n),e.currentGridElement=e.page.GridElements[n],i.trigger("content-loaded"),t}),u=function(t){r.search("elindex",t),s.then(function(){e.currentGridElement=e.page.GridElements[t],a(t)})};e.next=function(){var t=o(),n=e.page.GridElements.length;t++,t>n-1||u(t)},e.prev=function(){var e=o();0>=e||(e--,u(e))};var l=angular.element(".navigation");angular.element(window).scroll(function(){var t=$(this).scrollTop(),n=50;t>n&&!e.isScrolled&&(e.isScrolled=!0,l.addClass("scrolled")),n>t&&e.isScrolled&&(e.isScrolled=!1,l.removeClass("scrolled"))})}],pageController=["$scope","$api","$routeParams","$gallery","$notify","$timeout",function(e,t,n,r,i){var o=null;e.link=n.link,i.trigger("content-loading"),t.getPage(e.link).then(function(t){return e.page=t,e.gridElements=e.page.GridElements||[],e.groups=e.page.groups,i.trigger("content-loaded"),o=new GridElementsList(e.page.GridElements),r.loadData(t.GridElements||[]),t},function(e){console.log("ERROR!!",e.status)}).then(function(n){setTimeout(function(){t.checkForSnapshot(e,n)},3e3)}),e.filter=function(t){return void 0===t?(e.filterValue=null,e.gridElements=o.data,void 0):(e.filterValue=t,e.gridElements=o.filter("group",t),void 0)},e.isSelectedFilter=function(t){return e.filterValue===t?"selected":null}}],simplehtml=["$scope","$markdown",function(e,t){function n(e){return i[e]||""}var r=e.getGridElement(),i=r.resources||{};e.ContentToHtml=function(){return t.toHtml(n("text"))}}],userDataForm=["$scope","cmsApi","$routeParams",function(e,t,n){e.link=n.link;var r=function(e){var t;switch(e){case 401:t="Pro odeslání formuláře je potřeba se přihásit. ";break;case 400:case 500:t=".";break;default:t="Vyskytla se neznámá chyba ".status}return t};e.post=function(){t.putUserData({data:e.data,key:e.key},function(){},function(t){e.$emit("set-message",r(t.status))})},e.serialized=function(){JSON.stringify(e.data)}}],ngcGdataAlbumDirective=["cmsApi",function(e){var t=new ApiWrapper(e);return{scope:{ngcGdataAlbum:"="},compile:function(){return function(e){t.getAlbum(e.ngcGdataAlbum).then(function(){})}}}}],ngcResponsiveImage=function(){var e=function(e){return e.windowWidth},t=function(e){return e.windowHeight},n=function(e,t){var n=t.FullSize.PhotoUri;return e>=768&&1200>e&&(n=t.Large.PhotoUri),e>=480&&768>e&&(n=t.Medium.PhotoUri),480>e&&(n=t.Small.PhotoUri),n},r=function(e){var t,n=new Image;return n.src=e,t=$.Deferred(),$(n).load(function(){var e=this;setTimeout(function(){t.resolve(e)},10)}),t},i=function(n){var r=e(n)<n.imageWidth,i=t(n)<n.imageWidth;if(n.containerWidth=r?null:n.imageWidth,i){var o=t(n);n.containerWidth=Math.round(n.imageWidth/n.imageHeight*o)}},o=function(e){e.containerWidth=e.imageWidth},a=function(t,o,a){var u,l=e(t),c=n(l,o);t.loading=!0,u=setTimeout(function(){t.showLoader=t.loading,t.$emit("ngc-responsive-image-loading",t.loading),t.$digest()},200),t.imagePromise=r(c).done(function(e){t.imageWidth=e.width,t.imageHeight=e.height,i(t),t.source=c,t.loading=!1,t.showLoader=!1,clearTimeout(u),t.$emit("ngc-responsive-image-loading",!1),t.$emit("ngc-responsive-image-skipping",!1),t.skipping=!1,s(a),t.$apply()})},s=function(e){e.css("position","relative"),e.css("margin","0 auto"),e.css("left","auto"),e.css("top","auto")};return{scope:{galleryImage:"="},controller:["$scope",function(e){e.containerWidth="16",e.windowWidth=$(window).width(),e.windowHeight=$(window).height(),e.isFullSize=function(){return e.imageWidth<=e.containerWidth},e.isFullSizeCssClass=function(){return e.isFullSize()?"icon-resize-small":"icon-resize-full"},e.showFullSize=function(){e.isFullSize()?i(e):o(e)},e.isMovable=function(){return e.isOverFlowable()&&e.isFullSize()?"movable":""},e.fullSizeTooltip=function(){return e.isFullSize()?"Přizpůsobit na stránku":"Zobrazit původní velikost"},e.isOverFlowable=function(){return e.windowHeight<e.imageHeight||e.windowWidth<e.imageWidth},e.getCssWidth=function(e){return null===e?"auto":e+"px"},e.getCssHeight=function(e){return null===e?"auto":e+"px"}}],restrict:"E",replace:!0,templateUrl:"Templates/template.ngcResponsiveImage.html",compile:function(){return function(e,t){var n=t.find(".draggable");e.source=null,e.$watch("galleryImage",function(t){void 0!==t&&(e.imagePromise&&"pending"===e.imagePromise.state()&&(e.imagePromise.reject(),e.skipping=!0,e.$emit("ngc-responsive-image-skipping",!0)),a(e,t,n))}),e.$watch("containerWidth",function(e,t){var r=t>e;n.css("width",e),r&&s(n)}),e.$on("windowChanged",function(t,r){e.windowWidth=r.width,e.windowHeight=r.height,e.galleryImage&&a(e,e.galleryImage,n)})}}}};angular.module("HashBangURLs",[]).config(["$locationProvider",function(e){e.hashPrefix("!")}]);var module=angular.module("defaultClient",["ngRoute","galleryBrowser","repo","ui.keypress","ui.event","ui.bootstrap","HashBangURLs","stringutils","maps","ngAnimate"]);module.config(["$routeProvider",function(e){e.when("/page/:link",{reloadOnSearch:!1,controller:pageController,templateUrl:"Templates/template.page.html",resolve:{api:"$api"}}).when("/p/:link",{reloadOnSearch:!1,controller:pController,templateUrl:"Templates/template.p.html"}).otherwise({redirectTo:"/page/projekty"})}]),module.directive("shortcut",function(){return{restrict:"E",replace:!0,scope:!0,link:function(e){jQuery(document).on("keydown",function(t){e.$apply(e.keyPressed(t))})}}}),module.directive("gridelement",["$compile","$templateCache","$timeout",function(e,t,n){var r;return{scope:{grid:"=",gridelement:"="},link:function(i,o,a){i.$watch("gridelement",function(s){if(s){var u=i.gridelement.Skin||a.skin||null,l=u?"_"+u:"",c=t.get(i.gridelement.Type+l+".thtml"),d=e(c)(i);r&&n.cancel(r),r=n(function(){i.$emit("page-loaded")},500),o.html(d)}}),i.getGridElement=function(){return i.gridelement}}}}]),module.directive("ngcOverlay",ngcOverlay),module.directive("ngcGdataAlbum",ngcGdataAlbumDirective),module.directive("ngcLazyImage",ngcLazyImage),module.directive("ngcSimpleDrag",simpleDragDirective),module.directive("ngcResponsiveImage",ngcResponsiveImage),module.controller("appController",["$scope","$api","$location","$rootScope","$timeout","$routeParams","$notify","$animate","loadGridList",function(e,t,n,r,i,o,a,s,u){e.showContent=!1;var l={};$(".centered-container").css("height",$(window).height()).css("width",$(window).width());var c;u.then(function(t){l=t,e.mainMenu=t.getGridsByCategory("Page")}),$(window).resize(function(){c&&i.cancel(c),c=i(function(){e.$broadcast("windowChanged",{width:$(window).width(),height:$(window).height()})},200)});var d;a.addEventListener("content-loading",function(){d=setTimeout(function(){e.$apply(function(){e.showLoader=!0})},500)}),a.addEventListener("content-loaded",function(){clearTimeout(d),e.showLoader=!1,e.showContent=!0}),e.globalKeydown=function(t){e.$broadcast("global-keydown",t)},e.$on("set-message",function(t,n){e.message=n}),e.$on("page-loaded",function(){var e=$("html").html();t.snapshot(e,n.path())});var g=function(){var e=n.search();e.gid&&void 0!==e.i&&r.$broadcast("galleryImageViewer-display-image",e.gid,e.i)};e.$watch("resourcesLoaded",function(e){e&&g()}),e.isSelectedLink=function(e){return o.link===e?"selected":null}}]);