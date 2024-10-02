import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../../app/create/page'

// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

describe('Page', () => {

    it('renders a form', () => {
        render(<Page />)

        const form = screen.getByText((content, ele)=>{
            return ele?.tagName.toLocaleLowerCase() == 'form'
        })

        expect(form).toBeInTheDocument();
    })

    it('should render Title', () => {
        const {container} = render(<Page />)

        const titleInput = container.querySelector('input[name="title"]')
        expect(titleInput).toBeInTheDocument();
    });

    it('should render Content', () => {
        const {container} = render(<Page />)

        const textarea = container.querySelector('textarea[name="content"]')
        expect(textarea).toBeInTheDocument();
    });
})
