
  ;(function(){
  let u=void 0,isReady=false,onReadyCallbacks=[],isServiceReady=false,onServiceReadyCallbacks=[];
  const __uniConfig = {"pages":[],"globalStyle":{"pageOrientation":"portrait","backgroundColor":"#F8F8F8","bounce":"none","safearea":{"bottom":{"offset":"none"}},"navigationBar":{"backgroundColor":"#F8F8F8","titleText":"uni-app","style":"custom","type":"default","titleColor":"#000000"},"isNVue":false},"nvue":{"compiler":"uni-app","styleCompiler":"uni-app","flex-direction":"column"},"renderer":"auto","appname":"番猫小说","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":true},"compilerVersion":"4.36","entryPagePath":"pages/home/index","entryPageQuery":"","realEntryPagePath":"","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000},"tabBar":{"position":"bottom","color":"#808080","selectedColor":"#000","borderStyle":"black","blurEffect":"none","fontSize":"14px","iconWidth":"24px","spacing":"3px","height":"50px","list":[{"iconPath":"/static/icons/home.png","selectedIconPath":"/static/icons/home_select.png","pagePath":"pages/home/index","text":"首页"},{"iconPath":"/static/icons/book.png","selectedIconPath":"/static/icons/book_select.png","pagePath":"pages/bookshelf/bookshelf","text":"书架"},{"iconPath":"/static/icons/class.png","selectedIconPath":"/static/icons/class_select.png","pagePath":"pages/class/class","text":"分类"},{"iconPath":"/static/icons/user.png","selectedIconPath":"/static/icons/user_select.png","pagePath":"pages/user/user","text":"我的"}],"backgroundColor":"#ffffff","selectedIndex":0,"shown":true},"locales":{},"darkmode":false,"themeConfig":{}};
  const __uniRoutes = [{"path":"pages/home/index","meta":{"isQuit":true,"isEntry":true,"isTabBar":true,"tabBarIndex":0,"navigationBar":{},"isNVue":false}},{"path":"components/home/mid-area/mid-area","meta":{"navigationBar":{},"isNVue":false}},{"path":"pages/nove-detail/index","meta":{"navigationBar":{},"isNVue":false}},{"path":"pages/chapters/chapters","meta":{"navigationBar":{"style":"default","type":"default"},"isNVue":false}},{"path":"pages/read/read","meta":{"navigationBar":{},"isNVue":false}},{"path":"pages/bookshelf/bookshelf","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":1,"navigationBar":{},"isNVue":false}},{"path":"pages/class/class","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":2,"navigationBar":{},"isNVue":false}},{"path":"pages/user/user","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":3,"navigationBar":{},"isNVue":false}},{"path":"pages/search/search","meta":{"navigationBar":{},"isNVue":false}},{"path":"pages/comic-read/comic-read","meta":{"navigationBar":{},"isNVue":false}},{"path":"pages/history/history","meta":{"navigationBar":{"titleText":"浏览历史","type":"default"},"isNVue":false}}].map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute));
  __uniConfig.styles=[];//styles
  __uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  __uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:16})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:u,window:u,document:u,frames:u,self:u,location:u,navigator:u,localStorage:u,history:u,Caches:u,screen:u,alert:u,confirm:u,prompt:u,fetch:u,XMLHttpRequest:u,WebSocket:u,webkit:u,print:u}}}}); 
  })();
  