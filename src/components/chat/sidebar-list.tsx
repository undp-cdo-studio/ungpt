
export interface SidebarListProps {
  userId?: string
}

export async function SidebarList({ userId }: SidebarListProps) {
  // const chats = await getChats(userId)

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4">
        <h2 className="pt-4 pb-4 text-md font-semibold text-muted-foreground">Introduction</h2>
        <p className="text-sm text-muted-foreground pt-4">The United Nations Development Programme (UNDP) is a global entity that operates in diverse and complex contexts across the world.</p>
        <p className="text-sm text-muted-foreground pt-4">With the aim to eradicate poverty, reduce inequalities, and build resilience, UNDP projects require a rich blend of strategic planning, comprehensive understanding, and streamlined execution. At the intersection of these necessities lies a solution powered by modern technology, aimed at simplifying and streamlining these processes: our application, The UNDP Project Helper.</p>
        <p className="text-sm text-muted-foreground pt-4">This application leverages state-of-the-art language processing technology, specifically OpenAI's GPT-4, to aid in generating project descriptions, summaries, and several other key project planning components, based on user inputs. The purpose of this application is to provide UNDP officers and stakeholders a smart tool that enhances productivity, provides a deeper understanding of projects, and ultimately aids in creating impactful and sustainable solutions for the global community.</p>
        <p className="text-sm text-muted-foreground pt-4">The choice of GPT-4 as the underlying technology brings several advantages. The GPT-4 model, a part of the Generative Pretrained Transformer (GPT) family developed by OpenAI, represents the pinnacle of language processing AI as of the time of this application's development. It's capable of understanding context, generating creative and diverse outputs, and learning from feedback, making it a powerful tool for a wide range of language generation tasks.</p>
        <p className="text-sm text-muted-foreground pt-4">In the following sections, we delve into the specifics of how this application harnesses the power of GPT-4, and detail the flow of data and logic within the application to provide users with an easy-to-use tool.</p>
      </div>
      <div className="p-4">
        <h2 className="pt-4 pb-4 text-md font-semibold text-muted-foreground">Speaking with Humans</h2>
        <p className="text-sm text-muted-foreground pt-4">Human-Centered Design lies at the heart of our approach to creating this tool. We recognize the immense effort required in drafting project documents, often culminating in a repetitive and time-intensive process rife with 'copy-pasting'. To alleviate these challenges and make the process more efficient, we decided to turn to AI. But first, we needed to understand the human side of the equation.</p>
        <p className="text-sm text-muted-foreground pt-4">We conducted around ten interviews with individuals across different levels of the organization and geographic locations. The interviews were illuminating, shedding light on key areas of difficulty, particularly the Theory of Change and strategy sections of the ProDocs. Our users expressed the need for a tool to assist them with these parts, as well as a mechanism for assessing the quality of ProDocs. These insights have been instrumental in shaping our design and development process.</p>
      </div>
      <div className="p-4">
        <h2 className="pt-4 pb-4 text-md font-semibold text-muted-foreground">How to write a good prompt</h2>
        <p className="text-sm text-muted-foreground pt-4"><span className="font-bold">Define the AI's Role:</span> Clearly specifying the role you want ChatGPT to play, such as a social media advisor or a personal development coach, can direct its responses more effectively.</p>
        <p className="text-sm text-muted-foreground pt-4"><span className="font-bold">Provide Specific, Detailed Tasks:</span> It's important to give ChatGPT precise and comprehensive instructions. For example, instead of a vague request for a blog post, specify details like the target audience, style, and content elements.</p>
        <p className="text-sm text-muted-foreground pt-4"><span className="font-bold">Include Relevant Context:</span> Adding background information and context can greatly improve the AI's output. This can involve specifying your writing style, the purpose of the text, or the background of the topic.</p>
        <p className="text-sm text-muted-foreground pt-4"><span className="font-bold">Use Examples for Guidance:</span> Providing examples helps ChatGPT understand and replicate the desired style or format, allowing for more targeted and accurate outputs.</p>
        <p className="text-sm text-muted-foreground pt-4"><span className="font-bold">Establish Clear Rules:</span> Outlining specific rules for the AI to follow can enhance the quality of its responses, whether it's a formatting preference or a language style.</p>
        <p className="text-sm text-muted-foreground pt-4"><span className="font-bold">Set Defined Constraints:</span> In addition to rules, stating what the AI should avoid can refine its responses further. This might include avoiding certain phrases, styles, or approaches.</p>
        <p className="text-sm text-muted-foreground pt-4"><span className="font-bold">Iterative Evaluation and Improvement:</span> Continuously evaluate and refine your prompts based on the AI's performance. This process is iterative and may require several adjustments to achieve the desired result.</p>
      </div>
      <div className="p-4">
        <h2 className="pt-4 pb-4 text-md font-semibold text-muted-foreground">On Privacy & Security</h2>
        <p className="text-sm text-muted-foreground pt-4">Maintaining user privacy and providing a seamless experience are core principles that guided the design and implementation of the Content Co-pilot application. We leverage the powerful features of the Next.js framework and the Microsoft Enterprise contract with OpenAI to uphold these principles.</p>
        <p className="text-sm text-muted-foreground pt-4">Sensitive user data is not stored or persistently logged, thus maintaining high standards of data privacy and security.</p>
        <p className="text-sm text-muted-foreground pt-4">UNDP, understanding the importance of data privacy, has taken additional steps to ensure the confidentiality and security of the data processed by the AI model. Instead of using the public version of OpenAI, UNDP leverages its Microsoft Enterprise contract to run an instance of the OpenAI model on Azure.</p>
        <p className="text-sm text-muted-foreground pt-4">This setup ensures that the data processed by the GPT model never leaves UNDP servers. Every piece of information provided by the user, processed by the AI, and all the generated outputs, remain within the secured, UNDP-controlled environment. This not only guarantees robust data protection, but also complies with UNDP's commitment to uphold data privacy standards.</p>
      </div>
      <div className="p-4">
        <h2 className="pt-4 pb-4 text-md font-semibold text-muted-foreground">What we are not doing</h2>
        <p className="text-sm text-muted-foreground pt-4">While our application leverages cutting-edge AI to aid in project planning, it is important to note the boundaries we have established to uphold ethics and privacy.</p>
        <p className="text-sm text-muted-foreground pt-4">The system does not perform any broad machine learning across the organization's internal project documents or confidential data. There is no "training" of the AI model on sensitive materials. The system is not connected to any other internal UNDP databases or datasets. It operates only on the inputs directly provided by each individual user. This isolates each use case and prevents any unintentional data leaks across projects.</p>
        <p className="text-sm text-muted-foreground pt-4">Critically, each use of the tool is completely unique - the system does not "learn" or remember across different users. No data, inputs, or outputs are persistently stored or logged.</p>
        <p className="text-sm text-muted-foreground pt-4">This approach aligns with UNDP's commitment to privacy while harnessing AI's benefits. The aim is an ethical, sustainable solution that augments human expertise, not replaces it. By focusing the technology only on the task at hand and avoiding overreach, we achieve impact while protecting values.</p>
      </div>
    </div>
  )
}
