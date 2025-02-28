import * as React from 'react'
import ReactMarkdown from 'react-markdown'

interface MarkdownProps {
	children: string
	className?: string
	components?: React.ComponentProps<typeof ReactMarkdown>['components']
	remarkPlugins?: React.ComponentProps<typeof ReactMarkdown>['remarkPlugins']
}

const MarkdownComponent: React.FC<MarkdownProps> = ({
	children,
	className,
	components,
	remarkPlugins
}) => (
	<ReactMarkdown
		className={className}
		components={components}
		remarkPlugins={remarkPlugins}
	>
		{children}
	</ReactMarkdown>
)

MarkdownComponent.displayName = 'MarkdownComponent'

export const MemoizedReactMarkdown = React.memo(
	MarkdownComponent,
	(prevProps, nextProps) =>
		prevProps.children === nextProps.children &&
		prevProps.className === nextProps.className
)

MemoizedReactMarkdown.displayName = 'MemoizedReactMarkdown'
