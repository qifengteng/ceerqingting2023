// https://blog.csdn.net/jimojianghu/article/details/128792748
// 在介绍 pre-commit 的时候，我们使用了 npx eslint src 命令来处理代码规范
// 但它存在一个问题，就是每次git提交都会对整个项目src中的所有文件都进行检测，很多时候这是不需要的，最好的方法就是对新修改的代码进行检测。
// 而 lint-staged 工具就是基于此，只针对提交的代码文件进行检查处理

module.exports = {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": ["prettier --write--parser json"],
    "package.json": ["prettier --write"],
    "*.vue": ["eslint --fix", "prettier --write", "stylelint --fix"],
    "*.{scss,less,styl,html}": ["stylelint --fix", "prettier --write"],
    "*.md": ["prettier --write"]
};
