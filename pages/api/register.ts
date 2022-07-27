import client, { Channel, Connection } from "amqplib"
import { NextApiRequest, NextApiResponse } from "next"

type Data = {
    data: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    let body = req.body

    //Ideally we'd also want to check for Approved list of islands as well
    //"never trust user input"
    if (!body.name || !body.email) {
        return res.status(400).json({ data: "Name or Email not found" })
    }
    //TODO: Validate against existing email to keep people from spamming

    const messageQueueUrl: string = process.env.MESSAGE_QUEUE_URL || ""
    const channelName = process.env.MESSAGE_QUEUE_NAME || "illumicon"

    const connection: Connection = await client.connect(messageQueueUrl)

    const channel: Channel = await connection.createChannel()
    await channel.assertQueue(channelName)

    //passing around un-encrypted user information isn't the best idea (even something like email)
    const sentMessage: boolean = channel.sendToQueue(channelName, Buffer.from(JSON.stringify(body)))

    if (sentMessage) {
        res.status(200).json({ data: `${body.email}` })
    } else {
        return res.status(400).json({ data: "Issue with registration. Please try again" })
    }
}

export default handler
