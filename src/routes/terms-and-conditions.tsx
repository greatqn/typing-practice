
import { createFileRoute } from '@tanstack/react-router'
import { HomeIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/terms-and-conditions')({
  component: TermsAndConditions
})

function TermsAndConditions() {
  return (
    <div className="flex-1 bg-base-100 dark:bg-base-300">
      <div className="container mx-auto max-w-3xl w-full py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-base-200 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            使用条款
          </h1>
          
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">1. 服务条款</h2>
              <p>欢迎使用在线英文打字练习应用。使用本应用即表示您同意遵守这些条款。如果您不同意这些条款，请勿使用本应用。</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">2. 使用许可</h2>
              <p>本应用基于 MIT 协议开源，您可以：</p>
              <ul className="list-disc list-inside space-y-2">
                <li>免费使用、复制和分发本应用</li>
                <li>修改源代码并发布修改后的版本</li>
                <li>将本应用用于商业用途</li>
                <li>在遵守开源协议的前提下自由使用本应用的源代码</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">3. 免责声明</h2>
              <p>本应用按"现状"提供，不提供任何形式的保证，包括但不限于：</p>
              <ul className="list-disc list-inside space-y-2">
                <li>适用性保证</li>
                <li>特定用途适用性保证</li>
                <li>准确性保证</li>
                <li>不侵犯第三方权利的保证</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">4. 责任限制</h2>
              <p>在任何情况下，本应用的开发者和贡献者均不对因使用本应用而导致的任何直接、间接、偶然、特殊或后果性损害承担责任。</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">5. 用户行为</h2>
              <p>使用本应用时，您同意：</p>
              <ul className="list-disc list-inside space-y-2">
                <li>不以任何方式干扰应用的正常运行</li>
                <li>不进行任何可能损害应用或其他用户的行为</li>
                <li>不使用自动化工具或脚本干扰应用功能</li>
                <li>遵守所有适用的法律法规</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">6. 条款修改</h2>
              <p>我们保留随时修改这些条款的权利。修改后的条款将在本页面上发布。继续使用本应用即表示您接受修改后的条款。</p>
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