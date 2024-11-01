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
              <p>本应用仅在本地存储必要的用户数据，包括：</p>
              <ul className="list-disc list-inside space-y-2">
                <li>用户自定义的练习文本</li>
                <li>主题偏好设置</li>
                <li>打字练习的统计数据</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">2. 数据存储</h2>
              <p>所有数据均存储在用户本地浏览器中：</p>
              <ul className="list-disc list-inside space-y-2">
                <li>不收集或上传任何个人信息</li>
                <li>不使用 Cookies 追踪用户行为</li>
                <li>不与第三方共享任何数据</li>
                <li>用户可随时清除浏览器数据来删除所有本地存储的信息</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">3. 数据安全</h2>
              <p>我们采取以下措施保护用户数据：</p>
              <ul className="list-disc list-inside space-y-2">
                <li>所有数据仅保存在用户设备本地</li>
                <li>不进行任何形式的网络传输</li>
                <li>使用现代化的安全存储机制</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">4. 用户权利</h2>
              <p>作为用户，您拥有以下权利：</p>
              <ul className="list-disc list-inside space-y-2">
                <li>随时删除本地存储的数据</li>
                <li>选择是否使用本地存储功能</li>
                <li>导出或清除练习记录</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">5. 开源承诺</h2>
              <p>作为开源项目，我们承诺：</p>
              <ul className="list-disc list-inside space-y-2">
                <li>保持代码透明度</li>
                <li>不添加任何跟踪或监控代码</li>
                <li>欢迎社区审查和贡献</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">6. 政策更新</h2>
              <p>我们可能会不时更新本隐私政策。任何更改都将在本页面上公布。继续使用本应用即表示您同意接受更新后的隐私政策。</p>
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