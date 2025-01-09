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
          
          <div className="space-y-8 text-gray-700 dark:text-gray-300">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span>🎯 项目简介</span>
              </h2>
              <p>这是一个使用 Vite 构建的在线英文打字练习应用，旨在帮助用户提高英文打字速度和准确性。本应用提供了简洁直观的界面，让用户可以轻松进行打字练习和测试。</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span>✨ 特色功能</span>
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <span>📊 实时反馈</span>
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>实时速度和准确率统计</li>
                    <li>动态速度曲线图表显示</li>
                    <li>虚拟键盘布局显示</li>
                    <li>打字音效反馈</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <span>⚡ 个性化体验</span>
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>明暗主题切换</li>
                    <li>自定义文本本地存储</li>
                    <li>进度条实时显示</li>
                    <li>PWA 支持</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span>🌟 主要特点</span>
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <span>📚 多样化练习内容</span>
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>内置多个主题的练习文本</li>
                    <li>支持自定义练习文本</li>
                    <li>智能文本分段显示</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <span>📈 专业的统计分析</span>
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>WPM（每分钟字数）实时计算</li>
                    <li>准确率精确统计</li>
                    <li>错误字符分析</li>
                    <li>实时速度曲线展示</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <span>⚙️ 个性化设置</span>
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>字体大小调节</li>
                    <li>行高自定义</li>
                    <li>练习时长可调</li>
                    <li>声音开关控制</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span>📜 开源协议</span>
              </h2>
              <p>本项目基于 MIT 协议开源，您可以自由使用、修改和分发代码，但需要保留原作者的版权声明。</p>
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
