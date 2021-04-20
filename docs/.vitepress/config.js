module.exports = {
    title: "leo",
    description: "保持一颗好奇的心，你会不断进步，变得更强！",
    head: [
        ["link", { rel: "icon", href: "/images/logo.jpg" }],
        ["link", { rel: "manifest", href: "/images/logo.jpg" }],
        ["link", { rel: "apple-touch-icon", href: "/images/logo.jpg" }]
    ],
    serviceWorker: true,
    base: "/",
    markdown: {
        lineNumbers: false
    },
    themeConfig: {
        logo: "/images/logo.jpg",
        nav: [
            { text: "首页", link: "/" },
            { text: "学习笔记", link: "/note/" },
            { text: "Github", link: "https://github.com/sjhleo" }
        ],
        sidebar: {
            "/note/": [
                {
                    text: "笔记",
                    collapsable: false,
                    children: [
                        { text: "概要", link: "/note/" },
                        { text: "异步循环", link: "/note/异步循环" }
                    ]
                }
            ]
        }

        // sidebarDepth: 2
    }
};
