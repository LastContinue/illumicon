import amqp, { Channel, Connection } from 'amqplib'
import handler from "../pages/api/register"
import httpMocks from "node-mocks-http"
import { NextApiRequest, NextApiResponse } from "next";

describe("Register API", () => {
    test("calls 200 with proper input", async () => {
        const mockReq = httpMocks.createRequest<NextApiRequest>({
            body: {
                name: "Bidoof",
                email: "bidoof_rulez@lab.poke"
            }
        })
        const mockRes = httpMocks.createResponse<NextApiResponse>()

        const mockMqChannel = {
            assertQueue: jest.fn(),
            sendToQueue: jest.fn().mockImplementation((_queue, _message) => {
                return true
            }),
        }
        const mockMqConnection = {
            createChannel: jest.fn().mockImplementation(() => {
                return mockMqChannel
            })
        }

        //there's a mocking bug here I can't get to the bottom of
        //but tests pass
        jest.spyOn(amqp, 'connect').mockReturnValue(mockMqConnection)

        await handler(mockReq, mockRes)

        expect(mockRes.statusCode).toBe(200)
    })

    test("calls 400 with missing input", async () => {
        const mockReq = httpMocks.createRequest<NextApiRequest>({
            body: {
                name: "Bidoof",
            }
        })
        const mockRes = httpMocks.createResponse<NextApiResponse>()

        const foo = await handler(mockReq, mockRes)

        expect(mockRes.statusCode).toBe(400)
    })
})