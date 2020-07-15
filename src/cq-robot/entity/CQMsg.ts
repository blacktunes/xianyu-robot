export class CQMsg {
    /**
      * 将此消息继续传递给其他应用
      */
    static readonly MSG_IGNORE = 0;
    /**
     * 拦截此条消息，不再传递给其他应用 //注意：应用优先级设置为"最高"(10000)时，不得使用本返回值
     */
    static readonly MSG_INTERCEPT = 1;
}