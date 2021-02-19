module.exports = {
  title: '咸鱼Bot',
  description: '一个自用的Bot框架',
  base: '/xianyu-robot/',
  themeConfig: {
    sidebarDepth: 2,
    lastUpdated: 'Last Updated',
    nav: [
      { text: '指南', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com/blacktunes/xianyu-robot' }
    ],
    sidebar: [
      ['/guide/', '指南'],
      ['/plugins/', '插件'],
      ['/cqcode/', 'CQCode'],
      ['/event/', 'Event']
    ]
  }
}
