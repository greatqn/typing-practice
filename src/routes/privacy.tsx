import { createFileRoute } from '@tanstack/react-router'
import { HomeIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/privacy')({
  component: Privacy
})

function Privacy() {
  return (
    <div className="flex-1 bg-base-100 dark:bg-base-300">
      <div className="container mx-auto max-w-3xl w-full py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-base-200 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            隐私政策
          </h1>
          
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">1. 信息收集</h2>
              <p>本应用收集以下数据：</p>
              <ul className="list-disc list-inside space-y-2">
                <li>本地存储的用户数据：
                  <ul className="list-disc list-inside ml-6 mt-2">
                    <li>用户自定义的练习文本</li>
                    <li>主题偏好设置</li>
                    <li>打字练习的统计数据</li>
                  </ul>
                </li>
                <li>匿名使用统计数据：
                  <ul className="list-disc list-inside ml-6 mt-2">
                    <li>使用 Umami Analytics 收集的匿名访问数据</li>
                    <li>使用 Google Analytics 收集的匿名使用统计</li>
                    <li>这些数据仅用于改进用户体验，不包含个人身份信息</li>
                  </ul>
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">2. 数据使用</h2>
              <p>我们收集的数据用于：</p>
              <ul className="list-disc list-inside space-y-2">
                <li>改进应用功能和用户体验</li>
                <li>分析用户使用模式和偏好</li>
                <li>识别和解决技术问题</li>
                <li>优化应用性能</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">3. 第三方服务</h2>
              <p>我们使用以下第三方分析服务：</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Umami Analytics
                  <ul className="list-disc list-inside ml-6 mt-2">
                    <li>收集匿名访问统计</li>
                    <li>不使用 cookies</li>
                    <li>完全遵守 GDPR 规范</li>
                  </ul>
                </li>
                <li>Google Analytics
                  <ul className="list-disc list-inside ml-6 mt-2">
                    <li>收集匿名使用数据</li>
                    <li>使用 cookies 跟踪用户会话</li>
                    <li>遵守 Google 的隐私政策</li>
                  </ul>
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">4. 用户选择</h2>
              <p>您可以通过以下方式控制数据收集：</p>
              <ul className="list-disc list-inside space-y-2">
                <li>使用浏览器的隐私设置禁用 cookies</li>
                <li>使用广告拦截器阻止分析脚本</li>
                <li>随时清除本地存储的数据</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">5. 数据安全</h2>
              <p>我们采取以下措施保护用户数据：</p>
              <ul className="list-disc list-inside space-y-2">
                <li>使用安全的数据传输协议</li>
                <li>定期审查数据收集实践</li>
                <li>限制数据访问权限</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">6. 政策更新</h2>
              <p>我们保留随时更新本隐私政策的权利。更新后的政策将在本页面上发布，继续使用本应用即表示您同意接受更新后的政策。</p>
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