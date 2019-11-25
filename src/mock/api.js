import mock from "mockjs";
// 这个一个获取URL参数的方法
import { getParams } from "./utils";
// 创建通用的返回模板 用解构参数方式注入
const template = {
  status: 0,
  msg: "返回Mock数据"
};

mock.mock("http://your.domain.com/test", {
  ...template,
  "users|1-10": [
    {
      "id|+1": 1,
      name: "@cname",
      city: "@city",
      image: "@image"
    }
  ]
});

// 在这里编写你的逻辑代码

// 学习了mock 真的很让人兴奋 之后多用多熟练
// 这对我来说是一种全新的方式 谢谢老师

// 正则是真的不太会 很痛苦
// 老师是否有比较好的学习资料可以给我一些参考
mock.mock(/\/api\/lists/, options => {
  // 打印options
  console.log(options);
  //获取数量
  const num = getParams(options.url, "num");
  // 用对象的key 以变量的方式传入
  // 让代码更加清爽易懂一些
  // 参考链接 https://www.cnblogs.com/likewpp/p/11929134.html
  const data = `data|${num}`;
  const res = {
    ...template,
    [data]: [
      {
        "tid|+1": 1,
        title: "@title(2,5)",
        catalog: "index",
        "fav|1-20": 1,
        created: '@date("yyyy-MM-dd")',
        "isEnd|0-1": 0,
        "answer|0-100": 0,
        user: {
          avatar: "@image",
          name: "@cname",
          "isVip|0-1": 0,
          "level|0-10": 0
        }
      }
    ]
  };

  /*
    Mock.mock( rurl, rtype, function( options ) )
    记录用于生成响应数据的函数。当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回。
  */
  return mock.mock(res);
});
