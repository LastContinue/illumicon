import { Island } from "../lib/content"

const RegistrationFields = (props: { islands: Island[] }) => {
    return (
        <><div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Name"
                minLength={3}
                maxLength={30}
                required />
        </div><div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="professor@pokelab.com"
                    required
                    maxLength={100} />
            </div><div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tour">
                    Island Tour
                </label>
                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="tour">
                    {props.islands.map((island: Island) => (
                        <option
                            value={island.name}
                            key={island.name}>
                            {island.name}
                        </option>
                    ))}
                </select>
            </div><div className="flex items-center justify-between">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Submit">
                    Register!
                </button>
            </div></>
    )
}

export default RegistrationFields