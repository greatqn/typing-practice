import { createFileRoute } from '@tanstack/react-router'
import { HomeIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/about-us')({
  component: AboutUs
})

function AboutUs() {
  return (
    <div className="flex-1 bg-base-100 dark:bg-base-300">
      <div className="container mx-auto max-w-3xl w-full py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-base-200 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            关于我们
          </h1>
          
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">项目简介</h2>
              <p>在线英文打字练习是一个开源的打字练习应用，旨在帮助用户提高英文打字速度和准确性。本项目采用现代化的网页技术开发，提供直观的用户界面和实时反馈功能。</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">核心功能</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>实时速度和准确率统计</li>
                <li>动态速度曲线图表显示</li>
                <li>虚拟键盘布局显示</li>
                <li>打字音效反馈</li>
                <li>明暗主题切换</li>
                <li>自定义文本本地存储</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">技术栈</h2>
              <p>本项目使用以下技术栈开发：</p>
              <ul className="list-disc list-inside space-y-2">
                <li>React.js + TypeScript</li>
                <li>Tailwind CSS + DaisyUI</li>
                <li>Zustand 状态管理</li>
                <li>TanStack Router 路由管理</li>
                <li>Vite 构建工具</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">开源协议</h2>
              <p>本项目基于 MIT 协议开源，您可以自由使用、修改和分发代码，但需要保留原作者的版权声明。详细信息请参阅 GitHub 仓库中的 LICENSE 文件。</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">联系我们</h2>
              <p>如果您有任何问题、建议或合作意向，欢迎通过以下方式联系我们：</p>
              <ul className="list-disc list-inside space-y-2">
                <li>GitHub：<a href="https://github.com/wincatcher" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">@wincatcher</a></li>
                <li>电子邮件：wincatcher [at] gmail [dot] com</li>
                <li>个人主页：<a href="https://bento.me/wincatcher" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">https://bento.me/wincatcher</a></li>
              </ul>
            </section>
          </div>

          <div className="mt-8 text-center">
            <Link to="/">
              <button className="btn btn-success btn-outline">
                <HomeIcon className="w-5 h-5" />
                返回首页
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
