import { allDocs } from 'contentlayer/generated'
import { allCoreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Link from '@/components/Link'

export const metadata = genPageMetadata({ title: 'Documentation' })

export default function DocsPage() {
  const docs = allCoreContent(allDocs)
  
  // 按文件夹分组文档
  const groupedDocs = docs.reduce((acc, doc) => {
    const folder = doc.navPath || 'General'
    if (!acc[folder]) {
      acc[folder] = []
    }
    acc[folder].push(doc)
    return acc
  }, {} as Record<string, typeof docs>)

  return (
    <SectionContainer>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <PageTitle>Documentation</PageTitle>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Browse all documentation organized by topics
          </p>
        </div>
        
        <div className="py-8">
          {Object.entries(groupedDocs).map(([folder, folderDocs]) => (
            <div key={folder} className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
                {folder === 'General' ? 'General' : folder.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {folderDocs.map((doc) => (
                  <Link
                    key={doc.slug}
                    href={`/docs/${doc.slug}`}
                    className="block rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                  >
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      {doc.title}
                    </h3>
                    {doc.path && (
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {doc.path.replace('docs/', '')}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
} 