import { prisma } from '../../lib/prisma'

export default async function Editor() {
  const routes = await prisma.route.findMany()
  // const profiles = await prisma.profile.findMany()
  // const chatModels = await prisma.chatModel.findMany()
  // const imageModels = await prisma.imageModel.findMany()
  // const options = await prisma.options.findFirst()

  return (
    <div>
      <h1>Admin Page</h1>
      <table>
        <tbody>
        {routes.map(route => (
          <tr key={route.id}>
            <td>{route.id}</td>
            <td>{route.target}</td>
            <td>{route.startsWith}</td>
            <td>{route.contains}</td>
            <td>{route.handler}</td>
            <td>{route.redirectOutput}</td>
            <td>{route.profileID}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

