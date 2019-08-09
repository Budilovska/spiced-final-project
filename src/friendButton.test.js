import React from 'react';
import {render, waitForElement, fireEvent} from '@testing-library/react';
import axios from "./axios";
import FriendButton from './friendButton';

jest.mock('./axios');

test('When mounted the button with text appears', async () => {
    axios.get.mockResolvedValue({
        data: {
            buttonText: "Add friend"
        }
    });


    const {container} = render(<FriendButton />);


       const elem = await waitForElement(
           () => container.querySelector('button')
       );

       expect(
           elem.innerHTML
       ).toContain(
           'Add friend'
       );

});
