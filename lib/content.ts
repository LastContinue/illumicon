import axios, { AxiosResponse } from "axios"

export type Island = {
    name: string
    type: string
}

export type MarketingCopy = {
    copy: string
}

type StrapiRow<T> = {
    id: number
    attributes: T
}

const baseUrl: string = process.env.STRAPI_URL || ""
const token: string = process.env.STRAPI_TOKEN || ""

const getStrapiResponse = async (url: string): Promise<AxiosResponse> => {
    return await axios.get(`${baseUrl}/api/${url}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const getIslands = async (): Promise<Island[]> => {
    //Ideally all of the setup for this would be behind another layer of abstraction,
    //so that APIs or HTTP libs could be swapped out easier
    let islands: Island[] = []
    await getStrapiResponse("islands")
        .then(response => {
            //the second "data" is from how Strapi returns the data :shrug:
            //probably a slick lib out there handles all of this
            response.data.data.forEach((StrapiRow: StrapiRow<Island>) => islands.push(StrapiRow.attributes))
        }).catch(err => console.error(err.message))

    return islands
}

export const getMarketingCopy = async (): Promise<MarketingCopy> => {
    const marketingCopy: MarketingCopy = await getStrapiResponse("marketing-copy")
        .then(response => {
            return response.data.data.attributes
        }).catch(err => console.error(err.message))

    return marketingCopy
}
