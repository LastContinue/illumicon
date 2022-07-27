import axios from "axios"
import { Island, getIslands, MarketingCopy, getMarketingCopy } from '../lib/content'

jest.mock('axios', () => ({
    defaults: { withCredentials: true }
}))

//Both of the tests in here could use "un-happy" path tests
describe("getIslands", () => {
    describe("when API call is successful", () => {
        it("should return islands list", async () => {

            const florio: Island = { name: "Florio", type: "Park" }
            const voluca: Island = { name: "Voluca", type: "Desert" }

            //Strapi returns with A LOT more information than this, but we really only
            //care about the `data.data` part
            const islandResponse = {
                data: {
                    data: [
                        { id: 1, attributes: florio },
                        { id: 2, attributes: voluca }
                    ]
                }
            }

            const expectedIslands: Island[] = [
                florio,
                voluca
            ]

            axios.get = jest.fn().mockResolvedValue(islandResponse);

            const gotIslands = await getIslands()

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(gotIslands).toEqual(expectedIslands)
        })
    })
})

describe("getMarketingCopy", () => {
    describe("when API call is successful", () => {
        it("should return some copy", async () => {
            const expectedCopy: MarketingCopy = { copy: "Here is some Copy" }

            const copyResponse = { data: { data: { id: 1, attributes: expectedCopy } } }

            axios.get = jest.fn().mockResolvedValue(copyResponse);

            const gotCopy = await getMarketingCopy()

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(gotCopy).toEqual(expectedCopy)
        })
    })
})