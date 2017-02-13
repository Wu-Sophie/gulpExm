gulp打包项目
========================
作者：sophie

1、安装node.js python ruby-sass
2、安装gulp及其他相应得工具，并编写gulpfile.js(可以npm init初始化package.json文件)
3、安装bower bower init初始化bower.json文件，新建.bowerrc制定bower安装目录，并安装插件
4、代码中本地服务环境gulp指令为gulp serve；
    bulid：为开发目录:
        imgs图片文件夹
        sass:sass开发文件夹
        js:开发文件夹
        views：html目录
5、生产发布编译指令gulp bulid:serve
    public:生产目录
        bower_components:bower安装目录
        css:生产用css
        fonts：开发用户自定义字体图标
        imgs:生产图片
        js：生产js
    rev:md5版本号json文件目录
    src:生产html目录