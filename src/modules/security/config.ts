/**
 * 模块的配置
 */
export default () => {
  return {
    name: '安全模块',
    description: '',
    /** 用户配置 */
    user: {
      password: {
        /** 密码最大错误次数 */
        maxRetryCount: 5,
        /** 账号锁定时间 单位分钟(默认10分钟) */
        lockTime: 10
      }
    },
  }
};
