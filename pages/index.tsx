import axios from "axios"
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import ReactMarkdown from "react-markdown"
import RegistrationFields from "../components/registrationFields"
import { getMarketingCopy, getIslands, Island, MarketingCopy } from '../lib/content'

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement
  email: HTMLInputElement
  tour: HTMLInputElement
}
interface RegistrationFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

const formEventToJson = (event: React.FormEvent<RegistrationFormElement>, islands: InferGetStaticPropsType<typeof getStaticProps>): object => {
  const island = islands.find((formIsland: Island) => formIsland.name === event.currentTarget.elements.tour.value)

  const jsonData =
  {
    name: event.currentTarget.elements.name.value,
    email: event.currentTarget.elements.email.value,
    tour: event.currentTarget.elements.tour.value,
    islandType: island.type
  }

  return jsonData
}

const Home: NextPage = ({ islands, marketingCopy }: InferGetStaticPropsType<typeof getStaticProps>) => {

  const handleSubmit = async (event: React.FormEvent<RegistrationFormElement>) => {
    event.preventDefault()

    axios.post('/api/register', formEventToJson(event, islands))
      .then(response => {
        //'useState' or some other hooks could be another way of doing this and could give a better UX
        alert(`Thank you for registering! Details will be sent to ${response.data.data}`)
      })
      .catch(error => {
        alert("Woopers! Something happened during registration. Please try again")
        console.error('There was an error!', error);
      })
  }

  return (
    <div className="grid h-screen place-items-center bg-yellow-100">
      <div className="text-8xl font-pocketmonk text-center">
        <p className="text-yellow-500">*NEW*</p>
        <p className="text-blue-600">Illumicon!</p>
      </div>
      <ReactMarkdown className="text-xl w-full max-w-prose bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 leading-loose">
        {marketingCopy.copy}
      </ReactMarkdown>
      <div>
        <p className="pb-2 text-6xl">Sign Up Now!</p>
        <p className="italic text-base">
          Don&apos;t forget to select an island you&apos;d like to tour!
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-xs bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <RegistrationFields islands={islands} />
      </form>
    </div >
  )
}

export const getStaticProps: GetStaticProps = async (context) => {

  let islands: Island[] = await getIslands()
  islands.push({ name: "No Thanks", type: "NA" })

  const marketingCopy: MarketingCopy = await getMarketingCopy()

  return {
    props: {
      islands,
      marketingCopy
    },
  }
}

export default Home
