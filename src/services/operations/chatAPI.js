import { toast } from "react-hot-toast"

import { apiConnector } from "../apiConnector"
import { chatEndpoints } from "../apis"

const { GET_MESSAGE_API } = chatEndpoints


export const getMessageFromOpenAI = async (query) => {
    let result = null
    //const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", GET_MESSAGE_API, { query })
        if (!response.data.message) {
            throw new Error(response.data.error)
        }
        result = response
    } catch (error) {
        console.log("GET_MESSAGE_API API ERROR............", error)
        toast.error(error.message)
    }
    //toast.dismiss(toastId)
    return result
}