
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@/components/ui/icons'

export const exampleMessages = [
  {
    heading: 'Get started',
    message: '/start'
  },
  {
    heading: 'Draft a concept note',
    message: 'Draft a concept note of the following document'
  },
  // {
  //   heading: 'Use an expert template',
  //   message: 'Use an existing infrastructure template to draft a Project Document'
  // },
  // {
  //   heading: 'Change language',
  //   message: '/language Español'
  // },
]

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome to the Content Co-pilot! 👋
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          Welcome to the Content Co-pilot, built to help you to draft, review and improve documents.
        </p>
        <p className="leading-normal text-muted-foreground">
          Type <strong>/start</strong> to kick-off the document writing process, tap the paperclip icon to upload a supporting document, or use one of the example prompts below.
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              // onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
