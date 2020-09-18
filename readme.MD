webpack性能优化
1.开发环境性能优化
    优化打包构建速度
        修改一个文件会导致项目全部文件重新打包一次.使用HMR功能可以避免这个问题
            css文件可以使用HMR。由于css-loader内部实现了
            js文件不能使用，需要修改js代码，添加支持HMR的代码
            html文件一般不需要使用HMR，默认不支持。
    优化代码调试
        source-map :一种提供源代码到构建后代码映射的工具 ,方便从构建后代码错误追踪到源代码错误。
        /* 
            source-map:  一种 提供源代码到构建后代码映射 技术 （如果构建后代码出错，可以通过映射追踪到源代码错误）
                
            格式：[inline- | hidden- | eval-][nosources-][cheap-[module-]]source-map
                可以任意排列，但[]的顺序不能乱

            具体介绍

            source-map: 在外部生成一个文件
                在控制台会显示 错误代码准确信息 和 可以追踪源代码
            inline-source-map: 内嵌到bundle.js中
                只生成一个source-map
                在控制台会显示 错误代码准确信息 和 可以追踪源代码
            hidden-source-map: 外部
                提示错误代码的错误原因，只能提示到构建后代码的错误位置
                不能追踪源代码
            eval-source-map： 内嵌
                每一个文件都生成对应的source-map
                错误代码准确信息，可以追踪源代码
            nosources-source-map: 外部
                错误代码准确信息，提示错误在源代码的位置
                不能追踪源代码
            cheap-source-map: 外部
                错误代码准确信息，可以追踪源代码
                只能精确到错误所在行
            cheap-module-source-map: 外部
                错误代码准确信息，源代码的错误位置
                module会将loader的source-map加入


                内嵌与外部的区别： 1.外部生成单独的文件，内嵌没有 2.内嵌构建速度快

                这么多source-map如何选择？
                开发环境：速度快，调试更友好
                速度快（ eval>inline>cheap>··· ）
                    组合eval-cheap-source-map > eval-source-map
                调试更友好
                    source-map > cheap-module-source-map > cheap-source-map
                最终结果：cheap-module-source-map 和 eval-source-map (vuecli与react脚手架默认)
                
                生产环境：源代码要不要隐藏？调试要不要更友好
                内嵌会让代码体积变大，所以在生产环境下不用内嵌
                nosources-source-map  全部隐藏
                hidden-source-map   只隐藏源代码，会提示构建后代码错误信息
                最终结果：source-map 和 cheap-module-source-map
            */

2.生产环境性能优化
    优化打包构建速度
    优化代码运行性能


3.oneof

4.缓存 
    （1）babel 缓存   cache-Directory 问题：强制缓存期间的修改不能生效
    （2）资源缓存   给文件名加上hash值，每次文件打包都会生成一个hash值 
        contenthash：根据文件内容生成hash值，不同文件hash值不一样

5.tree shaking  作用 ：去掉无用代码
    使用前提  1.必须使用es6模块化 2.开启production环境 自动开启树摇
    有些版本会出现css代码被当成无用代码的现象，这时需要在package.json中配置 "sideEffects":["*.css"]

6.代码分割  code_split  并行加载 速度更快
   方法一： optimization配置 
    (单页面)可以把node_moduls中的代码单独打包成一个chunk最终输出
    (对多页面配置)自动分析多入口chunk中，有没有公共的文件，如果有，只会单独打包一次
       optimization配置 <!-- optimization: { //code split 方法  可以把node_moduls中的代码单独打包成一个chunk最终输出,
        splitChunks: {
            chunks: "all"
        }
    }, -->
    方法二： 通过js 代码让某个文件单独打包成一个chunk
      import ('/xx.js/').then( (x,x,x) =>{
          console.log('这样就把xx.js文件单独打包了')
      })

7.懒加载  触发条件才加载 (运用import异步回调) 不会重复加载，第二次调用会从缓存中加载。需要使用时才加载
    import(......).then( () =>)
  预加载 prefetch 先加载 但是不执行。等其他资源加载完毕再加载。
  正常加载 同时加载

8.PWA  渐进式网络开发应用程序 ,可以离线访问.
    workbox-webpack-plugin  // npm i workbox-webpack-plugin -D
    帮助servicewordker快速启动，删除旧的serviceworker

9.多进程打包 :优化打包速度
    // 大型项目 打包时间比较长的时候使用,主要对 js 文件使用
    安装 npm i thread-loader -D  
10. externals  忽略指定文件打包,但是要在html中用script 标签引入文件

11.dll  对jq,react,vue 进行单独打包

webapck 配置 
resolve:{
    alias :{ //配置解析模块路径别名 (针对路径层级很深，路径名很长的情况)
        $css:resolve(__dirname,'src/css')  //设置变量名，在项目文件中再写路径的时候可以用此变量代替
    },
    extensions: ['.js','.json','.css']  //配置省略文件路径的后缀  默认省略js json文件的路径名的后缀
    modules:[resolve(:__dirname),'../../node_modules','node_modules']  //告诉webapck 解析模块去哪个目录找对应的文件
    
}

devServer:{  //开发服务器
    contentBase:resolve(__dirname,'build'), //运行代码的目录
    watchContentBase:true,//监视contentBase目录下所有文件，一旦变化就好reload
    watchOptions:{  //监听配置
        ignored:'/node_modules/'  //有些文件不需要监听就写在这里
    }
    compress:true, //使用gzip压缩，打包后的每个文件是gzip压缩文件形式
    port:8080,//
    host:'localhost',//域名
    open:true,//自动打开浏览器
    hot:true ,//开启热模块加载
    clientLogLevel:'none',//不显示启动服务器日志信息
    quiet:true，//如果出错了，不要全屏显示
    proxy:{  //服务器代理
        'api':{  //一旦devServer接受到api/xx/请求，那么会以taget的指向的地址代理这个请求
            target:'http://loaclhost:3000',
            pathRewrite:{  //在代理的同时 对/api/xx进行改写
                '^/api':'xxxxxx'
            }
        }
    }
},
optimazation:{
    //必须在生产环境下
    splitChunks:{
        chunks:'all',
        minSize:30*1024,//分割大chunk最小为30kb
        maxSize
    }
}

document.domain 

location.

