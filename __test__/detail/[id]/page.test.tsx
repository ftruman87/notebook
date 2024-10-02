import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react';
import Page from '../../../app/detail/[id]/page'

// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

describe('Page', () => {

    it('renders a form with buttons', () => {
        render(<Page params={{id: '1'}}/>);

        const form = screen.getByText((content, ele)=>{
            return ele?.tagName.toLocaleLowerCase() == 'form'
        })

        expect(form).toBeInTheDocument();
    })

    it('should render buttons', () => {
        render(<Page params={{id: '1'}}/>);

        const editButton = screen.getByText('Edit');
        expect(editButton).toBeInTheDocument();

        const deleteButton = screen.getByText('Delete');
        expect(deleteButton).toBeInTheDocument();
    })

    it('should render disable editing button', () => {
        render(<Page params={{id: '1'}}/>);

        fireEvent.click(screen.getByText('Edit'))
        const editButton = screen.getByText('Disable Editing');
        expect(editButton).toBeInTheDocument();
    })
})
