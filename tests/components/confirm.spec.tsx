import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Nullable } from '../../src/model/nullable';
import Confirm from '../../src/components/confirm/confirm'


let container: Nullable<HTMLElement> = null;

describe('test-confirm', () => {
    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        if (!container) {
            return;
        }

        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    test('validate mount confirm', async () => {
        const onClick = ()=> {
        }

        act(() => {
            render(<Confirm title='Test' onAccept={onClick } onCancel={onClick}>
                Child
            </Confirm>, container)
        })

        if (!container)
            return;

        expect(container.textContent).not.toBeNull()
        const title = document.querySelector("[data--test-id='title']")
        expect(title).not.toBeNull()
        expect(title.textContent).toContain("Test")
    })

})