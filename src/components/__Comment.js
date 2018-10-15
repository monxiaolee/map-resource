var __IDGEN = 100;

class Comment{
    resize(){

    }

    GenId(){
        return ++__IDGEN;
    }
}
export default Comment;

// export default 和 import 对应的
// 有时间看下require和import的区别和联系 导出模块引入模块的区别
// module.exports = Comment;