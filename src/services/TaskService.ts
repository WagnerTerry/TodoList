import axios from 'axios'

const BaseURL = "https://backendts.vercel.app"

export const fetchTask = async () => {
  try {
    const { data } = await axios.get(`${BaseURL}/tasks`)
    return data
  } catch (error) {
    console.log("error fetching task", error)
    throw new Error("An error occurred while fetching tasks from the api")
  }
}
