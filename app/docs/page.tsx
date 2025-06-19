import { allDocs } from 'contentlayer/generated'
import { allCoreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Link from '@/components/Link'

export const metadata = genPageMetadata({ title: 'Documentation' })

interface DocItem {
  name: string
  path: string
  href?: string
  children: DocItem[]
  isDirectory: boolean
}

// 构建目录结构
function buildDirectoryStructure(docs: any[]): DocItem[] {
  const result: DocItem[] = []
  const pathMap: { [key: string]: DocItem } = {}
  
  // 创建所有路径节点
  docs.forEach((doc) => {
    const pathParts = doc.slug.split('/')
    
    pathParts.forEach((part, index) => {
      const currentPath = pathParts.slice(0, index + 1).join('/')
      const isFile = index === pathParts.length - 1
      
      if (!pathMap[currentPath]) {
        pathMap[currentPath] = {
          name: part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          path: currentPath,
          href: isFile ? `/docs/${doc.slug}` : undefined,
          children: [],
          isDirectory: !isFile
        }
      }
    })
  })
  
  // 建立父子关系
  Object.keys(pathMap).forEach(path => {
    const pathParts = path.split('/')
    if (pathParts.length === 1) {
      result.push(pathMap[path])
    } else {
      const parentPath = pathParts.slice(0, -1).join('/')
      const parent = pathMap[parentPath]
      if (parent) {
        parent.children.push(pathMap[path])
      }
    }
  })
  
  // 排序
  function sortItems(items: DocItem[]): DocItem[] {
    return items.sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1
      if (!a.isDirectory && b.isDirectory) return 1
      return a.name.localeCompare(b.name)
    }).map(item => ({
      ...item,
      children: sortItems(item.children)
    }))
  }
  
  return sortItems(result)
}

// 渲染目录结构
function renderDirectoryStructure(items: DocItem[], depth = 0): React.ReactNode {
  return (
    <div className={`${depth > 0 ? 'ml-6 mt-4' : ''}`}>
      {items.map((item, index) => (
        <div key={`${item.path}-${index}`} className="mb-4">
          {item.isDirectory ? (
            // 目录
            <div>
              <h3 className={`${depth === 0 ? 'text-xl' : 'text-lg'} font-semibold text-gray-900 dark:text-gray-100 mb-3`}>
                📁 {item.name}
              </h3>
              {item.children.length > 0 && renderDirectoryStructure(item.children, depth + 1)}
            </div>
          ) : (
            // 文件
            <Link
              href={item.href!}
              className="block rounded-lg border border-gray-200 p-4 hover:bg-gray-50 hover:border-gray-300 transition-colors dark:border-gray-700 dark:hover:bg-gray-800 dark:hover:border-gray-600"
            >
              <div className="flex items-center">
                <span className="mr-3 text-lg">📄</span>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {item.path}
                  </p>
                </div>
              </div>
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}

export default function DocsPage() {
  const docs = allCoreContent(allDocs)
  const directoryStructure = buildDirectoryStructure(docs)

  return (
    <SectionContainer>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <PageTitle>Documentation</PageTitle>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Browse documentation organized by directory structure
          </p>
        </div>
        
        <div className="py-8">
          {directoryStructure.length > 0 ? (
            renderDirectoryStructure(directoryStructure)
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No documentation found. Create some `.md` files in the `data/docs/` directory to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </SectionContainer>
  )
} 