var client=function (argument) {
			// body...
			//呈现引擎
			var engine={
				ie:0,
				gecko:0,
				webkit:0,
				khtml:0,
				opera:0,
				//完整的版本号
				ver:null
			};
			//浏览器
			var browser={
				//主要浏览器
				ie:0,
				firefox:0,
				safari:0,
				konq:0,
				opera:0,
				chrome:0,
				//具体的版本号
				ver:null
			};
			//平台、设备和操作系统
			var system={
				win:false,
				mac:false,
				xll:false,
				//移动设备
				iphone:false,
				ipod:false,
				ipad:false,
				ios:false,
				android:false,
				nokiaN:false,
				winMobile:false,
				//游戏系统
				wii:false,
				ps:false
			};
			//检测呈现引擎和浏览器
			var ua=navigator.userAgent;
			if (window.opera) {
				engine.ver=browser.ver=window.opera.version();
				engine.opera=browser.opera=parseFloat(engine.ver);
			}else if (/AppleWebKit\/(\S+)/.test(ua)) {
				engine.ver=RegExp["$1"];
				engine.webkit=parseFloat(engine.ver);
				//确定是Chrome 还是 Safari
				if (/Chrome\/(\S+)/.test(ua)) {
					browser.ver=RegExp["$1"];
					browser.chrome=parseFloat(browser.ver);
				}else if (/Version\/(\S+)/.test(ua)) {
					browser.ver=RegExp["$1"];
					browser.safari=parseFloat(browser.ver);
				}else{
					//近似的确定版本号
					var safariVersion=1;
					if (engine.webkit<100) {
						safariVersion=1;
					}else if (engine.webkit<312) {
						safariVersion=1.2;
					}else if (engine.webkit<412) {
						safariVersion=1.3;
					}else{
						safariVersion=2;
					}
					browser.safari=browser.ver=safariVersion;
				}
			}else if (/KHTML\/(\S+)/.test(ua)||/Konqueror\/([^;]+)/.test(ua)) {
				engine.ver=browser.ver=RegExp["$1"];
				engine.khtml=browser.konq=parseFloat(engine.ver);
			}else if (/ru:([^\)]+)\)Gecko\/\d{8}/.test(ua)) {
				engine.ver=RegExp["$1"];
				engine.gecko=parseFloat(engine.ver);
				//确定是不是firefox
				if (/Firefox\/(\S+)/.test(ua)) {
					browser.ver=RegExp["$1"];
					browser.firefox=parseFloat(engine.ver);
				}
			}else if (/MSIE([^;]+)/.test(ua)) {
				engine.ver=browser.ver=RegExp["$1"];
				engine.ie=browser.ie=parseFloat(engine.ver);
			}
			//检测浏览器
			browser.ie=engine.ie;
			browser.opera=engine.opera;


			//检测平台
			var p=navigator.platform;
			system.win=p.indexOf("Win")==0;
			system.mac=p.indexOf("Mac")==0;
			system.xll=(p=="Xll")||(p.indexOf("Linux")==0);

			//检测windows操作系统
			if (system.win) {
				if(/Win(?:dows)?([^do]{3})\s?(\d+\.\d+)?/.test(ua)){
					if (RegExp["$1"]=="NT") {
						switch(RegExp["$2"]){
							case"5.0":
								system.win="2000";
								break;
							case"5.1":
								system.win="XP";
								break;
							case"6.0":
								system.win="Vista";
								break;
							case"6.1":
								system.win="7";
								break;
							case"6.4":
							case"10":
								system.win="Windws 10";
								break;	
							default:
								system.win="NT";
								break;
						}
					}else if (RegExp["$1"]=="9x") {
						system.win="ME";
					}else{
						system.win=RegExp["$1"];
					}
				}
			}

			//移动设备
			system.iphone=ua.indexOf("iphone")>-1;
			system.iphone=ua.indexOf("ipod")>-1;
			system.iphone=ua.indexOf("ipad")>-1;
			system.iphone=ua.indexOf("NokiaN")>-1;

			//windows  mobile
			if (system.win=="CE") {
				system.winMobile=system.win;
			}else if (system.win=="ph") {
				if (/Windows Phone OS(\d+.\d)/.test(ua)) {
					system.win="Phone";
					system.winMobile=parseFloat(RegExp["$1"]);
				}
			}
			//检测ios版本
			if (system.mac&&ua.indexOf("Mobile")>-1) {
				if (/CPU(?:iphone)?OS(\d+.\d+)/.test(ua)) {
					system.ios=parseFloat(RegExp.$1.replace("_","."));
				}else{
					system.ios=2;//不能正在检测出来，猜测
				}
			}
			//检测androi版本
			if (/Android(\d+.\d+)/.test(ua)) {
				system.android=parseFloat(RegExp.$1);
			}
			//游戏系统
			system.wii=ua.indexOf("Wii")>-1;
			system.ps=/playstation/i.test(ua);

			//返回这些对象
			return{
				engine:engine,
				browser:browser,
				system:system
			}

		}();