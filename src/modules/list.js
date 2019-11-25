import { HTTP } from "../utils/http";

/*
老师有时间帮我看看我的HTTP封装里的异常处理
异常处理我做的很少
感觉也是很有必要
*/


class ListModel extends HTTP {
  // getList 请求
  getList({ page, num }) {
    return this.get("api/lists", {
      page,
      num
    });
  }
  // test 请求
  test(){
    return this.get('test')
  }
}

export { ListModel };
