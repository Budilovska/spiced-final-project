import React from "react";
import {render, waitForElement} from '@testing-library/react';
import App from './app';
import axios from './axios';


jest.mock('./axios');

test('app renders correctly', async () => {
    axios.get.mockResolvedValue({
        data: {
            id: 1,
            first: "Funky",
            last: "Chicken",
            url: '/frida.jpg'
        }
    })
    const {container} = render(<App />);

    expect(container.innerHTML).toBe('');

    await waitForElement(() => container.querySelector('div')
);

    expect(container.innerHTML).toContain("<div>");

    console.log(container.innerHTML);
})
