import * as React from 'react'
import RegistrationFields from '../components/registrationFields';
import renderer from 'react-test-renderer'

const islands = [
    { name: "Florio", type: "Park" },
    { name: "Voluca", type: "Desert" }
]

it('renders correctly', () => {
    const tree = renderer
        .create(<RegistrationFields islands={islands} />)
    expect(tree).toMatchSnapshot();
})