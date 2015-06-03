var ModalDialogueBox = cc.LayerColor.extend({  
	_listener: null,  
	ctor: function() {
		this._super(cc.color.BLACK);  
		this.ignoreAnchorPointForPosition(false);//忽略锚点设置为false，默认为true，锚点(0, 0)  
		this.setOpacity(128);       //透明度 
		cc.log("dialogbox ctor");
		//初始化对话框  
		this._initDialog();  

		return true;  
	},  

	onEnter: function()  
	{  
		cc.log("dialogbox onenter");
		this._super();  
		//监听器  
		this._listener = new cc.EventListener.create({  
			event: cc.EventListener.TOUCH_ONE_BY_ONE,  
			swallowTouches: false,  
			onTouchBegan: function(touch, event)  
			{  
				cc.log("touch touch");
				return true;  
			}  
		});  

		//添加触摸监听  
		cc.eventManager.addListener(this._listener, this);  
	},  

	//初始化对话框  
	_initDialog: function()  
	{  
		var winSize = cc.winSize;  

		//背景  
		var bg = new cc.Sprite(res.Pop_jpg);  
		bg.setPosition(cc.p(winSize.width / 2, winSize.height / 2));  
		this.addChild(bg, 0, 101);  

		//OK按钮  
		var OKLabel = new cc.LabelTTF("OK", "Arial", 36);  
		var OKMenuItem = new cc.MenuItemLabel(OKLabel, this._onCallback, this);  
		OKMenuItem.setPosition(cc.p(100, 50));  

		//Cancel按钮  
		var cancelLabel = new cc.LabelTTF("Cancel", "Arial", 36);  
		var cancelMenuItem = new cc.MenuItemLabel(cancelLabel, this._onCallback, this);  
		cancelMenuItem.setPosition(cc.p(250, 50));  

		//菜单  
		var menu = new cc.Menu(OKMenuItem, cancelMenuItem);  
		menu.setPosition(cc.p(0, 0));  
		bg.addChild(menu);      //注意是添加到背景里面  
	},  

	_onCallback: function()  
	{  
		//this.hidden();
		cc.log("call back function");
	},  

	
	onExit: function()  
	{
		this._super();
		//移除触摸监听
		cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE, true);
	}
});