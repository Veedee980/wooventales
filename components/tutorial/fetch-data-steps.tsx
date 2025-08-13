import { TutorialStep } from "./tutorial-step";
import { CodeBlock } from "./code-block";
import Link from "next/link";

const create = `create table notes (
  id bigserial primary key,
  title text
);

insert into notes(title)
values
  ('Today I created a Supabase project.'),
  ('I added some data and queried it from Next.js.'),
  ('It was awesome!');
`.trim();

const server = `import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data: notes } = await supabase.from('notes').select()

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}
`.trim();

const client = `'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [notes, setNotes] = useState<any[] | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('notes').select()
      setNotes(data)
    }
    getData()
  }, [])

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}
`.trim();

export function FetchDataSteps() {
  return (
    <ol className="flex flex-col gap-6 list-none">
      <li>
        <TutorialStep title="Create some tables and insert some data">
          <p>
            Head over to the{" "}
            <Link
              href="https://supabase.com/dashboard/project/_/editor"
              className="font-bold hover:underline text-foreground/80"
              target="_blank"
              rel="noreferrer"
            >
              Table Editor
            </Link>{" "}
            for your Supabase project to create a table and insert some example
            data. If you&apos;re stuck for creativity, you can copy and paste the
            following into the{" "}
            <Link
              href="https://supabase.com/dashboard/project/_/sql/new"
              className="font-bold hover:underline text-foreground/80"
              target="_blank"
              rel="noreferrer"
            >
              SQL Editor
            </Link>{" "}
            and click RUN!
          </p>
          <CodeBlock code={create} />
        </TutorialStep>
      </li>

      <li>
        <TutorialStep title="Query Supabase data from Next.js">
          <p>
            To create a Supabase client and query data from an Async Server
            Component, create a new <code>/app/notes/page.tsx</code> file and add
            the following code:
          </p>
          <CodeBlock code={server} />
          <p>Alternatively, you can use a Client Component:</p>
          <CodeBlock code={client} />
        </TutorialStep>
      </li>

      <li>
        <TutorialStep title="Explore the Supabase UI Library">
          <p>
            Head over to the{" "}
            <Link
              href="https://supabase.com/ui"
              className="font-bold hover:underline text-foreground/80"
              target="_blank"
              rel="noreferrer"
            >
              Supabase UI library
            </Link>{" "}
            and try installing some blocks. For example, you can install a
            Realtime Chat block by running:
          </p>
          <CodeBlock
            code={`npx shadcn@latest add https://supabase.com/ui/r/realtime-chat-nextjs.json`}
          />
        </TutorialStep>
      </li>

      <li>
        <TutorialStep title="Build in a weekend and scale to millions!">
          <p>You&apos;re ready to launch your product to the world! 🚀</p>
        </TutorialStep>
      </li>
    </ol>
  );
}
