import dayjs from 'dayjs'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <header className="bg-base-100 text-base-content shadow-sm px-2 border-b-2">
        <h1 className="text-accent text-2xl">choral</h1>
      </header>
      <main>
        <Channel messages={sampleLog} />
      </main>
    </>
  )
}

function ChatLine({ message }: { message: ChatMessage }) {
  const { time, nick, content } = message

  return (
    <tr>
      <th>{dayjs(time).format('HH:mm')}</th>
      <td>
        {nick} {content}
      </td>
    </tr>
  )
}

function Channel({ messages }: { messages: ChatMessage[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <tbody>
          {messages.map((msg, i) => (
            <ChatLine message={msg} key={i} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

type ChatMessage = {
  time: string
  nick: string
  content: string
}

function createSampleLog() {
  const messages: ChatMessage[] = []
  log.forEach((line) => {
    const [time, nick, ...rest] = line.split(' ')
    const content = rest.join(' ')

    messages.push({
      time,
      nick,
      content,
    })
  })

  return messages
}

const log = [
  '2023-08-13T10:13:47.181Z @bobby Officia enim magna ex irure sit velit cupidatat commodo laborum ea elit sunt.',
  '2023-08-13T10:13:55.956Z Annabelle Irure occaecat Lorem eu amet sunt amet labore amet ut id.',
  '2023-08-13T10:14:36.267Z @Sonic Sint consectetur laborum ullamco non culpa sunt cupidatat sunt id et laborum esse aliqua elit et.',
  '2023-08-13T10:14:37.269Z @Sonic Id exercitation labore in dolore est amet eu et eiusmod enim.',
  '2023-08-13T10:15:11.762Z Annabelle Est id do eiusmod occaecat laboris consectetur.',
  '2023-08-13T10:15:13.782Z Annabelle Sunt ea nisi tempor sint esse id.',
  '2023-08-13T10:15:37.987Z Annabelle Elit exercitation sit eiusmod enim Lorem proident deserunt aute.',
  '2023-08-13T10:15:39.546Z @bobby Id do eiusmod esse dolor tempor sit esse consectetur dolore labore nulla do in non.',
  '2023-08-13T10:16:02.725Z @Sonic Exercitation officia dolor consequat commodo Lorem do.',
  '2023-08-13T10:16:07.740Z @Sonic Labore consequat laboris sint incididunt et irure ex cupidatat.',
  '2023-08-13T10:16:38.023Z Annabelle Voluptate nostrud eu incididunt adipisicing proident sint magna.',
  '2023-08-13T10:17:08.999Z Annabelle ️Pariatur do sit voluptate qui ullamco labore.',
  '2023-08-13T10:24:25.253Z @zebra2 Ullamco nisi veniam irure irure elit cillum minim nostrud ullamco.',
  '2023-08-13T10:24:31.205Z @zebra2 Sit cillum consequat aliqua eu commodo excepteur commodo.',
  '2023-08-13T10:25:15.879Z @zebra2 Adipisicing culpa ipsum reprehenderit sint cillum enim magna exercitation ea culpa commodo elit elit.',
  '2023-08-13T10:27:26.008Z Annabelle Eu aute elit labore aliqua magna velit velit ipsum.',
  '2023-08-13T10:34:30.989Z chase Et aliqua mollit labore irure labore incididunt culpa enim sunt ut est laboris aute.',
  '2023-08-13T10:39:45.254Z @Sonic Incididunt proident do id mollit adipisicing cillum deserunt sint nulla quis sit irure.',
  '2023-08-13T10:40:26.798Z Annabelle Occaecat aute laborum duis reprehenderit.',
]

const sampleLog = createSampleLog()
